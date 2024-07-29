import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaUserAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import Autocomplete from "react-google-autocomplete";


const BlogList = () => {
    const LoginDetails = useSelector((state) => state.login);
    const pageRender = useNavigate();

    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(21);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
    });

    const [showingFromLocation, setShowingFromLocation] = useState("");
    const [showingToLocation, setShowingToLocation] = useState("");
    const [editCompanyFromLocation, setEditCompanyFromLocation] = useState({
        city: "",
        state: "",
    });
    const [editCompanyToLocation, setEditCompanyToLocation] = useState({
        city: "",
        state: "",
    });

    const [contactError, setContactError] = useState(''); // State to manage contact number validation error

    const formRef = useRef(null);
    const modalRef = useRef(null);

    const filterCards = (cards) => {
        return cards.filter(card => {
            const search = filters.search.toLowerCase();
            return (
                card.location.toLowerCase().includes(search) ||
                card.model.toString().includes(search) ||
                card.owner_name.toLowerCase().includes(search) ||
                card.vehicle_number.toLowerCase().includes(search) ||
                card.kms_driven.toString().includes(search)
            );
        });
    };

    const filteredCards = filterCards(cards);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const publicUrl = process.env.PUBLIC_URL + '/';

    useEffect(() => {
        initialRender()
    }, []);

    const initialRender = async () => {
        try {
            const res = await axios.get('https://truck.truckmessage.com/all_buy_sell_details')
                .then(response => {
                    if (response.data.success && Array.isArray(response.data.data)) {
                        setCards(response.data.data);
                    } else {
                        console.error('Unexpected response format:', response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFilterChange = (e) => {
        setFilters({
            search: e.target.value,
        });
    };

    const validateContactNumber = (contact) => {
        const contactNumberPattern = /^\d{10}$/; // Simple pattern for 10-digit numbers
        return contactNumberPattern.test(contact);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const contactNumber = formData.get('contact_no');

        if (!validateContactNumber(contactNumber)) {
            setContactError('Please enter a valid 10-digit contact number.');
            return;
        }

        const userId = window.atob(Cookies.get("usrin"));
        const data = {
            company_name: formData.get('company_name'),
            contact_no: contactNumber,
            from: formData.get('from_location'),
            to: formData.get('to_location'),
            material: formData.get('material'),
            tone: formData.get('tone'),
            truck_body_type: formData.get('truck_body_type'),
            no_of_tyres: formData.get('tyre_count'),
            description: formData.get('description'),
            user_id: userId
        };
        axios.post('https://truck.truckmessage.com/truck_buy_sell', data, {
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(response => {
                toast.success('Form submitted successfully!');
                formRef.current.reset();
                setContactError('');
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            })
            .catch(error => {
                toast.error('Failed to submit the form.');
                console.error('There was an error!', error);
            });
    };

    const handleViewDetails = () => {
        setIsSignedIn(true);
    };

    const handleLogin = () => {
        setIsSignedIn(true);
        setShowLoginPopup(false);
    };


    const handleFromLocation = (selectedLocation) => {
        const cityComponent = selectedLocation.find(component => component.types.includes('locality'));
        const stateComponent = selectedLocation.find(component => component.types.includes('administrative_area_level_1'));

        if (cityComponent && stateComponent) {
            setEditCompanyFromLocation({
                city: cityComponent.long_name,
                state: stateComponent.long_name,
            });
            setShowingFromLocation(`${cityComponent.long_name}, ${stateComponent.long_name}`);
        }
    };

    const handleToLocation = (selectedLocation) => {
        const cityComponent = selectedLocation.find(component => component.types.includes('locality'));
        const stateComponent = selectedLocation.find(component => component.types.includes('administrative_area_level_1'));

        if (cityComponent && stateComponent) {
            setEditCompanyToLocation({
                city: cityComponent.long_name,
                state: stateComponent.long_name,
            });
            setShowingToLocation(`${cityComponent.long_name}, ${stateComponent.long_name}`);
        }
    };

    const handleSaveBusAndSellId = (buyAndSellDetails) => {
        Cookies.set("buyAndSellViewDetailsId", window.btoa(buyAndSellDetails.buy_sell_id), {
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
    }

    return (
        <div>
            <div className="ltn__product-area ltn__product-gutter mb-50 mt-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ltn__shop-options">
                                <ul>
                                    <li>
                                        <div className="showing-product-number text-right">
                                            <span>Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, filteredCards.length)} of {filteredCards.length} results</span>
                                        </div>
                                    </li>
                                    <div className="header-top-btn">
                                        <button type="button " className='cardbutton truck-brand-button' data-bs-toggle="modal" data-bs-target="#addloadavailability">+ Add Load availability</button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="ltn__search-widget mb-0">
                                <form action="">
                                    <input type="text" name="search" placeholder="Search by" onChange={handleFilterChange} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <div className="modal fade" id="addloadavailability" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Load</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="ltn__appointment-inner">
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <h6>Company Name</h6>

                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="company_name" placeholder="Name of the Owner" required />
                                            </div>

                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Contact Number</h6>
                                            <div className="input-item input-item-email ltn__custom-icon">
                                                <input type="tel" name="contact_no" placeholder="Type your contact number" required />
                                                {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <h6>From</h6>
                                            <div className="input-item input-item-name">
                                                <Autocomplete name="from_location"
                                                    className="google-location location-input bg-transparent py-2"
                                                    apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                                                    onPlaceSelected={(place) => {
                                                        if (place) {
                                                            handleFromLocation(place.address_components);
                                                        }
                                                    }}
                                                    required
                                                    value={showingFromLocation}
                                                    onChange={(e) => setShowingFromLocation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>To</h6>
                                            <div className="input-item input-item-name">
                                                <Autocomplete name="to_location"
                                                    className="google-location location-input bg-transparent py-2"
                                                    apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                                                    onPlaceSelected={(place) => {
                                                        if (place) {
                                                            handleToLocation(place.address_components);
                                                        }
                                                    }}
                                                    required
                                                    value={showingToLocation}
                                                    onChange={(e) => setShowingToLocation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <h6>Material</h6>
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="material" placeholder="What type of material" required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Ton</h6>
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="tone" placeholder="Example: 2 tones" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <h6>Truck Body Type</h6>
                                            <div className="input-item">
                                                <select className="nice-select" name="truck_body_type" required>
                                                    <option value="open_body">Open Body</option>
                                                    <option value="container">Container</option>
                                                    <option value="trailer">Trailer</option>
                                                    <option value="tanker">Tanker</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>No. of Tyres</h6>
                                            <div className="input-item">
                                                <select className="nice-select" name="tyre_count" required>
                                                    <option value="6">6</option>
                                                    <option value="10">10</option>
                                                    <option value="12">12</option>
                                                    <option value="14">14</option>
                                                    <option value="16">16</option>
                                                    <option value="18">18</option>
                                                    <option value="20">20</option>
                                                    <option value="22">22</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                                        <input class="form-control" type="file" id="formFileMultiple" multiple />
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h6>Descriptions (Optional)</h6>
                                            <div className="input-item input-item-textarea ltn__custom-icon">
                                                <textarea name="description" placeholder="Enter a text here" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer btn-wrapper text-center mt-4">
                                        <button className="btn theme-btn-1 text-uppercase" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentCards.map(card => (
                        <div className="col" key={card.buy_sell_id}>
                            <div className="card card h-100 shadow truckcard">
                                <span className='object-fit-fill rounded justify-content-center d-flex'>
                                    <img
                                        className="m-3 rounded-3 justify-content-center d-flex"
                                        src={`${publicUrl}assets/img/slider/21.jpg`}
                                        alt="truck message Logo - All in one truck solutions"
                                        style={{ width: '390px', height: '290px', objectFit: 'cover' }}
                                    />
                                </span>
                                <div className="card-body">
                                    <div className='col-12 col-md-12 mb-2 text-wrap'>
                                        <div className='row'>
                                            <div className='col-8 col-md-8 text-start ps-0'>
                                                <h5 className="card-title text-wrap">{card.brand} {card.model}</h5>
                                            </div>
                                            <div className='col-4 col-md-4 text-end .fs-6 pe-0'>
                                                <p className='.fs-6 reviewtext'>(12)
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label><FaLocationDot className="me-2 text-danger" />{card.location}</label>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-6 col-md-6"><FaUserAlt className="me-2" />
                                                {card.owner_name}
                                            </div>
                                            <div className="col-6 col-md-6"><FaTruckFast className="me-2" />
                                                {card.vehicle_number}
                                            </div>
                                            <div className="col-6 col-md-6"><BsFillCalendar2DateFill className="me-2" />
                                                {card.model}
                                            </div>
                                            <div className="col-6 col-md-6"><RiPinDistanceFill className="me-2" />
                                                {card.kms_driven} kms
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='d-flex gap-2'>
                                        <Link to="/product-details" className='apara' onClick={() => handleSaveBusAndSellId(card)}>view details </Link>                                        <link></link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='pagination'>
                    <ul className='pagination-list'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className='pagination-item'>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={currentPage === index + 1 ? 'pagination-link active' : 'pagination-link'}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BlogList;
