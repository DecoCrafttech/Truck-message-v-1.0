import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GiMineTruck } from "react-icons/gi";
import { FaTruckLoading } from "react-icons/fa";
import { PiFireTruckFill } from "react-icons/pi";
import { MdPersonalInjury } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { FaToriiGate } from "react-icons/fa6";
import { PiSpeedometerFill } from "react-icons/pi";
import { BsShieldShaded } from "react-icons/bs";
import { GiSpeedometer } from "react-icons/gi";

import parse from 'html-react-parser';
import FuelPrice from '../FuelPrice';

class ServiceV5 extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="ltn__service-area section-bg-1 pt-115 pb-70 go-top">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-area ltn__section-title-2--- text-center">
							<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Comprehensive Services</h6>
							<h1 className="section-title">Tailored Solutions for All Your Trucking Needs</h1>
						</div>
					</div>
				</div>
				<div className="row  ">
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><GiSpeedometer /></span>
							</div>
							<div className="ltn__feature-info ">
								<h3><Link to="/service-details" className='apara'>Fast Tag</Link></h3>
								<p>Convenient and Hassle-Free Toll Payments</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><BsShieldShaded /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/service-details" className='apara'>Insurance</Link></h3>
								<p>Protect Your Assets with Our Coverage Plans</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><FaToriiGate /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/toll-calculator" className='apara'>Toll Calculator</Link></h3>
								<p>Plan Your Routes with Confidence and Precision</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><PiSpeedometerFill /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/team-details" className='apara'>Mileage Calculator</Link></h3>
								<p>Track Optimize & Calculate Your Fuel Efficiency</p>
							</div>
						</div>
					</div>
					{/* <div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><BsFuelPumpDiesel /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/fuelprice" className='apara'>Fuel Price</Link></h3>
								<p>Track and Optimize Your Fuel Costs Daily without missing</p>
							</div>
						</div>
					</div> */}
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><FaHandHoldingDollar /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/expense-calculator" className='apara'>Expense Calculator</Link></h3>
								<p>Manage & Calculate Your Realtime Trucking Costs</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><GiMineTruck /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/blog-left-sidebar" className='apara'>Buy & sell</Link></h3>
								<p>Quality Pre-Owned Trucks at Competitive Prices</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><FaTruckLoading /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/load-availability" className='apara'>Load Availability</Link></h3>
								<p>Maximize Your Truck's Productivity with every days loads</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><PiFireTruckFill /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/blog-details" className='apara'>Truck Availability</Link></h3>
								<p>Reliable Trucks for All Your Hauling Needs on time</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-12">
						<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
							<div className="ltn__feature-icon">
								<span><MdPersonalInjury /></span>
							</div>
							<div className="ltn__feature-info">
								<h3><Link to="/blog-grid" className='apara'>Driver Needs</Link></h3>
								<p>Effortlessly Connecting You with Skilled Truck Drivers</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default ServiceV5