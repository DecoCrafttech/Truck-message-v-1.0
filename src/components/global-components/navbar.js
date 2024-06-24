import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Services/axiosInstance';
import { updateIsLoggedIn, updateUserDetails } from '../../Storage/Slices/LoginSlice';
import Cookie from 'js-cookie';

const Navbar = () => {
    const Login = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const pageRender = useNavigate();


    const publicUrl = process.env.PUBLIC_URL + '/';

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);

    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [otpInput, setOtpInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);

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
                    console.log(date)
                    //updating username in cookies
                    Cookie.set("usrin", userId, {
                        expires: date, // 1 day
                        secure: true,
                        sameSite: 'strict',
                        path: '/'
                    })

                    dispatch(updateUserDetails(loginData));
                    dispatch(updateIsLoggedIn(true));
                    document.getElementById("closeSignInModel").click();
                } else {
                    toast.error("Login failed")
                }
            } catch (err) {
                console.log(err)
            }
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (firstName === '' || lastName === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
                toast.error('Please fill in all fields.');
            } else if (password !== confirmPassword) {
                toast.error('Passwords do not match.');
            } else if (!validatePhoneNumber(phoneNumber)) {
                toast.error('Invalid phone number format.');
            } else {
                // Replace this with your actual code to send OTP via SMS or any other method
                toast.success(`OTP sent successfully to ${phoneNumber}`);
                setStep(2);
            }
        }
    };

    const sendOTP = () => {
        if (otpInput === '') {
            toast.error('Please enter OTP.');
        } else {
            // Replace this with your actual code to verify OTP
            toast.success('OTP verified successfully.');
            setStep(3);
        }
    };

    const handleCityChange = (event) => {
        const { value } = event.target;
        if (selectedCities.includes(value)) {
            setSelectedCities(selectedCities.filter(city => city !== value));
        } else {
            setSelectedCities([...selectedCities, value]);
        }
    };

    const register = () => {
        if (!termsChecked) {
            toast.error('Please agree to the terms and conditions.');
        } else {
            const registrationData = {
                first_name: firstName,
                phone_number: phoneNumber,
                password: password
            };

            const res = axiosInstance.post('/registration', registrationData)
            console.log(res)
            // .then(response => {
            //     toast.success('Registration successful!');
            // })
            // .catch(error => {
            //     toast.error('Registration failed. Please try again.');
            // });
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        // India phone number regex validation
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };



    return (
        <>
            <div>
                <header className="ltn__header-5 ltn__header-transparent--- gradient-color-4---">
                    <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="ltn__top-bar-menu text-start">
                                        <ul>
                                            <li>
                                                <a href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
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
                                            <Link to="/"><img src={publicUrl + "assets/img/logo.png"} alt="Logo" /></Link>
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
                                                            <li className='m-0'  onClick={()=>pageRender("my_profile")}><button class="dropdown-item" type="button">My account</button></li>
                                                            <li className='m-0'><button class="dropdown-item" type="button">My post</button></li>
                                                            <li className='m-0'><button class="dropdown-item" type="button">Enquiry</button></li>
                                                            <li className='m-0'><button class="dropdown-item" type="button">Log out</button></li>
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
                                                            <Link data-bs-toggle="modal" data-bs-target="#registerModal" title="Sign Up" >
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
                                                    <li className='mt-0'><Link to="/about" class="dropdown-item">About</Link></li>
                                                    <li className='mt-0'><Link to="/blog" class="dropdown-item">Blog</Link></li>
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
                        <div class="modal-header border-0">
                            <h1 class="modal-title fs-5 " id="staticBackdropLabel">Login</h1>
                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close" id="closeSignInModel"></button>
                        </div>
                        <div class="modal-body">
                            <section>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card mx-auto p-5 pt-3 border-0" style={{ maxWidth: '520px' }}>
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
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h1 class="modal-title fs-5 " id="staticBackdropLabel">Registration</h1>
                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <section>

                                <div className="row">
                                    <div className="col-lg-12 py-1">
                                        <div className="card mx-auto p-3 pt-1 border-0" style={{ maxWidth: '520px' }}>
                                            <div className="card-body">
                                                <div id="step1" style={{ display: step === 1 ? 'block' : 'none' }}>
                                                    <div className="form-group">
                                                        <label>First name</label>
                                                        <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Last name</label>
                                                        <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Phone Number</label>
                                                        <input type="text" className="form-control" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    </div>
                                                    <button type="button" className="btn btn-primary btn-block" onClick={nextStep} aria-label="Next">Next</button>
                                                </div>

                                                {/* Step 2: Enter OTP */}
                                                <div id="step2" style={{ display: step === 2 ? 'block' : 'none' }}>
                                                    <div className="form-group">
                                                        <label>Enter OTP</label>
                                                        <input type="text" className="form-control" placeholder="Enter OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
                                                    </div>
                                                    <button type="button" className="btn btn-primary btn-block" onClick={sendOTP} aria-label="Send OTP">Verify OTP</button>
                                                </div>

                                                {/* Step 3: Select City */}
                                                <div id="step3" style={{ display: step === 3 ? 'block' : 'none' }}>
                                                    <div className="form-group">
                                                        <label>Select Cities</label>
                                                        <div>
                                                            <label>
                                                                <input type="checkbox" value="New York" checked={selectedCities.includes("New York")} onChange={handleCityChange} />
                                                                New York
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <input type="checkbox" value="Los Angeles" checked={selectedCities.includes("Los Angeles")} onChange={handleCityChange} />
                                                                Los Angeles
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <input type="checkbox" value="Chicago" checked={selectedCities.includes("Chicago")} onChange={handleCityChange} />
                                                                Chicago
                                                            </label>
                                                        </div>
                                                        {/* Add more cities as needed */}
                                                    </div>
                                                    <div className="form-group form-check">
                                                        <input type="checkbox" className="form-check-input" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                                                        <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
                                                    </div>
                                                    <button type="button" className="btn btn-primary btn-block" onClick={register} aria-label="Register">Register</button>
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
        </>
    );
    // }
}

export default Navbar;
