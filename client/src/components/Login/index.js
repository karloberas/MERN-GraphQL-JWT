import React from 'react';

function Login() {
    return (
        <>
            <h1>Login</h1>
            <div className="auth-form">
                <form>
                    <input className="form-input" type="email" placeholder="Email" />
                    <input className="form-input" type="passwprd" placeholder="Password" />
                    <input className="form-submit" type="submit" value="Login" />
                </form>
            </div>
        </>
    );
}

export default Login;