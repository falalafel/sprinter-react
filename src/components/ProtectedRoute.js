import React from "react";
import {Route, Redirect} from "react-router-dom";
import Cookies from "js-cookie";

const check_cookie = () => {
    //Cookies.get('sprinter-client'); // sometimes not working :C
    const user = localStorage.getItem('user');
    return user !== null;
}

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => (
                    check_cookie()
                        ? <Component {...props} />
                        : <Redirect to={{pathname: "/sign-in", state: {from: props.location}}}/>
                )
            }
        />
    );
};

export default (ProtectedRoute);
