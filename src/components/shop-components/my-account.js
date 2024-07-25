import React, { useContext, useEffect, useState } from 'react';
import { TbCircleFilled } from "react-icons/tb";
import { MdOutlineDeleteOutline, MdDeleteOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyAccount = () => {
  const [profile, setProfile] = useState({});
  const [vehicleData, setVehicleData] = useState([]);
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState({});
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [editProfile, setEditProfile] = useState({});
  const [image, setImage] = useState('https://pngimg.com/d/apple_logo_PNG19666.png'); // Set default image path
  const [updateImage, setUpdateImage] = useState("")
  const [pageRefresh, setPageRefresh] = useState(false)

  const LoginDetails = useSelector((state) => state.login);
  const pageRender = useNavigate();

  useEffect(() => {
    if (!Cookies.get("usrin")) {
      pageRender('/')
    }
  }, [LoginDetails.isLoggedIn]);

  useEffect(() => {
    fetchUserProfile();
  }, [pageRefresh]);

  const fetchUserProfile = () => {
    const encodedUserId = Cookies.get("usrin");
    if (encodedUserId) {
      const userId = window.atob(encodedUserId);

      axios.post('https://truck.truckmessage.com/get_user_profile', {
        user_id: userId,
      })
        .then(response => {
          console.log(response)
          const { data } = response;
          if (data.success && data.data.length > 0) {
            const profileData = data.data.find(item => item.profile);
            const vehicleData = data.data.find(item => item.vehicle_data);
            setProfile(profileData ? profileData.profile : {});
            setVehicleData(vehicleData ? vehicleData.vehicle_data : []);
            setEditProfile(profileData ? profileData.profile : {});
            setImage(profileData && profileData.profile && profileData.profile.image ? profileData.profile.image : 'https://pngimg.com/d/apple_logo_PNG19666.png');

          } else {
            toast.error('Failed to fetch user profile');
          }
        })
        .catch(error => {
          toast.error('Error fetching user profile:', error);
        });
    } else {
      toast.error('User not logged in');
    }
  };

  const handleAddVehicle = () => {

    const encodedUserId = Cookies.get("usrin");
    if (vehicleData.length <= 10) {
      if (encodedUserId) {
        const userId = window.atob(encodedUserId);

        axios.post('https://truck.truckmessage.com/add_user_vehicle_details', {
          user_id: userId,
          vehicle_no: newVehicleNumber,
        })
          .then(response => {
            if (response.data.success) {
              setNewVehicleNumber('');
              fetchUserProfile();
              document.getElementById('closeModalButton').click();
            } else {
              toast.error('Failed to add vehicle');
            }
          })
          .catch(error => {
            toast.error('Error adding vehicle:', error);
          });
      }
    } else {
      toast.error("You can able to add more than 10 vehicle")
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
            setVehicleToDelete(null);
            fetchUserProfile();
            document.getElementById('closeDeleteModalButton').click();
          } else {
            toast.error('Failed to delete vehicle');
          }
        })
        .catch(error => {
          toast.error('Error deleting vehicle:', error);
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
          toast.error('Failed to fetch vehicle details');
        }
      })
      .catch(error => {
        toast.error('Error fetching vehicle details:', error);
      });
  };

  const handleUpdatePhoto = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    if (
      file.name.includes(".png") ||
      file.name.includes(".jpeg") ||
      file.name.includes(".jpg") ||
      file.name.includes(".PNG") ||
      file.name.includes(".JPEG") ||
      file.name.includes(".JPG") ||
      file.name.includes(".HEIC")
    ) {
      setUpdateImage(file)
    //      if (updateImage) {
    //   setImage(URL.createObjectURL(updateImage));
    //   URL.revokeObjectURL(updateImage); 
    // }
    // setUpdateImage("");
    } else {
      console.log(
        "Unsupported file format. Please upload .jpeg, .jpg, .png, .JPEG, .JPG, .PNG, .HEIC files only."
      );
    }
  }

  const handleEditModalClick = () => {
    // setUpdateImage(image)
  }

  console.log(image)

  const handleEditProfile = (e) => {
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
            toast.error('Failed to update profile');
          }

        })
        .catch(error => {
          toast.error('Error updating profile:', error);
        });
    }
  };

  const handleSaveChanges = async () => {
    console.log('save')
    try {

      const encodedUserId = Cookies.get("usrin");
      if (encodedUserId) {
        const userId = window.atob(encodedUserId);

        //   if (!profileImage) return;
        // let localUri = updatedProfileImage;
        // let filename = localUri.split('/').pop();

        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;
        // formData.append('profile_image', { uri: localUri, name: filename, type });
        // formData.append('profile_image', filename);

        let formData = new FormData();
        formData.append("profile_image", updateImage)
        formData.append("user_id", userId)
        formData.append("first_name", editProfile.first_name)
        formData.append("date_of_birth", editProfile.date_of_birth)
        formData.append("category", editProfile.category)
        formData.append("state", editProfile.state)
        formData.append("phone_number", editProfile.phone_number)
        formData.append("operating_city", editProfile.operating_city)

        console.log("profile_image", updateImage)
        console.log("user_id", userId)
        console.log("first_name", editProfile.first_name)
        console.log("date_of_birth", editProfile.date_of_birth)
        console.log("category", editProfile.category)
        console.log("state", editProfile.state)
        console.log("phone_number", editProfile.phone_number)
        console.log("operating_city", editProfile.operating_city)

        const res = await axios.post("https://truck.truckmessage.com/update_profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        if (res.data.error_code === 0) {
          document.getElementById('editProfileCloseIcon').click()
          console.log(res.data)
          setUpdateImage("")
          // setEditing(false);
          setPageRefresh(!pageRefresh)
        } else {
          console.log(res.data.message)
        }
      }


    } catch (err) {
      console.log(err)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };




  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  const downloadCSV = () => {
    const csvContent = Object.keys(selectedVehicleDetails).map(key => {
      const value = selectedVehicleDetails[key] !== null ?
        (typeof selectedVehicleDetails[key] === 'object' && selectedVehicleDetails[key] !== null ?
          JSON.stringify(selectedVehicleDetails[key]) : selectedVehicleDetails[key])
        : 'N/A';
      return `${key},${value}`;
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle_details.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };






  return (
    <div className="liton__wishlist-area mt-5 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className='col-lg-4 col-md-4 '>
                    <div className="ltn-author-introducing clearfix mb-3  ">
                      {/* <div className="author-info">
                        <div className="image-upload">
                          <img
                            src={image}
                            alt="Profile"
                            style={{ width: '52px', height: '52px', borderRadius: '50%', marginBottom: '10px' }}
                          />
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                        Edit Profile
                      </button> */}

                      <div className='h-100 mx-auto'>
                        <img
                          id="profilePic"
                          src={image}
                          width={150}
                          height={150}
                          className="d-block mx-auto my-auto"
                        />
                      </div>


                      <div className="mb-0  ">
                        {/* <div className="placeholder rounded-2 mx-auto bg-danger">
                          <img
                            id="profilePic"
                            src="https://pngimg.com/d/apple_logo_PNG19666.png"
                            width={150}
                            height={150}
                            className=""
                          />
                        </div> */}
                        {/* <label
                          htmlFor="newProfilePhoto"
                          className="upload-file-block "
                          data-bs-toggle="modal"
                          data-bs-target="#profilePhotoModal"
                        >
                          <div className="text-center">
                            <div className="">
                              Upload <br /> Organization Logo
                            </div>
                          </div>
                        </label> */}


                      </div>

                      {/* Profile Photo upload Modal */}

                      <div
                        className="modal fade"
                        id="profilePhotoModal"
                        aria-hidden="true"
                        aria-labelledby="exampleModalToggleLabel"
                        tabIndex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                                Organization Logo Upload
                              </h1>
                              <button
                                id="employerCloseUploadProfilePhotoButton"
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="card border-0 h-100 rounded-4">
                                <div className="card-body d-flex align-items-center justify-content-center">


                                  <div className="w-100">


                                    <div className="w-100 ">
                                      <div className="row justify-content-center p-0">
                                        <div className="pic-holder mb-0  w-75">

                                          <div className="company-logo-container rounded-0">
                                            <img
                                              id="profilePic"
                                              name="profile_pic"
                                              src=""


                                            />
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-3">
                                      <p className="text-center  image-format-text">(Only  .jpeg, .jpg, .png, .JPEG, .JPG, .PNG, .HEIC formats are supported)</p>
                                    </div>
                                    <div className="text-center pt-4">
                                      <button
                                        id="employerUploadProfilePhotoButton"
                                        type="button"
                                        htmlFor="fileInput"
                                        className="btn btn-brand-color mx-3 upload-btn"
                                        data-bs-dismiss="modal"
                                        onClick={() =>
                                          document.getElementById("company-photo").click()
                                        }
                                      >

                                        <input
                                          type="file"
                                          name="profile_pic"
                                          id="company-photo"
                                          hidden
                                          className="form-control"
                                        // onChange={handleCompanyPictureUpload}
                                        />

                                        <span>Upload Logo</span>
                                      </button>
                                      {

                                        <button
                                          id="employerDeleteUploadProfilePhotoButton"
                                          type="button"
                                          className={`btn btn-outline-secondary profile-picture-delete-button`}
                                          data-bs-toggle="modal"
                                          data-bs-target="#deletePhotoModal"
                                        >
                                          <span>Delete Logo</span>
                                        </button>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="modal fade"
                        id="deletePhotoModal"
                        aria-hidden="true"
                        aria-labelledby="deletePhotoModal"
                        tabIndex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="deletePhotoModal">
                                Delete Organization Logo
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                id="deleteProfilePhotoModalConfirmationModal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body text-center pb-4">
                              Are you sure you want to delete this logo?
                              <div className="text-center pt-4">
                                <button
                                  id="cancelDeletePhotoButton"
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  data-bs-dismiss="modal"
                                >

                                  <span>Cancel</span>
                                </button>
                                <button
                                  id="deleteProfilePhotoDeleteButton"
                                  type="button"
                                  className="btn btn-brand-color mx-3 upload-btn"
                                >
                                  <label
                                    className="custom-file-label upload-btn"
                                    onClick=""
                                  >
                                    Delete
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className='col-lg-8 col-md-4'>
                    <div className="ltn-author-introducing clearfix mb-3 ps-5 ">
                      <div className="author-info ">
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
                      </div>
                      <button type="button" className="btn btn-primary mt-3" onClick={() => handleEditModalClick()} data-bs-toggle="modal" data-bs-target="#editProfileModal">
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
                                <li className="list-group-item d-flex justify-content-between align-items-start align-items-center mt-0 p-2">
                                  <div className="me-auto ms-2">
                                    <div className="fw-bold">RC Status</div>
                                    <span className="vehicletext">{vehicle.rc_status}</span>
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
                    <div className="modal-dialog modal-dialog-scrollable modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="vehicleDetailsLabel">Vehicle Details</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <table className="table">
                            <tbody>
                              {Object.keys(selectedVehicleDetails).map(key => (
                                <tr key={key}>
                                  <td style={{ fontWeight: 'bold', width: '30%' }}>{key.replace(/_/g, ' ')}</td>
                                  <td>{selectedVehicleDetails[key] !== null ?
                                    (typeof selectedVehicleDetails[key] === 'object' && selectedVehicleDetails[key] !== null ?
                                      JSON.stringify(selectedVehicleDetails[key]) : selectedVehicleDetails[key])
                                    : 'N/A'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" onClick={downloadCSV}>Download CSV</button>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Edit Profile Modal */}
                  <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                      <div className="modal-content ">
                        <div className="modal-header">
                          <h5 className="modal-title fs-5" id="editProfileModalLabel">Edit Profile</h5>
                          <button type="button" id='editProfileCloseIcon' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                          <div className="row   px-4">
                            <div className='h-100 mx-auto '>
                                <img
                                  id="profilePic"
                                  src={updateImage === "" ? image : URL.createObjectURL(updateImage) }
                                  width={120}
                                  height={120}
                                  className="mb-4 border border-1 p-2 rounded-3"
                                />
                           
                              <span className='ms-5'><a href="">Upload Image</a></span>
                              <input type='file' id='updateImage' onChange={(e) => handleUpdatePhoto(e)} />
                            </div>
                            <div className="col-12 col-md-6 ">
                              <label htmlFor="editFirstName" className="form-label">First Name</label>
                              <input type="text" className="form-control" id="editFirstName" value={editProfile.first_name} onChange={(e) => setEditProfile({ ...editProfile, first_name: e.target.value })} />
                            </div>

                            {/* <div className="mb-3">
                            <label htmlFor="editLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="editLastName" value={editProfile.last_name} onChange={(e) => setEditProfile({...editProfile, last_name: e.target.value})} />
                            </div> */}
                            <div className="col-12 col-md-6">
                              <label htmlFor="editDateOfBirth" className="form-label  border-0 shadow-none">Date of Birth</label>
                              <input type="date" className="form-control" id="editDateOfBirth" value={editProfile.date_of_birth} onChange={(e) => setEditProfile({ ...editProfile, date_of_birth: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-6">
                              <label htmlFor="editPhoneNumber" className="form-label">Phone Number</label>
                              <input type="tel" className="form-control" id="editPhoneNumber" value={editProfile.phone_number} onChange={(e) => setEditProfile({ ...editProfile, phone_number: e.target.value })} />
                            </div>
                            <div className=" col-12 col-md-6">
                              <label htmlFor="editCategory" className="form-label">Category</label>
                              <input type="text" className="form-control" id="editCategory" value={editProfile.category} onChange={(e) => setEditProfile({ ...editProfile, category: e.target.value })} />
                            </div>
                            <div className=" col-12 col-md-6">
                              <label htmlFor="editOperatingCity" className="form-label">Operating City</label>
                              <input type="text" className="form-control" id="editOperatingCity" value={editProfile.operating_city} onChange={(e) => setEditProfile({ ...editProfile, operating_city: e.target.value })} />
                            </div>
                            <div className=" col-12 col-md-6">
                              <label htmlFor="editState" className="form-label">State</label>
                              <input type="text" className="form-control" id="editState" value={editProfile.state} onChange={(e) => setEditProfile({ ...editProfile, state: e.target.value })} />
                            </div>

                            <hr />

                            <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-between">
                              <button type="button" className="btn btn-primary p-2 col-12 col-md-6" onClick={handleSaveChanges}>
                                Save Changes
                              </button>
                              <button type="button" className="btn btn-secondary  mb-md-0 p-2 col-12 col-md-6" data-bs-dismiss="modal" id="closeEditProfileModalButton">
                                Close
                              </button>

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
    </div>
  );
};

export default MyAccount;
