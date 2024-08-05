import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const TollCalculator = () => {
    let map;
    let directionsService;
    let directionsRenderer;
    let autocompleteStart;
    let autocompleteEnd;

    useEffect(() => {
        initMap()
    }, [])


    function initMap() {
        directionsService = new window.google.maps.DirectionsService();
        directionsRenderer = new window.google.maps.DirectionsRenderer();

        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: 20.5937, lng: 78.9629 } // Centered on India
        });

        directionsRenderer.setMap(map);

        // Initialize autocomplete for start and end points
        autocompleteStart = new window.google.maps.places.Autocomplete(document.getElementById('startPoint'));
        autocompleteEnd = new window.google.maps.places.Autocomplete(document.getElementById('endPoint'));
    }

    async function calculateRoute(directionsService, directionsRenderer, start, end) {
        return new Promise((resolve, reject) => {
            directionsService.route({
                origin: start,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    resolve(result);
                } else {
                    reject(new Error('Directions request failed due to ' + status));
                }
            });
        });
    }

    const tollForm = async (e) => {
        e.preventDefault();

        const startPoint = document.getElementById('startPoint').value;
        const endPoint = document.getElementById('endPoint').value;
        const vehicleType = document.getElementById('vehicleType').value;

        try {
            const result = await calculateRoute(directionsService, directionsRenderer, startPoint, endPoint);
            const routes = result.routes;

            // Center map based on the first route
            if (routes.length > 0) {
                const bounds = new window.google.maps.LatLngBounds();
                routes.forEach(route => {
                    route.legs.forEach(leg => {
                        bounds.extend(new window.google.maps.LatLng(leg.start_location.lat(), leg.start_location.lng()));
                        bounds.extend(new window.google.maps.LatLng(leg.end_location.lat(), leg.end_location.lng()));
                    });
                });
                map.fitBounds(bounds);
            }

            // Process route information and display results
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<h2>Route Details</h2>';

            if (routes.length === 0) {
                resultsDiv.innerHTML += '<p>No routes found.</p>';
            } else {
                routes.forEach((route, index) => {
                    const tollData = calculateTolls(route, vehicleType);
                    resultsDiv.innerHTML += `<h3>Route ${index + 1}</h3>`;
                    resultsDiv.innerHTML += `<p>Distance: ${route.legs[0].distance.text}</p>`;
                    resultsDiv.innerHTML += `<p>Duration: ${route.legs[0].duration.text}</p>`;
                    resultsDiv.innerHTML += `<p>Number of Tolls: ${tollData.count}</p>`;
                    resultsDiv.innerHTML += `<p>Total Toll Cost: <strong> ${tollData.totalCost}<storng/> INR (Approximate value)</p>`;

                    // Display tolls if available
                    if (route.legs[0].steps) {
                        route.legs[0].steps.forEach((step) => {
                            if (step.instructions.includes('Toll')) {
                                resultsDiv.innerHTML += `<p>Toll Location: ${step.instructions}</p>`;
                            }
                        });
                    } else {
                        resultsDiv.innerHTML += '<p>No tolls on this route.</p>';
                    }
                });
            }

        } catch (error) {
            toast.error('Error fetching directions', error);
            toast.error('Please try again', error);
            document.getElementById('results').innerHTML = '<p>Error fetching directions. Please try again later.</p>';
        }
    };


    // Mock toll calculation function
    function calculateTolls(route, vehicleType) {
        // This function should call a toll API or use a toll database to get actual tolls and costs
        // Here we mock the data for demonstration purposes

        const tollLocations = route.legs[0].steps.filter(step => step.instructions.includes('Toll'));
        const tollCount = tollLocations.length;

        // Mock toll cost calculation based on vehicle type
        const tollCosts = {
            'Truck': 200,
            'Bus': 150,
            '6-Axle Vehicle': 300,
            '8-Axle Vehicle': 400,
            '10-Axle Vehicle': 500,
            '12-Axle Vehicle': 600
        };

        const totalCost = tollCount * tollCosts[vehicleType];
        return { count: tollCount, totalCost: totalCost };
    }

    return (
        <div className="container">
            <div className=' col-12 col-lg-12 col-md-12' >
                <div className='text-center mt-5 mb-5'>
                    <h3 >Toll Price Calculator</h3>
                </div>
                <div className='row' >
                    <div className='col-6 col-md-6'>


                        <form >
                            <label for="startPoint">Starting Point:</label>
                            <input type="text" id="startPoint" required />

                            <label for="endPoint">Ending Point:</label>
                            <input type="text" id="endPoint" required />

                            <label for="vehicleType">Vehicle Type:</label>
                            <select id="vehicleType">
                                <option value="Truck">Truck</option>
                                <option value="Bus">Bus</option>
                                <option value="6-Axle Vehicle">6-Axle Vehicle</option>
                                <option value="8-Axle Vehicle">8-Axle Vehicle</option>
                                <option value="10-Axle Vehicle">10-Axle Vehicle</option>
                                <option value="12-Axle Vehicle">12-Axle Vehicle</option>
                            </select>

                            <button type="button" className='btn btn-primary mt-3' onClick={tollForm}>Calculate</button>
                        </form>

                    </div>
                    <div className='col-6 col-md-6'>
                        <div id="map" className='tollCalculatorMap'></div>
                    </div>
                </div>

            </div>

            <div id="results"></div>

        </div>
    )
}

export default TollCalculator