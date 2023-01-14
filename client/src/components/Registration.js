import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
function Registration() {
    const [errorMessages, setErrorMessages] = useState({});
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        var { email, pass, repass } = document.forms[0];
        const userData = { 'email': email.value, 'password': pass.value }
        if (pass.value !== repass.value) {
            setErrorMessages({ name: "repass", message: "Password Mismatch" });
        } else {
            axios.post('http://localhost:5000/add_user', userData)
          .then(function (response) {
            const data = response.data
            alert(data.message)
            document.getElementById("add-user").reset();
          })
        }
    }
    const renderErrorMessage = (name) => {
        if (name === errorMessages.name) {
            return (
                <div className="error">{errorMessages.message}</div>
            )
        }
    }

    const renderForm = (
        <div className="form">
            {renderErrorMessage("repass")}
            <form id="add-user" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="email" required />
                </div>

                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="input-container">
                    <label>Re-type Password </label>
                    <input type="password" name="repass" required />
                </div>
                <div className="button-container">
                    <input type="submit" value="Sign Up" />
                </div>

            </form>
            <Link to="/">
                Already have an account ? Sign in here
            </Link>
        </div>
    )
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Registration</div>
                {renderForm}
            </div>
        </div>
    )
}

export default Registration;