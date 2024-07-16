import React, { useContext, useEffect, useState } from 'react';
import { TbCircleFilled } from "react-icons/tb";
import { MdOutlineDeleteOutline, MdDeleteOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [profile, setProfile] = useState({});
  const [vehicleData, setVehicleData] = useState([]);
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState({});
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [editProfile, setEditProfile] = useState({});

  const LoginDetails = useSelector((state) => state.login);
  const pageRender = useNavigate();

  useEffect(()=>{ 
    if(!Cookies.get("usrin")){
      pageRender('/')
    }
  },[LoginDetails.isLoggedIn]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);

      axios.post('https://truck.truckmessage.com/get_user_profile', {
        user_id: userId,
      })
        .then(response => {
          const { data } = response;
          if (data.success && data.data.length > 0) {
            const profileData = data.data.find(item => item.profile);
            const vehicleData = data.data.find(item => item.vehicle_data);

            setProfile(profileData ? profileData.profile : {});
            setVehicleData(vehicleData ? vehicleData.vehicle_data : []);
            setEditProfile(profileData ? profileData.profile : {});
          } else {
            console.error('Failed to fetch user profile');
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    } else {
      console.error('User not logged in');
    }
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
            setVehicleData(prevVehicleData => [...prevVehicleData, response.data.data[0]]);
            setNewVehicleNumber('');
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

  const handleDeleteVehicle = () => {
    if (!vehicleToDelete) return;

    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);

      axios.post('https://truck.truckmessage.com/remove_user_vehicle_details', {
        user_id: userId,
        vehicle_no: vehicleToDelete,
      })
        .then(response => {
          if (response.data.success) {
            setVehicleData(prevVehicleData => prevVehicleData.filter(vehicle => vehicle.rc_number !== vehicleToDelete));
            setVehicleToDelete(null);
            document.getElementById('closeDeleteModalButton').click();
          } else {
            console.error('Failed to delete vehicle');
          }
        })
        .catch(error => {
          console.error('Error deleting vehicle:', error);
        });
    }
  };

  const handleViewDetails = (vehicleNumber) => {
    axios.post('https://truck.truckmessage.com/get_vehicle_details', {
      vehicle_no: vehicleNumber,
    })
      .then(response => {
        if (response.data.success) {
          setSelectedVehicleDetails(response.data.data[0]);
        } else {
          console.error('Failed to fetch vehicle details');
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle details:', error);
      });
  };

  const handleEditProfile = () => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);
      const updatedProfile = { ...editProfile, user_id: userId };

      axios.post('https://truck.truckmessage.com/update_profile', updatedProfile)
        .then(response => {
          if (response.data.success) {
            fetchUserProfile();
            document.getElementById('closeEditProfileModalButton').click();
          } else {
            console.error('Failed to update profile');
          }
        })
        .catch(error => {
          console.error('Error updating profile:', error);
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
                  <div className="ltn-author-introducing clearfix mb-3 ps-5">
                    <div className="author-info">
                      <h2>{profile.first_name}</h2>
                      <div className="footer-address">
                        <ul>
                          <li>
                            <div className="footer-address-icon"></div>
                            <div>
                              <p><FaRegCalendarAlt className="me-3" /> {formatDate(profile.date_of_birth)}</p>
                            </div>
                          </li>
                          <li>
                            <div className="footer-address-icon"></div>
                            <div className="footer-address-info">
                              <p><IoCallOutline className='me-3' /> <a href={`tel:+${profile.phone_number}`}> {profile.phone_number}</a></p>
                            </div>
                          </li>
                          <li>
                            <div className="footer-address-icon"></div>
                            <div className="footer-address-info">
                              <p>{profile.category}</p>
                            </div>
                          </li>
                          <li>
                            <div className="footer-address-icon"></div>
                            <div className="footer-address-info">
                              <p>{profile.operating_city}</p>
                            </div>
                          </li>
                          <li>
                            <div className="footer-address-icon"></div>
                            <div className="footer-address-info">
                              <p>{profile.state}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  <div className="mb-3 col-lg-12">
                    <button type="button" className="btn btn-danger text-uppercase" data-bs-toggle="modal" data-bs-target="#vehicleNumber">Add My Truck</button>
                  </div>

                  <div className="container">
                    <div className="row">
                      {vehicleData.map((vehicle, index) => (
                        <div className="col-lg-4 mt-4 mb-4" key={index}>
                          <div className="widget">
                            <div className="d-flex justify-content-between align-items-start align-items-center mb-0">
                              <h4 className="ltn__widget-title ltn__widget-title-border-2">{vehicle.rc_number}</h4>
                              <span className="align-items-start">
                                <button className="btn fs-4 p-0" onClick={() => setVehicleToDelete(vehicle.rc_number)} data-bs-toggle="modal" data-bs-target="#deleteVehicleModal">
                                  <MdDeleteOutline />
                                </button>
                              </span>
                            </div>
                            <div className="ltn__social-media-2">
                              <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">Fitness UpTo</div>
                                    <span className="vehicletext">{formatDate(vehicle.fit_up_to)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-warning fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">Insurance</div>
                                    <span className="vehicletext">{formatDate(vehicle.insurance_upto)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-success fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">PUCC</div>
                                    <span className="vehicletext">{formatDate(vehicle.pucc_upto)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-danger fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">Road Tax</div>
                                    <span className="vehicletext">{formatDate(vehicle.tax_upto)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-success fs-4" />
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <button className="btn btn-primary text-uppercase mt-3 mb-3" onClick={() => handleViewDetails(vehicle.rc_number)} data-bs-toggle="modal" data-bs-target="#vehicleDetails">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Vehicle Modal */}
                  <div className="modal fade" id="vehicleNumber" tabIndex="-1" aria-labelledby="vehicleNumberLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="vehicleNumberLabel">Add Vehicle</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="vehicleNumberInput" className="form-label">Vehicle Number</label>
                            <input type="text" className="form-control" id="vehicleNumberInput" value={newVehicleNumber} onChange={(e) => setNewVehicleNumber(e.target.value)} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModalButton">Close</button>
                          <button type="button" className="btn btn-primary" onClick={handleAddVehicle}>Add Vehicle</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Vehicle Confirmation Modal */}
                  <div className="modal fade" id="deleteVehicleModal" tabIndex="-1" aria-labelledby="deleteVehicleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteVehicleModalLabel">Delete Vehicle</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete the vehicle {vehicleToDelete}?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeDeleteModalButton">Cancel</button>
                          <button type="button" className="btn btn-danger" onClick={handleDeleteVehicle}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details Modal */}
                  <div className="modal fade" id="vehicleDetails" tabIndex="-1" aria-labelledby="vehicleDetailsLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="vehicleDetailsLabel">Vehicle Details</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <h5>RC Number: {selectedVehicleDetails.rc_number}</h5>
                          <p>Fitness UpTo: {formatDate(selectedVehicleDetails.fit_up_to)}</p>
                          <p>Insurance UpTo: {formatDate(selectedVehicleDetails.insurance_upto)}</p>
                          <p>PUCC UpTo: {formatDate(selectedVehicleDetails.pucc_upto)}</p>
                          <p>Road Tax UpTo: {formatDate(selectedVehicleDetails.tax_upto)}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit Profile Modal */}
                  <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="editFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="editFirstName" value={editProfile.first_name} onChange={(e) => setEditProfile({...editProfile, first_name: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="editLastName" value={editProfile.last_name} onChange={(e) => setEditProfile({...editProfile, last_name: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editDateOfBirth" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" id="editDateOfBirth" value={editProfile.date_of_birth} onChange={(e) => setEditProfile({...editProfile, date_of_birth: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editPhoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="editPhoneNumber" value={editProfile.phone_number} onChange={(e) => setEditProfile({...editProfile, phone_number: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editCategory" className="form-label">Category</label>
                            <input type="text" className="form-control" id="editCategory" value={editProfile.category} onChange={(e) => setEditProfile({...editProfile, category: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editOperatingCity" className="form-label">Operating City</label>
                            <input type="text" className="form-control" id="editOperatingCity" value={editProfile.operating_city} onChange={(e) => setEditProfile({...editProfile, operating_city: e.target.value})} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="editState" className="form-label">State</label>
                            <input type="text" className="form-control" id="editState" value={editProfile.state} onChange={(e) => setEditProfile({...editProfile, state: e.target.value})} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeEditProfileModalButton">Close</button>
                          <button type="button" className="btn btn-primary" onClick={handleEditProfile}>Save Changes</button>
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
  );
};

export default MyAccount;
