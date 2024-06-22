import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [termsChecked, setTermsChecked] = useState(false);

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

            axios.post('https://truck.truckmessage.com/registration', registrationData)
                .then(response => {
                    toast.success('Registration successful!');
                })
                .catch(error => {
                    toast.error('Registration failed. Please try again.');
                });
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        // India phone number regex validation
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 py-3">
                        <div className="card mx-auto p-5" style={{ maxWidth: '520px' }}>
                            <div className="card-body">
                                <h4 className="card-title mb-4">Registration</h4>
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
            </div>
        </section>
    );
};

export default RegistrationForm;


// import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// const RegistrationForm = () => {
//     const [step, setStep] = useState(1);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otpInput, setOtpInput] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [selectedCities, setSelectedCities] = useState([]);
//     const [country, setCountry] = useState('India');
//     const [termsChecked, setTermsChecked] = useState(false);

//     const nextStep = () => {
//         if (step === 1) {
//             if (firstName === '' || lastName === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
//                 toast.error('Please fill in all fields.');
//             } else if (password !== confirmPassword) {
//                 toast.error('Passwords do not match.');
//             } else if (!validatePhoneNumber(phoneNumber)) {
//                 toast.error('Invalid phone number format.');
//             } else {
//                 // Replace this with your actual code to send OTP via SMS or any other method
//                 toast.success(`OTP sent successfully to ${phoneNumber}`);
//                 setStep(2);
//             }
//         }
//     };

//     const sendOTP = () => {
//         if (otpInput === '') {
//             toast.error('Please enter OTP.');
//         } else {
//             // Replace this with your actual code to verify OTP
//             toast.success('OTP verified successfully.');
//             setStep(3);
//         }
//     };

//     const handleCityChange = (event) => {
//         const { value } = event.target;
//         if (selectedCities.includes(value)) {
//             setSelectedCities(selectedCities.filter(city => city !== value));
//         } else {
//             setSelectedCities([...selectedCities, value]);
//         }
//     };

//     const register = () => {
//         if (!termsChecked) {
//             toast.error('Please agree to the terms and conditions.');
//         } else {
//             // Replace this with your actual registration logic
//             toast.success('Registration successful!');
//         }
//     };

//     const validatePhoneNumber = (phoneNumber) => {
//         // India phone number regex validation
//         const regex = /^\d{10}$/;
//         return regex.test(phoneNumber);
//     };

//     return (
//         <section>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="card mx-auto" style={{ maxWidth: '520px' }}>
//                             <div className="card-body">
//                                 <h4 className="card-title mb-4">Registration</h4>
//                                 <div id="step1" style={{ display: step === 1 ? 'block' : 'none' }}>
//                                     <div className="form-group">
//                                         <label>First name</label>
//                                         <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Last name</label>
//                                         <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Phone Number</label>
//                                         <input type="text" className="form-control" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Password</label>
//                                         <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Confirm Password</label>
//                                         <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                                     </div>
//                                     <button type="button" className="btn btn-primary btn-block" onClick={nextStep} aria-label="Next">Next</button>
//                                 </div>

//                                 {/* Step 2: Enter OTP */}
//                                 <div id="step2" style={{ display: step === 2 ? 'block' : 'none' }}>
//                                     <div className="form-group">
//                                         <label>Enter OTP</label>
//                                         <input type="text" className="form-control" placeholder="Enter OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
//                                     </div>
//                                     <button type="button" className="btn btn-primary btn-block" onClick={sendOTP} aria-label="Send OTP">Verify OTP</button>
//                                 </div>

//                                 {/* Step 3: Select City */}
//                                 <div id="step3" style={{ display: step === 3 ? 'block' : 'none' }}>
//                                     <div className="form-group">
//                                         <label>Select Cities</label>
//                                         <div>
//                                             <label>
//                                                 <input type="checkbox" value="New York" checked={selectedCities.includes("New York")} onChange={handleCityChange} />
//                                                 New York
//                                             </label>
//                                         </div>
//                                         <div>
//                                             <label>
//                                                 <input type="checkbox" value="Los Angeles" checked={selectedCities.includes("Los Angeles")} onChange={handleCityChange} />
//                                                 Los Angeles
//                                             </label>
//                                         </div>
//                                         <div>
//                                             <label>
//                                                 <input type="checkbox" value="Chicago" checked={selectedCities.includes("Chicago")} onChange={handleCityChange} />
//                                                 Chicago
//                                             </label>
//                                         </div>
//                                         {/* Add more cities as needed */}
//                                     </div>
//                                     <div className="form-group form-check">
//                                         <input type="checkbox" className="form-check-input" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
//                                         <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
//                                     </div>
//                                     <button type="button" className="btn btn-primary btn-block" onClick={register} aria-label="Register">Register</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default RegistrationForm;
