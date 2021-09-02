import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <Button variant="warning" onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>Log out <FiLogOut/> </Button>
  );
}

export default LogoutButton;