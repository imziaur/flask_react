import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        var { email, pass } = document.forms[0];
        // Find user login info
        axios.post('http://localhost:5000/user', {
            email: email.value,
            password: pass.value
          })
          .then(function (response) {
            const data = response.data
            if (data.status){
                setIsSubmitted(true);
            } else{
                setErrorMessages({ name: "pass", message: data.message });  
            }
          })
    };

    // JSX
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="email" required />
                </div>
                {renderErrorMessage("email")}
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                {renderErrorMessage("pass")}
                <div className="button-container">
                    <input type="submit" value="Sign In" />
                </div>

            </form>
            <Link to="/register" variant="body2">
                Not have an account ? Sign up here
            </Link>
        </div>
    )

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    )
}

export default Login;