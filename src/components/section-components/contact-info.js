import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ContactInfo extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="ltn__contact-address-area mb-5 mt-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 ">
						<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow h-100">
							<div className="ltn__contact-address-icon">
								<img src={publicUrl + "assets/img/icons/10.png"} alt="Icon Image" />
							</div>
							<h3 className='mb-2'>Email Address</h3>							
								<a href="mailto:example@example.com" >example@example.com</a> <br/>
								<a href="mailto:example@example.com" >example@example.com</a>						
						</div>
					</div>
					<div className="col-lg-4">
						<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow h-100">
							<div className="ltn__contact-address-icon">
								<img src={publicUrl + "assets/img/icons/11.png"} alt="Icon Image" />
							</div>
							<h3 className="ltn__contact-address-icon mb-2">Phone Number</h3>
							<a href="tel:+0123-456789" >+0123-456789</a> 
						</div>
					</div>
					<div className="col-lg-4">
						<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow h-100">
							<div className="ltn__contact-address-icon">
								<img src={publicUrl + "assets/img/icons/12.png"} alt="Icon Image" />
							</div>
							<h3 className='mb-2'>Office Address</h3>
							<p>18/A, New Born Town Hall <br />
								New York, US</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default ContactInfo