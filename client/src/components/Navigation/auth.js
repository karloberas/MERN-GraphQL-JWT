import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { withRouter, Link} from 'react-router-dom';
import * as actions from '../../constants/action_types';
import * as routes from '../../constants/routes';

function AuthNavigation(props) {
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch({ type: actions.SET_AUTH_USER, authUser: null });
        localStorage.removeItem("token");
    }

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to={routes.HOME}>HOME</Link>
            </div>
            <div className="navbar-right" style={{ justifyContent: "flex-end" }}>
                <Link to={routes.HOME} onClick={logout}>LOGOUT</Link>
            </div>
        </div>
    );
}

export default withRouter(AuthNavigation);