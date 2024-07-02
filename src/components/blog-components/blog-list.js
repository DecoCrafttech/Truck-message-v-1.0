// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from './sidebar';
// class BlogList extends Component {
//   render() {
//     let publicUrl = process.env.PUBLIC_URL+'/'
//     return (
// 		<div className="ltn__blog-area mb-120">
// 			<div className="container">
// 			<div className="row">
// 				<div className="col-lg-8 order-lg-2">
// 				<div className="ltn__blog-list-wrap">
// 					{/* Blog Item */}
// 					<div className="ltn__blog-item ltn__blog-item-5 go-top">
// 					<div className="ltn__blog-img">
// 						<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/31.jpg"} alt="Image" /></Link>
// 					</div>
// 					<div className="ltn__blog-brief">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">Lorem ipsum dolor sit amet, consecte
// 							cing elit, sed do eiusmod tempor.</Link></h3>
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
// 						<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 							<ul>
// 							<li className="ltn__blog-author">
// 								<Link to="/blog-grid"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 							</li>
// 							</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 							<Link to="/blog-details"><i className="fas fa-arrow-right" />Read more</Link>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (Video) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-video">
// 					<div className="ltn__video-img">
// 						<img src={publicUrl+"assets/img/blog/32.jpg"} alt="video popup bg image" />
// 						<a className="ltn__video-icon-2 ltn__secondary-bg ltn__video-icon-2-border---" href="https://www.youtube.com/embed/X7R-q9rsrtU?autoplay=1&showinfo=0" data-rel="lightcase:myCollection">
// 						<i className="fa fa-play" />
// 						</a>
// 					</div>
// 					<div className="ltn__blog-brief go-top" >
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">Adipisicing elit, sed do eiusmod tempor
// 							incididunt ut labore et dolore.</Link></h3>
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
// 						<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 							<ul>
// 							<li className="ltn__blog-author">
// 								<Link to="/blog-grid"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 							</li>
// 							</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 							<Link to="/blog-details"><i className="fas fa-arrow-right" />Read more</Link>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (Gallery) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-gallery">
// 					<div className="ltn__blog-gallery-active slick-arrow-1 slick-arrow-1-inner">
// 						<div className="ltn__blog-gallery-item">
// 						<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/33.jpg"} alt="Image" /></Link>
// 						</div>
// 						<div className="ltn__blog-gallery-item">
// 						<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/34.jpg"} alt="Image" /></Link>
// 						</div>
// 						<div className="ltn__blog-gallery-item">
// 						<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/31.jpg"} alt="Image" /></Link>
// 						</div>
// 					</div>
// 					<div className="ltn__blog-brief">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">Magna aliqua. Ut enim ad minim venia
// 							m, quis nostrud exercitation ullamco</Link></h3>
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
// 						<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 							<ul>
// 							<li className="ltn__blog-author">
// 								<Link to="/blog-grid"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 							</li>
// 							</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 							<Link to="/blog-details"><i className="fas fa-arrow-right" />Read more</Link>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (Audio) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-audio go-top">
// 					<div className="post-audio embed-responsive embed-responsive-16by9">
// 						<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/837045328&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
// 					</div>
// 					<div className="ltn__blog-brief">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">Laboris nisi ut aliquip ex ea commodo
// 							consequat. Duis aute irure dolor.</Link></h3>
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
// 						<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 							<ul>
// 							<li className="ltn__blog-author">
// 								<Link to="/blog-grid"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 							</li>
// 							</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 							<Link to="/blog-details"><i className="fas fa-arrow-right" />Read more</Link>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (No Image) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-no-image go-top">
// 					<div className="ltn__blog-brief">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">In reprehenderit in voluptate velit esse
// 							cillum dolore eu fugiat nulla pariatur.</Link></h3>
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</p>
// 						<div className="ltn__blog-meta-btn">
// 						<div className="ltn__blog-meta">
// 							<ul>
// 							<li className="ltn__blog-author">
// 								<Link to="/blog-grid"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 							</li>
// 							</ul>
// 						</div>
// 						<div className="ltn__blog-btn">
// 							<Link to="/blog-details"><i className="fas fa-arrow-right" />Read more</Link>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (Quote) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-quote bg-image bg-overlay-theme-90 go-top" data-bs-bg="img/blog/3.jpg">
// 					<div className="ltn__blog-brief go-top">
// 						<blockquote>
// 						<Link to="/blog-details">Excepteur sint occaecat cupida
// 							tat non proident, sunt in.</Link>
// 						</blockquote>
// 						<div className="ltn__blog-meta mb-0">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 					</div>
// 					</div>
// 					{/* Blog Item (Background Image) */}
// 					<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-bg-image bg-image bg-overlay-white-90" data-bs-bg="img/blog/2.jpg">
// 					<div className="ltn__blog-brief go-top">
// 						<div className="ltn__blog-meta">
// 						<ul>
// 							<li className="ltn__blog-category">
// 							<Link to="/blog-grid">Business</Link>
// 							</li>
// 						</ul>
// 						</div>
// 						<h3 className="ltn__blog-title"><Link to="/blog-details">Culpa qui officia deserunt mollit anim
// 							id est laborum. Sed ut perspiciatis</Link></h3>
// 						<div className="ltn__blog-meta mb-0">
// 						<ul>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
// 							</li>
// 							<li>
// 							<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
// 							</li>
// 							<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 							</li>
// 						</ul>
// 						</div>
// 					</div>
// 					</div>
// 					{/*  */}
// 				</div>
// 				<div className="row">
// 					<div className="col-lg-12">
// 					<div className="ltn__pagination-area text-center">
// 						<div className="ltn__pagination">
// 						<ul>
// 							<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
// 							<li><Link to="#">1</Link></li>
// 							<li className="active"><Link to="#">2</Link></li>
// 							<li><Link to="#">3</Link></li>
// 							<li><Link to="#">...</Link></li>
// 							<li><Link to="#">10</Link></li>
// 							<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
// 						</ul>
// 						</div>
// 					</div>
// 					</div>
// 				</div>
// 				</div>
// 				<Sidebar/>
// 			</div>
// 			</div>
// 		</div>
//     )
//   }
// }

// export default BlogList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
import { SiMaterialformkdocs } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { useSelector } from 'react-redux';

const BlogList =()=> {
    const LoginDetails = useSelector((state)=>state.login);

    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9); // Adjust the number of cards per page as needed
    const [isSignedIn, setIsSignedIn] = useState(false); // State for user sign-in status
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State to manage login popup visibility
    const [filters, setFilters] = useState({
        search: '',
    });

    useEffect(() => {
        axios.get('https://truck.truckmessage.com/all_load_details')
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
                card.tone.toString().includes(search) ||
                card.material.toLowerCase().includes(search) ||
                card.no_of_tyres.toString().includes(search) ||
                card.truck_body_type.toLowerCase().includes(search)
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
        // if (isSignedIn) {
        //     // Logic to show call and message buttons
        // } else {
        //     setShowLoginPopup(false); // Show login popup if not signed in
        // }
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
                                        {/* <Link to="/add-listing"> + Add Load availability</Link> */}
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
                                                <label><FaWeightHanging className='me-2' />{card.tone} ton</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 cardicon">
                                            <div><label><SiMaterialformkdocs className='me-2' />{card.material}</label></div>
                                        </div>
                                        <div className="col-lg-6 cardicon">
                                            <label><GiCarWheel className='me-2' />{card.no_of_tyres} wheels</label>
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
                                                <button className="btn cardbutton" type="button">Call</button>
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

export default BlogList;




