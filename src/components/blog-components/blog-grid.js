// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// class BlogGrid extends Component {
//   render() {
//     let publicUrl = process.env.PUBLIC_URL+'/'
//     let imagealt = 'image'
//     return (
// 		<div className="ltn__blog-area ltn__blog-item-3-normal mb-100 go-top">
// 			<div className="container">
// 			<div className="row">
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/1.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">Common Engine Oil Problems and Solutions</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/2.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">How and when to replace brake rotors</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />July 23, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/3.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">Electric Car Maintenance, Servicing &amp; Repairs</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />August 22, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/4.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">How to Prepare for your First Track Day!</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/5.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">How to: Make Your Tires Last Longer</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/6.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">Common Engine Oil Problems and Solutions</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/7.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">How and when to replace brake rotors</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />July 23, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/8.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">Electric Car Maintenance, Servicing &amp; Repairs</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />August 22, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/* Blog Item */}
// 				<div className="col-lg-4 col-sm-6 col-12">
// 				<div className="ltn__blog-item ltn__blog-item-3">
// 					<div className="ltn__blog-img">
// 					<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/2.jpg"} alt="#" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
// 						</li>
// 						<li className="ltn__blog-tags go-top">
// 							<Link to="/service"><i className="fas fa-tags" />Services</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h3 className="ltn__blog-title"><Link to="/blog-details">How to: Make Your Tires Last Longer</Link></h3>
// 					<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2020</li>
// 						</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 						<Link to="/blog-details">Read more</Link>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				{/*  */}
// 			</div>
// 			<div className="row">
// 				<div className="col-lg-12">
// 				<div className="ltn__pagination-area text-center">
// 					<div className="ltn__pagination">
// 					<ul>
// 						<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
// 						<li><Link to="#">1</Link></li>
// 						<li className="active"><Link to="#">2</Link></li>
// 						<li><Link to="#">3</Link></li>
// 						<li><Link to="#">...</Link></li>
// 						<li><Link to="#">10</Link></li>
// 						<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
// 					</ul>
// 					</div>
// 				</div>
// 				</div>
// 			</div>
// 			</div>
// 		</div>
	  
//     )
//   }
// }

// export default BlogGrid;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
// import { SiMaterialformkdocs } from "react-icons/si";
// import { GiCarWheel } from "react-icons/gi";
// import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
// import { useSelector } from 'react-redux';

// const BlogGrid =()=> {
//     const LoginDetails = useSelector((state)=>state.login);

//     const [cards, setCards] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [cardsPerPage] = useState(9); // Adjust the number of cards per page as needed
//     const [isSignedIn, setIsSignedIn] = useState(false); // State for user sign-in status
//     const [showLoginPopup, setShowLoginPopup] = useState(false); // State to manage login popup visibility
//     const [filters, setFilters] = useState({
//         search: '',
//     });

//     useEffect(() => {
//         axios.get('https://truck.truckmessage.com/all_load_details')
//             .then(response => { 
//                 if (response.data.success && Array.isArray(response.data.data)) {
//                     setCards(response.data.data);
//                 } else {
//                     console.error('Unexpected response format:', response.data);
//                 }
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the data!', error);
//             });
//     }, []);

//     const handleFilterChange = (e) => {
//         setFilters({
//             search: e.target.value,
//         });
//     };

//     const filterCards = (cards) => {
//         return cards.filter(card => {
//             const search = filters.search.toLowerCase();
//             return (
//                 card.from_location.toLowerCase().includes(search) ||
//                 card.to_location.toLowerCase().includes(search) ||
//                 card.tone.toString().includes(search) ||
//                 card.material.toLowerCase().includes(search) ||
//                 card.no_of_tyres.toString().includes(search) ||
//                 card.truck_body_type.toLowerCase().includes(search)
//             );
//         });
//     };

//     const filteredCards = filterCards(cards);

//     // Calculate the index of the last card on the current page
//     const indexOfLastCard = currentPage * cardsPerPage;
//     // Calculate the index of the first card on the current page
//     const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//     // Get the cards to be displayed on the current page
//     const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

//     // Handle page change
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Handle "View Details" button click
//     const handleViewDetails = () => {
//         setIsSignedIn(true);
//         // if (isSignedIn) {
//         //     // Logic to show call and message buttons
//         // } else {
//         //     setShowLoginPopup(false); // Show login popup if not signed in
//         // }
//     };

//     // Handle login (dummy implementation for demonstration)
//     const handleLogin = () => {
//         setIsSignedIn(true);
//         setShowLoginPopup(false);
//     };

//     return (
//         <div>
//             <div className="ltn__product-area ltn__product-gutter mb-50 mt-60">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="ltn__shop-options">
//                                 <ul>
                                    
