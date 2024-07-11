import React, { useEffect, useState } from 'react';
import { TbCircleFilled } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import axios from 'axios';
import Cookies from 'js-cookie';

const MyAccount = () => {
  const [profile, setProfile] = useState({});
  const [vehicleData, setVehicleData] = useState([]);
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const publicUrl = process.env.PUBLIC_URL + '/';

  useEffect(() => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);
      const vehicleNo = localStorage.getItem('vehicle_no') || 'KA12AC3456'; // Default value or fetch from local storage

      fetchUserProfile(userId, vehicleNo);
    } else {
      console.error('User not logged in');
    }
  }, []);

  const fetchUserProfile = (userId, vehicleNo) => {
    axios.post('https://truck.truckmessage.com/get_user_profile', {
      user_id: userId,
      vehicle_no: vehicleNo,
    })
      .then(response => {
        const { data } = response;
        if (data.success && data.data.length > 0) {
          const profileData = data.data.find(item => item.profile);
          const vehicleData = data.data.find(item => item.vehicle_data);

          setProfile(profileData ? profileData.profile : {});
          setVehicleData(vehicleData ? vehicleData.vehicle_data : []);
        } else {
          console.error('Failed to fetch user profile');
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  };

  const handleAddVehicle = () => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);

      axios.post('https://truck.truckmessage.com/add_user_vehicle_details', {
        user_id: userId,
        vehicle_no: newVehicleNumber,
      })
        .then(response => {
          if (response.data.success) {
            // Append the new vehicle to the vehicleData state
            setVehicleData(prevVehicleData => [...prevVehicleData, response.data.data[0]]);
            setNewVehicleNumber(''); // Clear the input field
            // Close the modal (optional, if you are using Bootstrap)
            document.getElementById('closeModalButton').click();
          } else {
            console.error('Failed to add vehicle');
          }
        })
        .catch(error => {
          console.error('Error adding vehicle:', error);
        });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="liton__wishlist-area mt-5 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
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
                              <p>{formatDate(profile.date_of_birth)}</p>
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
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#vehicleNumber">Add My Truck</button>
                  </div>
                  <div className="overflow-auto position-relative mb-5">
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope='col'>Vehicle Number</th>
                          <th scope="col">Fit Up To</th>
                          <th scope="col">Insurance Upto</th>
                          <th scope="col">PUCC Upto</th>
                          <th scope="col">National Permit Upto</th>
                          <th scope="col">Tax Upto</th>
                          <th scope="col">RC Status</th>
                          <th scope="col" className="action-header">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicleData.map((vehicle, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{vehicle.rc_number}</td>
                            <td><TbCircleFilled className="me-2 text-success" />{formatDate(vehicle.fit_up_to)}</td>
                            <td><TbCircleFilled className="me-2 text-danger" />{formatDate(vehicle.insurance_upto)}</td>
                            <td><TbCircleFilled className="me-2 text-warning" />{formatDate(vehicle.pucc_upto)}</td>
                            <td><TbCircleFilled className="me-2 text-success" />{formatDate(vehicle.national_permit_upto)}</td>
                            <td><TbCircleFilled className="me-2 text-danger" />{formatDate(vehicle.tax_paid_upto)}</td>
                            <td>{vehicle.rc_status}</td>
                            <td className="action-cell d-flex justify-content-evenly gap-2 ">
                              <button className="btn btn-primary fixed-button" data-bs-toggle="modal" data-bs-target="#viewall"> <FaRegEye /></button>
                              <button  type="button" className="btn btn-primary fixed-button"><MdOutlineDeleteOutline /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button type="button" className="btn btn-danger mb-3">Add More Vehicle</button>
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
                  {/* Table for detailed vehicle information */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="viewall" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-lg modal-dialog-centered  ">
          <div className="col-lg-12 mt-5">
            {vehicleData.length > 0 && (
              <div className="card">
                <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Vehicle Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <tbody>
                      {Object.keys(vehicleData[0]).map((key, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: 'bold' }}>{key.replace(/_/g, ' ')}</td>
                          <td>{typeof vehicleData[0][key] === 'object' ? JSON.stringify(vehicleData[0][key]) : vehicleData[0][key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="modal fade" id="vehicleNumber" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Vehicle Number</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mt-5"
                  id="vehicleNumberInput"
                  placeholder="TN66 ED 5555"
                  value={newVehicleNumber}
                  onChange={(e) => setNewVehicleNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-evenly mb-3 m-3 gap-2">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddVehicle}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
