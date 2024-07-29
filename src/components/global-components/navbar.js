import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Services/axiosInstance';
import { updateIsLoggedIn, updateUserDetails } from '../../Storage/Slices/LoginSlice';
import Cookie from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
    const Login = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const pageRender = useNavigate();


    const publicUrl = process.env.PUBLIC_URL + '/';

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);

    const [otpInput, setOtpInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [dob, setDob] = useState('');
    const [operatingCity, setOperatingCity] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        const isUserExist = Cookie.get("usrin")
        if (isUserExist) {
            dispatch(updateIsLoggedIn(true));
        } else {
            dispatch(updateIsLoggedIn(false));
        }
    })


    const signIn = async () => {
        if (phoneNumber === '' || password === '') {
            toast.error('Please fill in all fields.');
        } else if (!termsChecked) {
            toast.error('Please agree to the terms and conditions.');
        } else {
            try {
                const loginData = {
                    username: phoneNumber,
                    password: password
                }
                const res = await axiosInstance.post('/login', loginData)
                if (res.data.error_code === 0) {
                    const userId = window.btoa(res.data.data.user_id);
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    //updating username in cookies
                    Cookie.set("usrin", userId, {
                        expires: date, // 1 day
                        secure: true,
                        sameSite: 'strict',
                        path: '/'
                    })

                    // dispatch(updateUserDetails(loginData));
                    dispatch(updateIsLoggedIn(true));
                    document.getElementById("closeSignInModel").click();
                } else {
                    toast.error("Login failed")
                }
            } catch (err) {
                toast.error(err.code)
            }
        }
    };


    const register = async () => {
        try {
            if (firstName === '' || dob === '' || phoneNumber === '' || password === '' || confirmPassword === '' || operatingCity === '') {
                toast.error('Please fill in all fields.');
                return;
            } else if (password !== confirmPassword) {
                toast.error('Passwords do not match.');
                return;
            } else if (!termsChecked) {
                toast.error('You must agree to the terms and conditions.');
                return;
            }

            const registrationData = {
                first_name: firstName,
                date_of_birth: dob,
                category: state, // Assuming the state variable holds the category
                state: state,
                phone_number: phoneNumber,
                password: password,
                operating_city: operatingCity
            };

            const res = await axios.post('https://truck.truckmessage.com/registration', registrationData)
            if (res.data.error_code === 0) {
                if (res.data.success) {
                    toast.success(res.data.message)
                    sendOTP(phoneNumber); // Send OTP after successful registration
                    setStep(2); // Move to step 2 after registration
                }else{
                    document.getElementById("registrationModalClose").click()
                    toast.error(res.data.message)
                }
            }
        } catch (err) {
            toast.error(err.code)
        }
    };

    const sendOTP = async (phone) => {
        try {
            await axiosInstance.post('/send_signup_otp', { phone_number: phone })
        } catch (err) {
            toast.error(err.code)
        }
    };

    const validateOTP = async () => {
        try {
            if (otpInput === '') {
                toast.error('Please enter OTP.');
                return;
            }

            const otpData = {
                phone_number: phoneNumber,
                otp: otpInput
            };

            const res = await axiosInstance.post('/validate_otp', otpData);
            if (res.data.error_code === 0) {
                // const userId = window.btoa(res.data.data.user_id);
                // var date = new Date();
                // date.setDate(date.getDate() + 1);
                // console.log(date)
                // //updating username in cookies
                // Cookie.set("usrin", userId, {
                //     expires: date, // 1 day
                //     secure: true,
                //     sameSite: 'strict',
                //     path: '/'
                // })

                // dispatch(updateUserDetails(loginData));
                // dispatch(updateIsLoggedIn(true));

                document.getElementById("registrationModalClose").click();
            }

        } catch (err) {
            console.log(err)
        }
    };

    const handlePhoneNumberInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        setPhoneNumber(e.target.value);
    };

    const handleLogOut = () => {
        Cookie.remove("usrin");
        dispatch(updateIsLoggedIn(false));
    }

    return (
        <>
            <div>
                <header className="ltn__header-5 ltn__header-transparent--- gradient-color-4---">
                    <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="ltn__top-bar-menu text-start  mailtext">
                                        <ul>
                                            <li>
                                                <a className=' mailtext' href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                                                    <i className="icon-mail" /> info@truckmessage.com
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="top-bar-right justify-content-end">
                                        <div className="ltn__top-bar-menu text-end">
                                            <ul>
                                                <li>
                                                    <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
                                                        <ul>
                                                            <li>
                                                                <a href="#" className="dropdown-toggle">
                                                                    <span className="active-currency">English</span>
                                                                </a>
                                                                <ul>
                                                                    <li><Link to="#">Arabic</Link></li>
                                                                    <li><Link to="#">Bengali</Link></li>
                                                                    <li><Link to="#">Chinese</Link></li>
                                                                    <li><Link to="#">English</Link></li>
                                                                    <li><Link to="#">French</Link></li>
                                                                    <li><Link to="#">Hindi</Link></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
                        <div className="container">
                            <div className="row">

                                <div className="col">
                                    <div className="site-logo-wrap mb-0">
                                        <div className="site-logo go-top">
                                            <Link to="/"><img src={publicUrl + "assets/img/truckmessage.png"} alt="truck message Logo - All in one truck solutions" /></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col header-menu-column d-none d-xl-block">
                                    <div className="header-menu">
                                        <nav>
                                            <div className="ltn__main-menu go-top">
                                                <ul>
                                                    <li><Link to="/">Home</Link></li>
                                                    <li><Link to="/service">Services</Link></li>
                                                    <li><Link to="/about">About</Link></li>
                                                    <li><Link to="/blog">Blog</Link></li>
                                                    <li><Link to="/contact">Contact</Link></li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>


                                <div className="col">
                                    <div className='ltn__header-options ltn__header-options-2 mb-sm-20 justify-content-end align-items-center mb-0'>
                                        {
                                            Login.isLoggedIn ?
                                                <>
                                                    <div class="dropdown dropdown m-0 h-100">
                                                        <div className="dropdown col-12 text-center" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <img className='user-icon-width btn ltn__utilize-toggle p-0 shadow' src='https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg' alt="profile logo" />
                                                        </div>
                                                        <ul class="dropdown-menu dropdown-menu-lg-end">
                                                            <li className='m-0' onClick={() => pageRender("my_profile")}><button class="dropdown-item" type="button">My account</button></li>
                                                            <li className='m-0' onClick={() => pageRender("wishlist/load")}><button class="dropdown-item" type="button">My post</button></li>
                                                            <li className='m-0'><button class="dropdown-item" type="button">Enquiry</button></li>
                                                            <li className='m-0' onClick={handleLogOut}><button class="dropdown-item" type="button">Log out</button></li>
                                                        </ul>
                                                    </div>
                                                </>
                                                :
                                                <div className="ltn__drop-menu user-menu">
                                                    <ul>
                                                        <li>
                                                            <Link data-bs-toggle="modal" data-bs-target="#loginModal" title="Login">
                                                                <i className="far fa-sign-in-alt" />
                                                                <span className="tooltip">Login</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link data-bs-toggle="modal" data-bs-target="#registerModal" title="Sign Up" onClick={() => setStep(1)}>
                                                                <i className="fas fa-user-plus" />
                                                                <span className="tooltip">Sign Up</span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                        }

                                        <div class="dropdown mobile-menu-toggle dropdown d-xl-none">
                                            <button type="button" class="btn ltn__utilize-toggle p-0 shadow" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-bars p-0" />
                                            </button>
                                            <ul class="dropdown-menu end-0 dropdown-menu-lg-end">
                                                <li className='mt-0'><Link to="/" class="dropdown-item">Home</Link></li>
                                                <li className='mt-0'><Link to="/service" class="dropdown-item">Services</Link></li>
                                                <li className='mt-0'><Link to="/" class="dropdown-item">About</Link></li>
                                                <li className='mt-0'><Link to="/" class="dropdown-item">Blog</Link></li>
                                                {/* <li className='mt-0'><Link to="/blog" class="dropdown-item">Blog</Link></li> */}
                                                <li className='mt-0'><Link to="/contact" class="dropdown-item">Contact</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>


                <div id="ltn__utilize-mobile-menu" className="ltn__utilize ltn__utilize-mobile-menu">
                    <div className="ltn__utilize-menu-inner ltn__scrollbar">
                        <div className="ltn__utilize-menu-head">
                            <div className="site-logo">
                                <Link to="/"><img src={publicUrl + "assets/img/logo.png"} alt="Logo" /></Link>
                            </div>
                            <button className="ltn__utilize-close">×</button>
                        </div>
                        <div className="ltn__utilize-menu">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/service">Services</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
                            <ul>
                                {Login.isLoggedIn && (
                                    <li>
                                        <Link to="/my-account" title="My Account">
                                            <span className="utilize-btn-icon">
                                                <i className="far fa-user" />
                                            </span>
                                            My Account
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {/* login modal  */}
            <div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 ">
                            <h1 class="modal-title fs-5 " id="staticBackdropLabel">Login</h1>
                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close" id="closeSignInModel"></button>
                        </div>
                        <div class="modal-body">
                            <section>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card mx-auto p-3 pt-2 border-0" style={{ maxWidth: '520px' }}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label>Phone Number</label>
                                                    <input type="text" className="form-control" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                <div className="form-group form-check">
                                                    <input type="checkbox" className="form-check-input" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                                                    <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
                                                </div>
                                                <button type="button" className="btn btn-primary btn-block" onClick={signIn}>Sign In</button>
                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* register modal  */}
            <div class="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h1 class="modal-title fs-5  " id="staticBackdropLabel">Registration</h1>
                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close" id="registrationModalClose"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-lg-12 p-2 border-0">
                                    <div className="card mx-auto  border-0" style={{ maxWidth: '520px' }}>
                                        <div className="card-body">
                                            {/* <h4 className="card-title mb-4">Registration</h4> */}
                                            <div id="step1" style={{ display: step === 1 ? 'block' : 'none' }}>
                                                <div className="form-group ">
                                                    <label className='mb-1'>Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter Your Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                </div>

                                                <div className="form-group ">
                                                    <label>Date of Birth</label>
                                                    <input type="date" className="form-control py-3" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                                                </div>
                                                <div className="input-item mb-3">
                                                    <label>Phone Number</label>
                                                    <div className="input-group ">
                                                        <div className="input-group-prepend d-flex">
                                                            <span className="input-group-text py-3">+91</span>
                                                        </div>
                                                        <input type="tel" className="form-control py-3" placeholder="Phone number" value={phoneNumber} onInput={handlePhoneNumberInput} maxLength="10" />
                                                    </div>
                                                </div>
                                                <div className="input-item mb-3">
                                                    <label>Category</label>
                                                    <select className="form-control nice-select " value={state} onChange={(e) => setState(e.target.value)}>
                                                        <option value="">Category</option>
                                                        <option value="LORRY OWNER">Lorry Owner</option>
                                                        <option value="LOGISTICS">Logistics</option>
                                                        <option value="LORRY CONTRACTERS">Lorry Contractors</option>
                                                        <option value="LOAD BOOKING AGENT">Load Booking Agent</option>
                                                        <option value="DRIVER">Driver</option>
                                                        <option value="LORRY BUY & SELL DEALER/OWNER">Lorry Buy & Sell Dealer/Owner</option>
                                                    </select>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Operating City</label>
                                                    <input type="text" className="form-control" placeholder="Enter Operating City" value={operatingCity} onChange={(e) => setOperatingCity(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Confirm Password</label>
                                                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                                <div className="form-group form-check">
                                                    <input type="checkbox" className="form-check-input" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                                                    <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
                                                </div>
                                                <button type="button" className="btn btn-primary btn-block" onClick={register} aria-label="Register">Register</button>
                                            </div>

                                            {/* Step 2: Enter OTP */}
                                            <div id="step2" style={{ display: step === 2 ? 'block' : 'none' }}>
                                                <div className="form-group">
                                                    <label>Enter OTP</label>
                                                    <input type="text" className="form-control" placeholder="Enter OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
                                                </div>
                                                <button type="button" className="btn btn-primary btn-block" onClick={validateOTP} aria-label="Send OTP">Verify OTP</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    // }
}

export default Navbar;
