import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { TbCircleFilled } from "react-icons/tb";


class MyAccount extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="liton__wishlist-area mt-5 pb-70">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						{/* PRODUCT TAB AREA START */}
						<div className="ltn__product-tab-area">
							<div className="container">
								<div className="row">
									<div className="ltn-author-introducing clearfix mb-3">
										<div className="author-img">
											<img src={publicUrl + "assets/img/blog/author.jpg"} alt="Author Image" />
										</div>
										<div className="author-info">
											<h2>Rosalina D. William</h2>
											<div className="footer-address">
												<ul>
													<li>
														<div className="footer-address-icon">
															<i className="icon-placeholder" />
														</div>
														<div className="footer-address-info">
															<p>Brooklyn, New York, United States</p>
														</div>
													</li>
													<li>
														<div className="footer-address-icon">
															<i className="icon-call" />
														</div>
														<div className="footer-address-info">
															<p><a href="tel:+0123-456789">+0123-456789</a></p>
														</div>
													</li>
													<li>
														<div className="footer-address-icon">
															<i className="icon-mail" />
														</div>
														<div className="footer-address-info">
															<p><a href="mailto:example@example.com">example@example.com</a></p>
														</div>
													</li>
													<li>
														<div className="footer-address-icon">
															<i className="icon-mail" />
														</div>
														<div className="footer-address-info">
															<p><a href="mailto:example@example.com">example@example.com</a></p>
														</div>
													</li>
													<li>
														<div className="footer-address-icon">
															<i className="icon-mail" />
														</div>
														<div className="footer-address-info">
															<p><a href="mailto:example@example.com">example@example.com</a></p>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="mb-5 col-lg-12">
										<button type="button" class="btn btn-danger  ">Add My Truck</button>
									</div>
									<div class="overflow-auto position-relative mb-5">
										<table class="table table-responsive">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">First</th>
													<th scope="col">Last</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col">Handle</th>
													<th scope="col" class="action-header">Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													<td ><TbCircleFilled class="me-2 text-success"/></td>
													<td ><TbCircleFilled class="me-2 text-danger"/></td>
													<td ><TbCircleFilled class="me-2 text-warning"/></td>
													
													<td class="action-cell">
														<button class="btn btn-primary fixed-button">Action</button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>



									<div>
										<button type="button" class="btn btn-danger mb-3 ">Ask Permission to add more vechiles</button>
									</div>
									<div className="col-lg-12">
										<div className="tab-content">											
											<div className="tab-pane fade" id="ltn_tab_1_9">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="account-login-inner">
														<form action="#" className="ltn__form-box contact-form-box">
															<h5 className="mb-30">Change Password</h5>
															<input type="password" name="password" placeholder="Current Password*" />
															<input type="password" name="password" placeholder="New Password*" />
															<input type="password" name="password" placeholder="Confirm New Password*" />
															<div className="btn-wrapper mt-0">
																<button className="theme-btn-1 btn btn-block" type="submit">Save Changes</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	}
}

export default MyAccount