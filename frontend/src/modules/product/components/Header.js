import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
const Header = () => {
    return (
        <Navbar color="dark" expand="md" dark>
            <NavbarBrand href="/">Robot Market</NavbarBrand>
        </Navbar>
    );
};

export default Header;
