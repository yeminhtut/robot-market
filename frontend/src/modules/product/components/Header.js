import React from "react";
import {
    Navbar,
    NavbarBrand
} from "reactstrap";
const Header = () => {
    return (
        <div>
            <Navbar color="dark" expand="md" dark>
                <NavbarBrand href="/">Robot Market</NavbarBrand>
            </Navbar>
        </div>
    );
};

export default Header;
