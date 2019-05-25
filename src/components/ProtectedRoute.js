import React from "react";
import {Route, Redirect} from "react-router-dom";
import authentication from "../authentication";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => (
                    authentication.isAuthenticated()
                        ? <Component {...props} />
                        : <Redirect to={{pathname: "/sign-in", state: {from: props.location}}}/>
                )
            }
        />
    );
};

export default (ProtectedRoute);
