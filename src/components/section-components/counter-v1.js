import React, { Component } from 'react';
import FuelPrice from '../FuelPrice';

class CounterV1 extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className=" pt-120 pb-70">
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-sm-6 align-self-center">
						<div>
							<h1><span className="counter">Daily Fuel Price </span></h1>
							<h6></h6>
						</div>
					</div>
					<div className="col-md-6 col-sm-6 align-self-center">
						<FuelPrice/>
					</div>
				</div>
			</div>
		</div>
	}
}

export default CounterV1