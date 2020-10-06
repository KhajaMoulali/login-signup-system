/**
 * Registration Page @ Sk Khaja Moulali
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { registerUser } from '../redux/actions/authActionCreators';
import allCountries from '../../node_modules/country-json/src/country-by-name.json';

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState({ firstName: false, lastName: false, userName: false, email: false, password: false, gender: false, country: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else dispatchRegisterAction(firstName, lastName, userName, email, password, gender, country,
            () => toast.success('Account Created Successfully!'),
            (message) => toast.error(`Error: ${message}`));
    };

    const handleCancelForm = (event) => {
        event.preventDefault();
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setError({ firstName: false, lastName: false, email: false, password: false });
    };

    const isFormInvalid = () => (!firstName || !lastName || !email || !password);

    const updateErrorFlags = () => {
        const errObj = { firstName: false, lastName: false, email: false, password: false };
        if (!firstName) errObj.firstName = true;
        if (!lastName) errObj.lastName = true;
        if (!email) errObj.email = true;
        if (!password) errObj.password = true;
        setError(errObj);
    };

    const allCountriesList = allCountries.map(country => (<option value={country.country}>{country.country}</option>))
    

    return (
        <div className="row justify-content-between">
            <div style={{ border: '1px solid #ababab' }}></div>
            <div className="col-md-5">
                <h2>New User ?</h2>
                <h4>Create an account</h4>
                <br />

                <form noValidate onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input noValidate id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`form-control ${error.firstName ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input noValidate id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`form-control ${error.lastName ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input noValidate id="userName"
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={`form-control ${error.userName ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email1">Email Address</label>
                        <input noValidate id="email1"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`form-control ${error.email ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input noValidate id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label><br />
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input noValidate id="gender"
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value="male"
                                    onChange={(e) => setGender(e.target.value)} />Male
                                   <p className="invalid-feedback">Required</p>
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input noValidate id="gender"
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value="female"
                                    onChange={(e) => setGender(e.target.value)} />Female
                                   <p className="invalid-feedback">Required</p>
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input noValidate id="gender"
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value="others"
                                    onChange={(e) => setGender(e.target.value)} />Others
                                   <p className="invalid-feedback">Required</p>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                            <select 
                                noValidate 
                                id="country" 
                                name="country" 
                                value={country} 
                                onChange={ (e) => setCountry(e.target.value) } 
                                className={`form-control ${error.country ? 'is-invalid' : ''}`}>
                                <option>Select Your Country</option>
                                { allCountriesList }
                            </select>

                        <p className="invalid-feedback">Required</p>
                    </div>

                    <button type="submit" className="btn btn-primary mr-2">
                        Register | <i className="fas fa-user-plus"></i>
                    </button>
                    <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                        Cancel | <i className="fas fa-times"></i>
                    </button><br />
                    <h6>Already have an Account <Link to="/auth">Login here...</Link></h6>
                </form>
            </div>
            <div style={{ border: '1px solid #ababab' }}></div>


        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (firstName, lastName, userName, email, password, gender, country, onSuccess, onError) =>
        dispatch(registerUser({ firstName, lastName, userName, email, password, gender, country }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(RegisterForm);
