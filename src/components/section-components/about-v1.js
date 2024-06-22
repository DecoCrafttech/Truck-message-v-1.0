import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV1 extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="ltn__about-us-area pt-120 pb-90 ">
			
			<div className="container">
				
				<div className="row">
					<div className="col-lg-6 align-self-center">
						<div className="about-us-img-wrap about-img-left">
							<img src={publicUrl + "assets/img/others/7.png"} alt="About Us Image" />
												</div>
					</div>
					<div className="col-lg-6 align-self-center">
						<div className="about-us-info-wrap">
							<div className="section-title-area ltn__section-title-2--- mb-20">
								<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">About Us</h6>
								<h1 className="section-title">Revolutionize Your Lorry Logistics Experience with<span>TRUCK Message</span></h1>
								<p className='para'>Your Simplified Lorry Logistics Solution! <br/> Buy, Sell, or Hire Hassle-Free!"</p>
							</div>
							<ul className="ltn__list-item-half clearfix">
								<li>
									<i className="flaticon-home-2" />
									Smart Home Design
								</li>
								<li>
									<i className="flaticon-mountain" />
									Beautiful Scene Around
								</li>
								<li>
									<i className="flaticon-heart" />
									Exceptional Lifestyle
								</li>
								<li>
									<i className="flaticon-secure" />
									Complete 24/7 Security
								</li>
							</ul>
							{/* <div className="ltn__callout bg-overlay-theme-05  mt-30">
								<p>"Enimad minim veniam quis nostrud exercitation <br />
									llamco laboris. Lorem ipsum dolor sit amet" </p>
							</div> */}
							<div className="btn-wrapper animated go-top">
								<Link to="/service" className="theme-btn-1 btn btn-effect-1">OUR SERVICES</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default AboutV1