/**
 * Authentication Page @ Sk Khaja Moulali
 */
import React from 'react';
import LoginForm from '../components/Login';

const AuthPage = () => (
    <div className="row justify-content-between">
        <div style={{ border: '1px solid #ababab' }}></div>
        <div className="col-md-5">
            <LoginForm />
        </div>
        <div style={{ border: '1px solid #ababab' }}></div>
    </div>
);

export default AuthPage;
