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
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";



const BlogList = () => {
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

    const [showingBuyAndSellLocation, setShowingBuyAndSellLocation] = useState("");

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

    const [editingData, setEditingData] = useState({
        company_name: "",
        contact_no: "",
        description: "",
        material: "",
        no_of_tyres: "",
        tone: "",
        truck_body_type: "",
    })

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

    const handleBuyAndSellLocation = (selectedLocation) => {
        if (selectedLocation) {
            const cityComponent = selectedLocation.find(component => component.types.includes('locality'));
            const stateComponent = selectedLocation.find(component => component.types.includes('administrative_area_level_1'));

            if (cityComponent && stateComponent) {
                setShowingBuyAndSellLocation(`${cityComponent.long_name}, ${stateComponent.long_name}`);
            }
        }
    }

    const handleSaveBusAndSellId = (buyAndSellDetails) => {
        Cookies.set("buyAndSellViewDetailsId", window.btoa(buyAndSellDetails.buy_sell_id), {
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
    }

    //Image upload and delete functions
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);

    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    const InputChange = (e) => {
        if (e.target.files.length > 0) {
            setMultipleImages(e.target.files)
        }

        // --For Multiple File Input
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }
    const DeleteSelectFile = (id) => {
        const result = selectedfile.filter((data) => data.id !== id);
        SetSelectedFile(result);

        const overallFile = result.map((data) => data.filename)

        var newImages = []
        for (let i = 0; i < multipleImages.length; i++) {
            if (overallFile.includes(multipleImages[i].name)) {
                newImages[newImages.length] = multipleImages[i]
            }
        }
        setMultipleImages(newImages)
    }
    //

    const handleBuyAndSellUpdate = async () => {
        const userId = window.atob(Cookies.get("usrin"));

        const edit = { ...editingData }
        edit.images = multipleImages

        const formData = new FormData();

        formData.append("user_id", userId);
        formData.append("brand", edit.brand)
        formData.append("contact_no", edit.contact_no)
        formData.append("description", edit.description)
        formData.append("kms_driven", edit.kms_driven)
        formData.append("location", showingBuyAndSellLocation)
        formData.append("model", edit.model)
        formData.append("owner_name", edit.owner_name)
        formData.append("vehicle_number", edit.vehicle_number)

        if (multipleImages.length > 0) {
            if (edit.images.length > 0) {
                for (let i = 0; i < edit.images.length; i++) {
                    formData.append(`truck_image${i + 1}`, edit.images[i]);
                }
            }

            try {
                const res = await axios.post("https://truck.truckmessage.com/truck_buy_sell", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (res.data.error_code === 0) {
                    document.getElementById("clodeBuySellModel").click()
                    toast.success(res.data.message)
                    initialRender()
                } else {
                    toast.error(res.data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        } else {
            toast.error("Image required")
        }
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="clodeBuySellModel"></button>
                        </div>
                        <div className="modal-body">
                            <div className="ltn__appointment-inner">
                                <div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <h6>Brand</h6>
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="company_name" placeholder="Name of the Brand" value={editingData.brand} onChange={(e) => setEditingData({ ...editingData, brand: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Model</h6>
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="company_name" placeholder="Name of the Model" value={editingData.model} onChange={(e) => setEditingData({ ...editingData, model: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Owner Name</h6>
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" name="owner_name" placeholder="Name of the Owner" value={editingData.owner_name} onChange={(e) => setEditingData({ ...editingData, owner_name: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Vehicle Number</h6>
                                            <div className="input-item input-item-email ltn__custom-icon">
                                                <input type="tel" name="contact_no" placeholder="Type your Vehicle Number" value={editingData.vehicle_number} onChange={(e) => setEditingData({ ...editingData, vehicle_number: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Kilometers driven</h6>
                                            <div className="tel-item">
                                                <input type="number" name="kms driven" className="w-100 py-4" placeholder="Type Kms driven" value={editingData.kms_driven} onChange={(e) => setEditingData({ ...editingData, kms_driven: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Contact Number</h6>
                                            <div className="input-item input-item-email ltn__custom-icon">
                                                <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.contact_no} onChange={(e) => setEditingData({ ...editingData, contact_no: e.target.value })} required />
                                                {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Location</h6>
                                            <div className="input-item input-item-name">
                                                <Autocomplete name="from_location"
                                                    className="google-location location-input bg-transparent py-2"
                                                    apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                                                    onPlaceSelected={(place) => {
                                                        if (place) {
                                                            handleBuyAndSellLocation(place.address_components);
                                                        }
                                                    }}
                                                    required
                                                    value={showingBuyAndSellLocation}
                                                    onChange={(e) => setShowingBuyAndSellLocation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6>Truck Body Type</h6>
                                            <div className="input-item">
                                                <select className="nice-select" name="truck_body_type" required value={editingData.truck_body_type} onChange={(e) => setEditingData({ ...editingData, truck_body_type: e.target.value })}>
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
                                                <select className="nice-select" name="tyre_count" value={editingData.no_of_tyres} onChange={(e) => setEditingData({ ...editingData, no_of_tyres: e.target.value })} required>
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
                                        <input type="file" id="fileupload" className="file-upload-input form-control" onChange={InputChange} multiple required />
                                    </div>
                                    <div className='my-3'>
                                        {selectedfile.map((data, index) => {
                                            const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                            return (
                                                <div className="file-atc-box" key={id}>
                                                    {
                                                        filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                            <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                            <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                    }
                                                    <div className="file-detail row">
                                                        <h6>{filename}</h6>
                                                        <div className='col-9'>
                                                            <p><span>Size : {filesize}</span>,<span className="ps-1 ml-2">Modified Time : {datetime}</span></p>
                                                        </div>
                                                        <div className="file-actions col-3">
                                                            <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h6>Descriptions (Optional)</h6>
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea name="description" placeholder="Enter a text here" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} required />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary col-12 col-md-3" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary col-12 col-md-3" onClick={handleBuyAndSellUpdate}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="addloadavailability" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                        <input class="form-control" type="file" name="images" id="formFileMultiple" multiple />
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
            </div> */}


            <div className='container'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentCards.map(card => (
                        <div className="col" key={card.buy_sell_id}>
                            <div className="card card h-100 shadow truckcard">
                                <span className='object-fit-fill rounded justify-content-center d-flex'>
                                    <img
                                        className="m-3 rounded-3 justify-content-center d-flex"
                                        src={card.images.length > 0 ? card.images[0] : ''}
                                        alt="truck message Logo - All in one truck solutions"
                                        style={{ width: '390px', height: '290px', objectFit: 'cover' }}
                                    />
                                </span>
                                <div className="card-body">
                                    <div className='col-12 col-md-12 mb-2 text-wrap'>
                                        <div className='row'>
                                            <div className='col-8 col-md-8 text-start ps-0'>
                                                <h5 className="card-title text-wrap">{card.brand}</h5>
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
