import React, { Component } from 'react';
import { TbCircleFilled } from "react-icons/tb";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      vehicleData: {},
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    fetch('https://truck.truckmessage.com/get_user_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 2,
        vehicle_no: 'KA12AC3456',
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          this.setState({
            profile: data.data[0].profile,
            vehicleData: data.data[0].vechcle_data,
          });
        } else {
          console.error('Failed to fetch user profile');
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }

  render() {
    const { profile, vehicleData } = this.state;
    const publicUrl = process.env.PUBLIC_URL + '/';

    return (
      <div className="liton__wishlist-area mt-5 pb-70">
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
                        <h2>{profile.first_name}</h2>
                        <div className="footer-address">
                          <ul>
                            <li>
                              <div className="footer-address-icon">
                                <i className="icon-placeholder" />
                              </div>
                              <div className="footer-address-info">
                                <p>{profile.date_of_birth}</p>
                              </div>
                            </li>
                            <li>
                              <div className="footer-address-icon">
                                <i className="icon-call" />
                              </div>
                              <div className="footer-address-info">
                                <p><a href={`tel:+${profile.phone_number}`}>{profile.phone_number}</a></p>
                              </div>
                            </li>
                            <li>
                              <div className="footer-address-icon">
                                <i className="icon-placeholder" />
                              </div>
                              <div className="footer-address-info">
                                <p>{profile.category}</p>
                              </div>
                            </li>
                            <li>
                              <div className="footer-address-icon">
                                <i className="icon-placeholder" />
                              </div>
                              <div className="footer-address-info">
                                <p>{profile.operating_city}</p>
                              </div>
                            </li>
                            <li>
                              <div className="footer-address-icon">
                                <i className="icon-placeholder" />
                              </div>
                              <div className="footer-address-info">
                                <p>{profile.state}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mb-5 col-lg-12">
                      <button type="button" className="btn btn-danger">Add My Truck</button>
                    </div>
                    <div className="overflow-auto position-relative mb-5">
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
							<th scope='col'>Vehicle Number</th>
                            <th scope="col">fit_up_to</th>
                            <th scope="col">insurance_upto</th>
                            <th scope="col">pucc_upto</th>
                            <th scope="col">national_permit_upto</th>
                            <th scope="col">tax_upto</th>
                            <th scope="col">rc_status</th>
                            <th scope="col" className="action-header">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
							<td>TN22AV4455</td>
                            <td><TbCircleFilled className="me-2 text-success" /></td>
                            <td><TbCircleFilled className="me-2 text-danger" /></td>
                            <td><TbCircleFilled className="me-2 text-warning" /></td>
                            <td><TbCircleFilled className="me-2 text-success" /></td>
                            <td><TbCircleFilled className="me-2 text-danger" /></td>
                            <td className="action-cell">
                              <button className="btn btn-primary fixed-button">Action</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button type="button" className="btn btn-danger mb-3">Ask Permission to add more vehicles</button>
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
              {/* PRODUCT TAB AREA END */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
