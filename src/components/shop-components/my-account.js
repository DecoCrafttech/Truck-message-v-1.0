import React, { useEffect, useState } from 'react';
import { TbCircleFilled } from "react-icons/tb";
import { MdOutlineDeleteOutline, MdDeleteOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';

const MyAccount = () => {
  const [profile, setProfile] = useState({});
  const [vehicleData, setVehicleData] = useState([]);
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState({});

  useEffect(() => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);
      fetchUserProfile(userId);
    } else {
      console.error('User not logged in');
    }
  }, []);

  const fetchUserProfile = (userId) => {
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

  const handleDeleteVehicle = (vehicleNumber) => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);

      axios.post('https://truck.truckmessage.com/remove_user_vehicle_details', {
        user_id: userId,
        vehicle_no: vehicleNumber,
      })
        .then(response => {
          if (response.data.success) {
            setVehicleData(prevVehicleData => prevVehicleData.filter(vehicle => vehicle.rc_number !== vehicleNumber));
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
                            <div className="footer-address-icon">
                            </div>
                            <div  >
                              <p> <   FaRegCalendarAlt className="me-3"/> {formatDate(profile.date_of_birth)}</p>
                            </div>
                          </li>
                          <li>
                            <div className="footer-address-icon">
                            </div>
                            <div className="footer-address-info">
                              <p> <IoCallOutline   className='me-3'/> <a href={`tel:+${profile.phone_number}`}> {profile.phone_number}</a></p>
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
                  <div className="mb-3 col-lg-12">
                    <button type="button" className="btn btn-danger text-uppercase" data-bs-toggle="modal" data-bs-target="#vehicleNumber">Add My Truck</button>
                  </div>

                  {/* vehicles details */}
                  <div className="container">
                    <div className="row">
                      {vehicleData.map((vehicle, index) => (
                        <div className="col-lg-4 mt-4 mb-4" key={index}>
                          <div className="widget">
                            <div className="d-flex justify-content-between align-items-start align-items-center mb-0">
                              <h4 className="ltn__widget-title ltn__widget-title-border-2">{vehicle.rc_number}</h4>
                              <span className="align-items-start">
                                <button className="btn fs-4 p-0" onClick={() => handleDeleteVehicle(vehicle.rc_number)}>
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
                                    <div className="fw-bold">Pollution</div>
                                    <span className="vehicletext">{formatDate(vehicle.pucc_upto)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-warning fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">National Permit</div>
                                    <span className="vehicletext">{formatDate(vehicle.national_permit_upto)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-danger fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">Tax Upto</div>
                                    <span className="vehicletext">{formatDate(vehicle.tax_upto_paid)}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-warning fs-4" />
                                  </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">RC Status</div>
                                    <span className="vehicletext">{vehicle.rc_status}</span>
                                  </div>
                                  <div className="d-flex">
                                    <TbCircleFilled className="me-2 text-danger fs-4" />
                                  </div>
                                </li>

                              </ul>
                              <div className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 mb-2 p-2">
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewall">
                                  View Details
                                </button>
                              </div>
                            </div>
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
                          <h5 className="modal-title" id="vehicleNumberLabel">Add My Truck</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="vehicleNumberInput" className="form-label">Vehicle Number</label>
                              <input
                                type="text"
                                className="form-control"
                                id="vehicleNumberInput"
                                value={newVehicleNumber}
                                onChange={(e) => setNewVehicleNumber(e.target.value)}
                              />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" onClick={handleAddVehicle}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>

                 

                  {/* viewall modal */}

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
