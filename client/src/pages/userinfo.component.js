/**
 * Useer Info Page @ Sk Khaja Moulali
 */
import React from 'react';

const UserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
    return (
        <React.Fragment>
            <div>
                <div className="col-10">
                    <h2>Hi {userInfo.fullName}, you are successfully Logged In... </h2>
                </div><br />
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{userInfo.userId}</th>
                            <td>{userInfo.fullName}</td>
                            <td>{userInfo.email}</td>
                            <td>{userInfo.isLoggedIn ? "Authorized User" : "Un-Authorized User"}</td>
                        </tr>
                    </tbody>
                </table>
                {/* <h4>User Id : {userInfo.userId}</h4>
                <h4>Full Name : {userInfo.fullName}</h4>
                <h4>E-mail Id : {userInfo.email}</h4>
                <h4>User Type : {userInfo.isLoggedIn ? "Authorized User" : "Un-Authorized User"}</h4> */}
            </div>
        </React.Fragment>
    );
};


export default UserInfo;