//                                     <li>
//                                         <div className="showing-product-number text-right">
//                                             <span>Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, filteredCards.length)} of {filteredCards.length} results</span>
//                                         </div>
//                                     </li>
//                                     <div className="header-top-btn">
//                                         {/* <Link to="/add-listing"> + Add Load availability</Link> */}
//                                         <button type="button" className='truck-brand-button'>+ Add Load availability</button>
//                                     </div>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-lg-12">
//                             {/* Search Widget */}
//                             <div className="ltn__search-widget mb-0">
//                                 <form action="">
//                                     <input type="text" name="search" placeholder="Search by" onChange={handleFilterChange} />
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='container'>
//                 <div className="row row-cols-1 row-cols-md-3 g-4 mb-60 ">
//                     {currentCards.map(card => (
//                         <div className="col" key={card.id}>
//                             <div className="card h-100 shadow truckcard">
//                                 <div className='card-header mt-2 border-0 mb-2'>
//                                     <h5 className="card-title cardmodify">{card.company_name}</h5>
//                                 </div>
//                                 <div className="card-body p-3 mt-2 mb-2">
//                                     <div className='row'>
//                                         <div className="col-lg-12 cardicon">
//                                             <div>
//                                                 <label><FaLocationDot className="me-2 text-danger" />{card.from_location}</label>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-12 cardicon">
//                                             <div><label><FaLocationDot className='me-2 text-success' />{card.to_location}</label></div>
//                                         </div>
//                                     </div>
//                                     <hr className="hr m-2" />
//                                     <div className='row mt-3'>
//                                         <div className="col-lg-6 cardicon">
//                                             <div>
//                                                 <label><FaWeightHanging className='me-2' />{card.tone} ton</label>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6 cardicon">
//                                             <div><label><SiMaterialformkdocs className='me-2' />{card.material}</label></div>
//                                         </div>
//                                         <div className="col-lg-6 cardicon">
//                                             <label><GiCarWheel className='me-2' />{card.no_of_tyres} wheels</label>
//                                         </div>
//                                         <div className="col-lg-6 cardicon">
//                                             <label><FaTruck className='me-2' />{card.truck_body_type}</label>
//                                         </div>
//                                     </div>
//                                     <div className='m-2'>
//                                         <h5 className="card-title mt-3">Description</h5>
//                                         <p className="card-text paragraph">{card.description}</p>
//                                     </div>
//                                 </div>
//                                 <div className="card-footer mb-3">
//                                     <div>
//                                         {LoginDetails.isLoggedIn ? (
//                                             <div className="d-flex gap-2 justify-content-between mt-3">
//                                                 <button className="btn cardbutton" type="button">Call</button>
//                                                 <button className="btn cardbutton" type="button">Message</button>
//                                             </div>
//                                         ) :
//                                         <div className="d-grid gap-2">
//                                             <button className="btn cardbutton" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">View Details</button>
//                                         </div>
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className='pagination'>
//                     <ul className='pagination-list'>
//                         {Array.from({ length: totalPages }, (_, index) => (
//                             <li key={index + 1} className='pagination-item'>
//                                 <button
//                                     onClick={() => paginate(index + 1)}
//                                     className={currentPage === index + 1 ? 'pagination-link active' : 'pagination-link'}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BlogGrid;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
import { SiMaterialdesign } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { useSelector } from 'react-redux';

const BlogGrid = () => {
    const LoginDetails = useSelector((state) => state.login);

    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9); // Adjust the number of cards per page as needed
    const [isSignedIn, setIsSignedIn] = useState(false); // State for user sign-in status
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State to manage login popup visibility
    const [filters, setFilters] = useState({
        search: '',
    });

    useEffect(() => {
        axios.get('https://truck.truckmessage.com/all_driver_details')
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
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            search: e.target.value,
        });
    };

    const filterCards = (cards) => {
        return cards.filter(card => {
            const search = filters.search.toLowerCase();
            return (
                card.from_location.toLowerCase().includes(search) ||
                card.to_location.toLowerCase().includes(search) ||
                card.no_of_tyres.toLowerCase().includes(search) ||
                card.truck_body_type.toLowerCase().includes(search) ||
                card.truck_name.toLowerCase().includes(search) ||
                card.driver_name.toLowerCase().includes(search) ||
                card.company_name.toLowerCase().includes(search)
            );
        });
    };

    const filteredCards = filterCards(cards);

    // Calculate the index of the last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    // Calculate the index of the first card on the current page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    // Get the cards to be displayed on the current page
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle "View Details" button click
    const handleViewDetails = () => {
        setIsSignedIn(true);
    };

    // Handle login (dummy implementation for demonstration)
    const handleLogin = () => {
        setIsSignedIn(true);
        setShowLoginPopup(false);
    };

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
                                        <button type="button" className='truck-brand-button'>+ Add Load availability</button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            {/* Search Widget */}
                            <div className="ltn__search-widget mb-0">
                                <form action="">
                                    <input type="text" name="search" placeholder="Search by" onChange={handleFilterChange} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-60 ">
                    {currentCards.map(card => (
                        <div className="col" key={card.id}>
                            <div className="card h-100 shadow truckcard">
                                <div className='card-header mt-2 border-0 mb-2'>
                                    <h5 className="card-title cardmodify">{card.company_name}</h5>
                                </div>
                                <div className="card-body p-3 mt-2 mb-2">
                                    <div className='row'>
                                        <div className="col-lg-12 cardicon">
                                            <div>
                                                <label><FaLocationDot className="me-2 text-danger" />{card.from_location}</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 cardicon">
                                            <div><label><FaLocationDot className='me-2 text-success' />{card.to_location}</label></div>
                                        </div>
                                    </div>
                                    <hr className="hr m-2" />
                                    <div className='row mt-3'>
                                        <div className="col-lg-6 cardicon">
                                            <div>
                                                <label><GiCarWheel className='me-2' />{card.no_of_tyres} wheels</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 cardicon">
                                            <label><FaTruck className='me-2' />{card.truck_body_type}</label>
                                        </div>
                                    </div>
                                    <div className='m-2'>
                                        <h5 className="card-title mt-3">Description</h5>
                                        <p className="card-text paragraph">{card.description}</p>
                                    </div>
                                </div>
                                <div className="card-footer mb-3">
                                    <div>
                                        {LoginDetails.isLoggedIn ? (
                                            <div className="d-flex gap-2 justify-content-between mt-3">
                                                <a href={`tel:${card.contact_no}`} className="btn cardbutton" type="button">Call</a>
                                                <button className="btn cardbutton" type="button">Message</button>
                                            </div>
                                        ) :
                                        <div className="d-grid gap-2">
                                            <button className="btn cardbutton" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">View Details</button>
                                        </div>
                                        }
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

export default BlogGrid;


