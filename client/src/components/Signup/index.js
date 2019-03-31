import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';
import * as actions from '../../constants/action_types';
import * as routes from '../../constants/routes';

function Signup(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleChange = setter => e =>  {
        setter(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                query: `mutation {
                    createUser(userInput: {
                        email: "${email}",
                        password: "${password}",
                        confirm: "${confirm}"
                    }) {
                        _id,
                        token,
                        email
                    }
                }`
            };

            const { data } = await axios.post('http://localhost:3001/graphql', requestBody);

            if (data.errors) {
                console.log(data.errors[0].message);
            }
            else {
                const { _id, token } = await data.data.createUser;

                // dispatch value and set new value for the authUser
                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email
                    }
                });

                // store token into our localStorage
                localStorage.setItem('token', token);

                // redirect url to homepage
                props.history.push(routes.HOME);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <div className="auth-form">
                <form onSubmit={submit}>
                    <input className="form-input" type="email" placeholder="Email" value={email} onChange={handleChange(setEmail)} />
                    <input className="form-input" type="password" placeholder="Password" value={password} onChange={handleChange(setPassword)} />
                    <input className="form-input" type="password" placeholder="Confirm Password" value={confirm} onChange={handleChange(setConfirm)} />
                    <input className="form-submit" type="submit" value="Register" />
                </form>
            </div>
        </>
    );
}

export default withRouter(Signup);