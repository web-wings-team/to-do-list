import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { FiLogIn } from "react-icons/fi";

function LoginButton() {
    const {
        isAuthenticated, loginWithRedirect, } = useAuth0();

    return !isAuthenticated && (

        <Button style={{fontWeight:"bold" ,width:"40%",padding:"3%"}} variant="warning" onClick={loginWithRedirect}> <FiLogIn/> GET START </Button>
    );
}

export default LoginButton;