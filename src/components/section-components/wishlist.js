import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaWeightHanging, FaTruck, FaLocationDot } from "react-icons/fa6";
import { SiMaterialformkdocs } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import Cookies from 'js-cookie';

const WishList = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://truck.truckmessage.com/all_load_details')
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = window.atob(Cookies.get("usrin"));
    const data = {
      company_name: formData.get('company_name'),
      contact_no: formData.get('contact_no'),
      from_location: formData.get('from_location'),
      to_location: formData.get('to_location'),
      material: formData.get('material'),
      tone: formData.get('tone'),
      truck_body_type: formData.get('truck_body_type'),
      no_of_tyres: formData.get('tyre_count'),
      description: formData.get('description'),
      user_id: userId
    };
    // Add your submit logic here, e.g., sending data to the server
  };

  const renderCards = () => {
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
              {/* <div className="d-flex gap-2 justify-content-between mt-3">
                <a href={`tel:${item.contact_no}`} className="btn cardbutton">Call</a>
                <button className="btn cardbutton" type="button">Message</button>
              </div> */}
              <div className="d-flex gap-2 justify-content-between mt-3">
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                <button className="btn cardbutton" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };


  const tab2 = () => {
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
              {/* <div className="d-flex gap-2 justify-content-between mt-3">
                <a href={`tel:${item.contact_no}`} className="btn cardbutton">Call</a>
                <button className="btn cardbutton" type="button">Message</button>
              </div> */}
              <div className="d-flex gap-2 justify-content-between mt-3">
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModaltwo">Edit</button>
                <button className="btn cardbutton" type="button" data-bs-toggle="modal" data-bs-target="#exampleModaltwo">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Load':
        return <div className="row">{renderCards()}</div>;
      case 'Truck':
        return <div className="row">{tab2()}</div>;
      case 'Driver':
        return <div className="row">{renderCards()}</div>;
      case 'Buy':
        return <div>Contact Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'Load' ? 'active' : ''}`}
            onClick={() => setActiveTab('Load')}
          >
            Load availability post
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'Truck' ? 'active' : ''}`}
            onClick={() => setActiveTab('Truck')}
          >
            Truck availability post
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'Driver' ? 'active' : ''}`}
            onClick={() => setActiveTab('Driver')}
          >
            Driver availability post
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'Buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('Buy')}
          >
            Buy & Sell Post
          </a>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {renderTabContent()}
      </div>



{/* Modal 01 */}

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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



{/* Modal 02 */}

<div class="modal fade" id="exampleModaltwo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


{/* Modal 03 */}

<div class="modal fade" id="exampleModalthree" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


    </div>
    
  );
};

export default WishList;
