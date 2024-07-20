import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
import { SiMaterialformkdocs } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Autocomplete from "react-google-autocomplete";


const WishList = () => {
  const [activeTab, setActiveTab] = useState('Load');
  const [data, setData] = useState([]);
  const LoginDetails = useSelector((state) => state.login);
  const [reload, setReload] = useState(false)

  const [contactError, setContactError] = useState('');
  const [editingData, setEditingData] = useState({
    company_name: "",
    contact_no: "",
    description: "",
    material: "",
    no_of_tyres: "",
    tone: "",
    truck_body_type: "",
  })

  const [showingFromLocation, setShowingFromLocation] = useState("");
  const [showingToLocation, setShowingToLocation] = useState("");

  useEffect(() => {
    const getPath = window.location.pathname;
    const splitPath = getPath.split('/');
    if (splitPath.length === 4) {
      const path = splitPath[3]
      switch (path) {
        case "load":
          initialRender("all_load_details")
          break;
        case "truck":
          initialRender("all_truck_details")
          break;
        case "driver":
          initialRender("all_driver_details")
          break;
        case "buy_sell":
          initialRender("all_buy_sell_details")
          break;
        default:
          break;
      }
    }
  }, [reload]);

  const handleFromLocation = (selectedLocation) => {
    if (selectedLocation) {
      const cityComponent = selectedLocation.find(component => component.types.includes('locality'));
      const stateComponent = selectedLocation.find(component => component.types.includes('administrative_area_level_1'));

      if (cityComponent && stateComponent) {
        setShowingFromLocation(`${cityComponent.long_name}, ${stateComponent.long_name}`);
      }
    }
  };

  const handleToLocation = (selectedLocation) => {
    if (selectedLocation) {
      const cityComponent = selectedLocation.find(component => component.types.includes('locality'));
      const stateComponent = selectedLocation.find(component => component.types.includes('administrative_area_level_1'));

      if (cityComponent && stateComponent) {
        setShowingToLocation(`${cityComponent.long_name}, ${stateComponent.long_name}`);
      }
    }
  };

  const initialRender = async (newPath) => {
    const getUser = Cookies.get('usrin')
    if (getUser) {
      const decreptUserId = window.atob(getUser)
      try {
        axios.get(`https://truck.truckmessage.com/${newPath}`)
          .then(response => {
            if (response.data.success && Array.isArray(response.data.data)) {
              setData(response.data.data);
            } else {
              console.error('Unexpected response format:', response.data);
            }
          })
          .catch(error => {
            console.error('There was an error fetching the data!', error);
          });
      } catch (err) {
        toast.error(err)
      }
    } else {
      console.log("not logged in")
    }
  }

  const handleChooseUpdate = async () => {
    const getPath = window.location.pathname;
    const splitPath = getPath.split('/');
    if (splitPath.length === 4) {
      const path = splitPath[3]
      switch (path) {
        case "load":
          var userId = window.atob(Cookies.get("usrin"));
          const load_details = {
            company_name: editingData.company_name,
            contact_no: editingData.contact_no,
            from: showingFromLocation,
            to: showingToLocation,
            material: editingData.material,
            tone: editingData.tone,
            truck_body_type: editingData.truck_body_type,
            no_of_tyres: editingData.no_of_tyres,
            description: editingData.description,
            load_id: JSON.stringify(editingData.load_id),
            user_id: userId
          };
          handleUpdate("load_details", load_details)
          break;
        case "truck":
          var userId = window.atob(Cookies.get("usrin"));
          const truck_entry = {
            company_name: editingData.company_name,
            vehicle_number: editingData.vehicle_number,
            contact_no: editingData.contact_no,
            from: showingFromLocation,
            to: showingToLocation,
            tone: editingData.tone,
            truck_body_type: editingData.truck_body_type,
            no_of_tyres: editingData.no_of_tyres,
            description: editingData.description,
            truck_name: editingData.truck_name,
            truck_id: JSON.stringify(editingData.truck_id),
            user_id: userId
          };
          handleUpdate("truck_entry", truck_entry)
          break;
        case "driver":
          var userId = window.atob(Cookies.get("usrin"));
          const driver_entry = {
            company_name: editingData.company_name,
            vehicle_number: editingData.vehicle_number,
            contact_no: editingData.contact_no,
            from: showingFromLocation,
            to: showingToLocation,
            tone: editingData.tone,
            truck_body_type: editingData.truck_body_type,
            no_of_tyres: editingData.no_of_tyres,
            description: editingData.description,
            truck_name: editingData.truck_name,
            driver_name: editingData.driver_name,
            driver_id: JSON.stringify(editingData.driver_id),
            user_id: userId
          };
          handleUpdate("driver_entry", driver_entry)
          break;
        case "buy_sell":
          var userId = window.atob(Cookies.get("usrin"));
          const truck_buy_sell = {
            buy_sell_id: JSON.stringify(editingData.buy_sell_id),
            user_id: userId
          };
          handleUpdate("truck_buy_sell", truck_buy_sell)
          break;
        default:
          break;
      }
    }
  };

  const closeModal = () =>{
    const getPath = window.location.pathname;
    const splitPath = getPath.split('/');
    if (splitPath.length === 4) {
      const path = splitPath[3]
      switch (path) {
        case "load":
         return document.getElementById('closeModelOne').click()
        case "truck":
         return document.getElementById('closeModelTwo').click()
        case "driver":
         return document.getElementById('closeModelThree').click()           
        case "buy_sell":
         return document.getElementById('closeModelOne').click()
        default:
          break;
      }
    }
  }

  const handleUpdate = async (updationPath, updationData) => {
    try {
      const res = await axios.post(`https://truck.truckmessage.com/${updationPath}`, updationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data.error_code === 0) {
        setReload(!reload)
        toast.success(res.data.message)

        closeModal()
      } else {
        toast.error(res.data.message)
      }
    }
    catch (error) {
      toast.error('Failed to update.');
      console.error('There was an error!', error);
    }
  }

  const handleChooseDelete = (deletionId) => {
    const getPath = window.location.pathname;
    const splitPath = getPath.split('/');
    if (splitPath.length === 4) {
      const path = splitPath[3]
      switch (path) {
        case "load":
          const remove_load_details = {
            load_id: JSON.stringify(deletionId.load_id)
          };
          hanldeDelete("remove_load_details", remove_load_details)
          break;
        case "truck":
          const remove_truck_entry = {
            truck_id: JSON.stringify(deletionId.truck_id)
          };
          hanldeDelete("remove_truck_entry", remove_truck_entry)
          break;
        case "driver":
          const remove_driver_entry = {
            driver_id: JSON.stringify(deletionId.driver_id)
          };
          hanldeDelete("remove_driver_entry", remove_driver_entry)
          break;
        case "buy_sell":
          const remove_truck_buy_sell = {
            buy_sell_id: JSON.stringify(deletionId.buy_sell_id)
          };
          hanldeDelete("remove_truck_buy_sell", remove_truck_buy_sell)
          break;
        default:
          break;
      }
    }
  }

  const hanldeDelete = async (deletionPath, deletionData) => {
    try {
      const res = await axios.post(`https://truck.truckmessage.com/${deletionPath}`, deletionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data.error_code === 0) {
        toast.success(res.data.message);
        setReload(!reload)        
      } else {
        toast.error(res.data.message)
      }
    }
    catch (error) {
      toast.error('Failed to delete.');
      console.error('There was an error!', error);
    }
  }

  const handleEdit = (editObject) => {
    setShowingFromLocation(editObject.from_location);
    setShowingToLocation(editObject.to_location);
    setEditingData(editObject)
  }

  const renderLoadCard = () => {
    return data.map(item => (
      <div className="col-12 col-md-6 col-lg-4 mb-4" key={item.id}>
        <div className="card h-100 shadow truckcard">
          <div className='card-header mt-2 border-0 mb-2'>
            <h5 className="card-title cardmodify">{item.company_name}</h5>
          </div>
          <div className="card-body p-3 mt-2 mb-2">
            <div className='row'>
              <div className="col-lg-12 cardicon">
                <div>
                  <label><FaLocationDot className="me-2 text-danger" />{item.from_location}</label>
                </div>
              </div>
              <div className="col-lg-12 cardicon">
                <div><label><FaLocationDot className='me-2 text-success' />{item.to_location}</label></div>
              </div>
            </div>
            <hr className="hr m-2" />
            <div className='row'>
              <div className="col-lg-6 cardicon">
                <div>
                  <label><FaWeightHanging className='me-2' />{item.tone} ton</label>
                </div>
              </div>
              <div className="col-lg-6 cardicon">
                <div><label><SiMaterialformkdocs className='me-2' />{item.material}</label></div>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-6 cardicon">
                <label><GiCarWheel className='me-2' />{item.no_of_tyres} wheels</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.truck_body_type}</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.contact_no}</label>
              </div>
            </div>
            <div className='m-2'>
              <h5 className="card-title mt-3">Description</h5>
              <p className="card-text paragraph">{item.description}</p>
            </div>
          </div>
          <div className="card-footer mb-3">
            <div>
              <div className="d-flex gap-2 justify-content-between mt-3">
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(item)}>Edit</button>

                <button className="btn cardbutton" type="button" onClick={() => handleChooseDelete(item)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderTruckCard = () => {
    return data.map(item => (
      <div className="col-12 col-md-6 col-lg-4 mb-4" key={item.id}>
        <div className="card h-100 shadow truckcard">
          <div className='card-header mt-2 border-0 mb-2'>
            <h5 className="card-title cardmodify">{item.company_name}</h5>
          </div>
          <div className="card-body p-3 mt-2 mb-2">
            <div className='row'>
              <div className="col-lg-12 cardicon">
                <div>
                  <label><FaLocationDot className="me-2 text-danger" />{item.from_location}</label>
                </div>
              </div>
              <div className="col-lg-12 cardicon">
                <div><label><FaLocationDot className='me-2 text-success' />{item.to_location}</label></div>
              </div>
            </div>
            <hr className="hr m-2" />
            <div className='row'>
              <div className="col-lg-6 cardicon">
                <div>
                  <label><FaWeightHanging className='me-2' />{item.tone} ton</label>
                </div>
              </div>
              <div className="col-lg-6 cardicon">
                <div><label><SiMaterialformkdocs className='me-2' />{item.material}</label></div>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-6 cardicon">
                <label><GiCarWheel className='me-2' />{item.no_of_tyres} wheels</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.truck_body_type}</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.contact_no}</label>
              </div>
            </div>
            <div className='row px-2'>
              <div className='col-6'>
                <h5 className="card-title mt-3">Truck name</h5>
                <p className="card-text paragraph">{item.truck_name}</p>
              </div>
              <div className='col-6'>
                <h5 className="card-title mt-3">vehicle number</h5>
                <p className="card-text paragraph">{item.vehicle_number}</p>
              </div>
            </div>
            <div className='m-2'>
              <h5 className="card-title mt-3">Description</h5>
              <p className="card-text paragraph">{item.description}</p>
            </div>
          </div>
          <div className="card-footer mb-3">
            <div>
              <div className="d-flex gap-2 justify-content-between mt-3">
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModaltwo" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn cardbutton" type="button" onClick={() => handleChooseDelete(item)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderDriverCard = () => {
    return data.map(item => (
      <div className="col-12 col-md-6 col-lg-4 mb-4" key={item.id}>
        <div className="card h-100 shadow truckcard">
          <div className='card-header mt-2 border-0 mb-2'>
            <h5 className="card-title cardmodify">{item.company_name}</h5>
          </div>
          <div className="card-body p-3 mt-2 mb-2">
            <div className='row'>
              <div className="col-lg-12 cardicon">
                <div>
                  <label><FaLocationDot className="me-2 text-danger" />{item.from_location}</label>
                </div>
              </div>
              <div className="col-lg-12 cardicon">
                <div><label><FaLocationDot className='me-2 text-success' />{item.to_location}</label></div>
              </div>
            </div>

            <hr className="hr m-2" />
            <div className='row'>
              <div className="col-lg-6 cardicon">
                <label><GiCarWheel className='me-2' />{item.no_of_tyres} wheels</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.truck_body_type}</label>
              </div>
              <div className="col-lg-6 cardicon">
                <label><FaTruck className='me-2' />{item.contact_no}</label>
              </div>
            </div>
            <div className='row px-2'>
              <div className='col-6'>
                <h5 className="card-title mt-3">Driver name</h5>
                <p className="card-text paragraph">{item.driver_name}</p>
              </div>
              <div className='col-6'>
                <h5 className="card-title mt-3">Truck name</h5>
                <p className="card-text paragraph">{item.truck_name}</p>
              </div>
              <div className='col-6'>
                <h5 className="card-title mt-3">vehicle number</h5>
                <p className="card-text paragraph">{item.vehicle_number}</p>
              </div>
            </div>
            <div className='m-2'>
              <h5 className="card-title mt-3">Description</h5>
              <p className="card-text paragraph">{item.description}</p>
            </div>
          </div>
          <div className="card-footer mb-3">
            <div>
              <div className="d-flex gap-2 justify-content-between mt-3">
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalthree" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn cardbutton" type="button" onClick={() => handleChooseDelete(item)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  const renderTabContent = () => {
    const getPath = window.location.pathname;
    const splitPath = getPath.split('/');
    const path = splitPath[3]
    switch (path) {
      case 'load':
        return <div className="row">{renderLoadCard()}</div>;
      case 'truck':
        return <div className="row">{renderTruckCard()}</div>;
      case 'driver':
        return <div className="row">{renderDriverCard()}</div>;
      case 'buy_sell':
        return <div>Contact Content</div>;
      default:
        return null;
    }
  };

  const getWhishlistData = (tabEndpoint) => {
    setData([]);
    try {
      axios.get(`https://truck.truckmessage.com/${tabEndpoint}`)
        .then(response => {
          if (response.data.success && Array.isArray(response.data.data)) {
            setData(response.data.data);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className='container'>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to="/wishlist/load" className={"nav-link"} onClick={() => getWhishlistData('all_load_details')}>Load availability post</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist/truck" className={"nav-link"} onClick={() => getWhishlistData('all_truck_details')}>Truck availability post</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist/driver" className={"nav-link"} onClick={() => getWhishlistData('all_driver_details')}>Driver availability post</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist/buy_sell" className={"nav-link"} onClick={() => getWhishlistData('all_buy_sell_details')}>Buy & Sell Post</NavLink>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {renderTabContent()}
      </div>



      {/* Modal 01 */}

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModelOne"></button>
            </div>
            <div class="modal-body">
              <div className="ltn__appointment-inner">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Company Name</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="company_name" placeholder="Name of the Owner" value={editingData.company_name} onChange={(e) => setEditingData({ ...editingData, company_name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Contact Number</h6>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.contact_no} onChange={(e) => setEditingData({ ...editingData, contact_no: e.target.value })} required />
                      {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>From</h6>
                    <div className="input-item input-item-name">
                      <Autocomplete name="from_location"
                        className="google-location location-input bg-transparent py-2"
                        apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                        onPlaceSelected={(place) => {
                          if (place) {
                            handleFromLocation(place.address_components);
                          }
                        }}
                        required
                        value={showingFromLocation}
                        onChange={(e) => setShowingFromLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>To</h6>
                    <div className="input-item input-item-name">
                      <Autocomplete name="to_location"
                        className="google-location location-input bg-transparent py-2"
                        apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                        onPlaceSelected={(place) => {
                          if (place) {
                            handleToLocation(place.address_components);
                          }
                        }}
                        required
                        value={showingToLocation}
                        onChange={(e) => setShowingToLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Material</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="material" placeholder="What type of material" value={editingData.material} onChange={(e) => setEditingData({ ...editingData, material: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Ton</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="tone" placeholder="Example: 2 tones" value={editingData.tone} onChange={(e) => setEditingData({ ...editingData, tone: e.target.value })} required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Truck Body Type</h6>
                    <div className="input-item">
                      <select className="nice-select" name="truck_body_type" value={editingData.truck_body_type} onChange={(e) => setEditingData({ ...editingData, truck_body_type: e.target.value })}>
                        <option value="open_body">Open Body</option>
                        <option value="container">Container</option>
                        <option value="trailer" >Trailer</option>
                        <option value="tanker">Tanker</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <h6>No. of Tyres</h6>
                    <div className="input-item">
                      <select className="nice-select" name="tyre_count" value={editingData.no_of_tyres} onChange={(e) => setEditingData({ ...editingData, no_of_tyres: e.target.value })}>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h6>Descriptions (Optional)</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea name="description" placeholder="Enter a text here" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary col-12 col-md-3" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary col-12 col-md-3" onClick={handleChooseUpdate}>Save changes</button></div>
          </div>
        </div>
      </div>



      {/* Modal 02 */}

      <div class="modal fade" id="exampleModaltwo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModelOne"></button>
            </div>

            <div class="modal-body">
              <div className="ltn__appointment-inner">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Company Name</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="company_name" placeholder="Name of the Owner" value={editingData.company_name} onChange={(e) => setEditingData({ ...editingData, company_name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Contact Number</h6>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.contact_no} onChange={(e) => setEditingData({ ...editingData, contact_no: e.target.value })} required />
                      {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <h6>Truck name</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="company_name" placeholder="Name of the Owner" value={editingData.truck_name} onChange={(e) => setEditingData({ ...editingData, truck_name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Vehicle Number</h6>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.vehicle_number} onChange={(e) => setEditingData({ ...editingData, vehicle_number: e.target.value })} required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>From</h6>
                    <div className="input-item input-item-name">
                      <Autocomplete name="from_location"
                        className="google-location location-input bg-transparent py-2"
                        apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                        onPlaceSelected={(place) => {
                          if (place) {
                            handleFromLocation(place.address_components);
                          }
                        }}
                        required
                        value={showingFromLocation}
                        onChange={(e) => setShowingFromLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>To</h6>
                    <div className="input-item input-item-name">
                      <Autocomplete name="to_location"
                        className="google-location location-input bg-transparent py-2"
                        apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                        onPlaceSelected={(place) => {
                          if (place) {
                            handleToLocation(place.address_components);
                          }
                        }}
                        required
                        value={showingToLocation}
                        onChange={(e) => setShowingToLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Material</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="material" placeholder="What type of material" value={editingData.material} onChange={(e) => setEditingData({ ...editingData, material: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Ton</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="tone" placeholder="Example: 2 tones" value={editingData.tone} onChange={(e) => setEditingData({ ...editingData, tone: e.target.value })} required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Truck Body Type</h6>
                    <div className="input-item">
                      <select className="nice-select" name="truck_body_type" value={editingData.truck_body_type} onChange={(e) => setEditingData({ ...editingData, truck_body_type: e.target.value })}>
                        <option value="open_body">Open Body</option>
                        <option value="container">Container</option>
                        <option value="trailer" >Trailer</option>
                        <option value="tanker">Tanker</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <h6>No. of Tyres</h6>
                    <div className="input-item">
                      <select className="nice-select" name="tyre_count" value={editingData.no_of_tyres} onChange={(e) => setEditingData({ ...editingData, no_of_tyres: e.target.value })}>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h6>Descriptions (Optional)</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea name="description" placeholder="Enter a text here" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary col-12 col-md-3" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary col-12 col-md-3" onClick={handleChooseUpdate}>Save changes</button></div>
          </div>
        </div>
      </div>


      {/* Modal 03 */}

      <div class="modal fade" id="exampleModalthree" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModelThree"></button>
            </div>
            <div class="modal-body">
              <div className="ltn__appointment-inner">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h6>Driver Name</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="company_name" placeholder="Name of the Owner" value={editingData.driver_name} onChange={(e) => setEditingData({ ...editingData, driver_name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Vehicle Number</h6>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.vehicle_number} onChange={(e) => setEditingData({ ...editingData, vehicle_number: e.target.value })} required />
                      {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <h6>Company Name</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" name="company_name" placeholder="Name of the Owner" value={editingData.company_name} onChange={(e) => setEditingData({ ...editingData, company_name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Contact Number</h6>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="tel" name="contact_no" placeholder="Type your contact number" value={editingData.contact_no} onChange={(e) => setEditingData({ ...editingData, contact_no: e.target.value })} required />
                      {contactError && <p style={{ color: 'red' }}>{contactError}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <h6>From</h6>
                  <div className="input-item input-item-name">
                    <Autocomplete name="from_location"
                      className="google-location location-input bg-transparent py-2"
                      apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                      onPlaceSelected={(place) => {
                        if (place) {
                          handleFromLocation(place.address_components);
                        }
                      }}
                      required
                      value={showingFromLocation}
                      onChange={(e) => setShowingFromLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <h6>To</h6>
                  <div className="input-item input-item-name">
                    <Autocomplete name="to_location"
                      className="google-location location-input bg-transparent py-2"
                      apiKey="AIzaSyA09V2FtRwNpWu7Xh8hc7nf-HOqO7rbFqw"
                      onPlaceSelected={(place) => {
                        if (place) {
                          handleToLocation(place.address_components);
                        }
                      }}
                      required
                      value={showingToLocation}
                      onChange={(e) => setShowingToLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <h6>Material</h6>
                  <div className="input-item input-item-name ltn__custom-icon">
                    <input type="text" name="material" placeholder="What type of material" value={editingData.material} onChange={(e) => setEditingData({ ...editingData, material: e.target.value })} required />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <h6>Ton</h6>
                  <div className="input-item input-item-name ltn__custom-icon">
                    <input type="text" name="tone" placeholder="Example: 2 tones" value={editingData.tone} onChange={(e) => setEditingData({ ...editingData, tone: e.target.value })} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <h6>Truck Body Type</h6>
                  <div className="input-item">
                    <select className="nice-select" name="truck_body_type" value={editingData.truck_body_type} onChange={(e) => setEditingData({ ...editingData, truck_body_type: e.target.value })}>
                      <option value="open_body">Open Body</option>
                      <option value="container">Container</option>
                      <option value="trailer" >Trailer</option>
                      <option value="tanker">Tanker</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <h6>No. of Tyres</h6>
                  <div className="input-item">
                    <select className="nice-select" name="tyre_count" value={editingData.no_of_tyres} onChange={(e) => setEditingData({ ...editingData, no_of_tyres: e.target.value })}>
                      <option value="6">6</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="22">22</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h6>Descriptions (Optional)</h6>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea name="description" placeholder="Enter a text here" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary col-12 col-md-3" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary col-12 col-md-3" onClick={handleChooseUpdate}>Save changes</button></div>
          </div>
        </div>
      </div>








      {/* Modal 04 */}

      <div class="modal fade" id="exampleModalfour" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <div className=' d-flex gap-2 '>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button></div>
            </div>
          </div>
        </div>
      </div>


    </div >

  );
};

export default WishList;
