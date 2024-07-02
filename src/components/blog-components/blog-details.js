// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Comments from './comments';
// import Sidebar from './sidebar';
// class BlogDetails extends Component {
//   render() {
//     let publicUrl = process.env.PUBLIC_URL+'/'
//     let imagealt = 'image'

//     return (
// 		<div className="ltn__page-details-area ltn__blog-details-area mb-120">
// 			<div className="container">
// 			<div className="row">
// 				<div className="col-lg-8">
// 				<div className="ltn__blog-details-wrap">
// 					<div className="ltn__page-details-inner ltn__blog-details-inner">
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-category">
// 							<Link to="/shop">Real Estate</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<h2 className="ltn__blog-title">Real estate is property consisting of land and the buildings on it, 
// 						along with its
// 					</h2>
// 					<div className="ltn__blog-meta">
// 						<ul>
// 						<li className="ltn__blog-author go-top">
// 							<Link to="/team-details"><img src={publicUrl+"assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
// 						</li>
// 						<li className="ltn__blog-date">
// 							<i className="far fa-calendar-alt" />June 22, 2020
// 						</li>
// 						<li>
// 							<Link to="#"><i className="far fa-comments" />35 Comments</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
// 					<img src={publicUrl+"assets/img/blog/35.jpg"} alt="Image" />
// 					<h2>A cleansing hot shower or bath</h2>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. </p>
// 					<hr />
// 					<h2>Setting the mood with incense</h2>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. </p>
// 					<hr />
// 					<h2>Setting the mood with incense</h2>
// 					<div className="list-item-with-icon-2">
// 						<ul>
// 						<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</li>
// 						<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</li>
// 						<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</li>
// 						<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</li>
// 						<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</li>
// 						</ul>
// 					</div>
// 					<blockquote>
// 						<h6 className="ltn__secondary-color mt-0">BY HETMAYAR</h6>
// 						Viral dreamcatcher keytar typewriter, aest hetic offal umami. Aesthetic polaroid pug pitchfork post-ironic.
// 					</blockquote>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. </p>
// 					<img className="alignleft" src={publicUrl+"assets/img/blog/blog-details/1.jpg"} alt="Image" />
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus</p>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
// 					<h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur expedita velit laboriosam est sint laborum eos assumenda, quam voluptatem adipisci, reprehenderit ut nobis blanditiis perspiciatis!</p>
// 					<div className="row">
// 						<div className="col-lg-6">
// 						<img src={publicUrl+"assets/img/service/31.jpg"} alt="Image" />
// 						<label>Image Caption Here</label>
// 						</div>
// 						<div className="col-lg-6">
// 						<img src={publicUrl+"assets/img/service/32.jpg"} alt="Image" />
// 						</div>
// 					</div>
// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, amet, fuga omnis eligendi sed cupiditate molestias enim autem animi est tempore ipsa corporis. Recusandae, quia.</p>
// 					</div>
// 					{/* blog-tags-social-media */}
// 					<div className="ltn__blog-tags-social-media mt-80 row">
// 					<div className="ltn__tagcloud-widget col-lg-8 go-top">
// 						<h4>Releted Tags</h4>
// 						<ul>
// 						<li>
// 							<Link to="/shop">Popular</Link>
// 						</li>
// 						<li>
// 							<Link to="/shop">Business</Link>
// 						</li>
// 						<li>
// 							<Link to="/shop">ux</Link>
// 						</li>
// 						</ul>
// 					</div>
// 					<div className="ltn__social-media text-right text-end col-lg-4">
// 						<h4>Social Share</h4>
// 						<ul>
// 						<li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
// 						<li><a href="#" title="Twitter"><i className="fab fa-twitter" /></a></li>
// 						<li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
// 						<li><a href="#" title="Youtube"><i className="fab fa-youtube" /></a></li>
// 						</ul>
// 					</div>
// 					</div>
// 					<hr />
// 					{/* prev-next-btn */}
// 					<div className="ltn__prev-next-btn row mb-50">
// 					<div className="blog-prev col-lg-6">
// 						<h6>Prev Post</h6>
// 						<h3 className="ltn__blog-title"><Link to="#">Tips On Minimalist</Link></h3>
// 					</div>
// 					<div className="blog-prev blog-next text-right text-end col-lg-6">
// 						<h6>Next Post</h6>
// 						<h3 className="ltn__blog-title"><Link to="#">Less Is More</Link></h3>
// 					</div>
// 					</div>
// 					<hr />
// 					{/* related-post */}
// 					<div className="related-post-area mb-50">
// 					<h4 className="title-2">Related Post</h4>
// 					<div className="row">
// 						<div className="col-md-6">
// 						{/* Blog Item */}
// 						<div className="ltn__blog-item ltn__blog-item-6">
// 							<div className="ltn__blog-img">
// 							<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/blog-details/11.jpg"} alt="Image" /></Link>
// 							</div>
// 							<div className="ltn__blog-brief">
// 							<div className="ltn__blog-meta">
// 								<ul>
// 								<li className="ltn__blog-date ltn__secondary-color">
// 									<i className="far fa-calendar-alt" />June 22, 2020
// 								</li>
// 								</ul>
// 							</div>
// 							<h3 className="ltn__blog-title"><Link to="/blog-details">A series of iOS 7 inspire
// 								vector icons sense.</Link></h3>
// 							<p>Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed doing.</p>
// 							</div>
// 						</div>
// 						</div>
// 						<div className="col-md-6">
// 						{/* Blog Item */}
// 						<div className="ltn__blog-item ltn__blog-item-6">
// 							<div className="ltn__blog-img">
// 							<Link to="/blog-details"><img src={publicUrl+"assets/img/blog/blog-details/12.jpg"} alt="Image" /></Link>
// 							</div>
// 							<div className="ltn__blog-brief">
// 							<div className="ltn__blog-meta">
// 								<ul>
// 								<li className="ltn__blog-date ltn__secondary-color">
// 									<i className="far fa-calendar-alt" />June 22, 2020
// 								</li>
// 								</ul>
// 							</div>
// 							<h3 className="ltn__blog-title"><Link to="/blog-details">A series of iOS 7 inspire
// 								vector icons sense.</Link></h3>
// 							<p>Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed doing.</p>
// 							</div>
// 						</div>
// 						</div>
// 					</div>
// 					</div>
// 					<Comments/>
// 				</div>
// 				</div>
// 				<Sidebar/>
// 			</div>
// 			</div>
// 		</div>
//     )
//   }
// }

// export default BlogDetails;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
// import { SiMaterialformkdocs } from "react-icons/si";
// import { GiCarWheel } from "react-icons/gi";
// import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
// import { useSelector } from 'react-redux';

// const BlogDetails =()=> {
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

// export default BlogDetails;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
import { SiMaterialformkdocs } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { useSelector } from 'react-redux';

const BlogDetails = () => {
    const LoginDetails = useSelector((state) => state.login);

    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(21); // Adjust the number of cards per page as needed
    const [isSignedIn, setIsSignedIn] = useState(false); // State for user sign-in status
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State to manage login popup visibility
    const [filters, setFilters] = useState({
        search: '',
    });

    useEffect(() => {
        axios.get('https://truck.truckmessage.com/all_truck_details')
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
                                                <a href={`tel:${card.contact_no}`} className="btn cardbutton">Call</a>
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

export default BlogDetails;


