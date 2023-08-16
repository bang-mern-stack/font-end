import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header(props) {
    async function logout() {
        props.setUser(null);
    }
    return (
        <>
            <Navbar
                expand="lg"
                className="bg-body-tertiary"
                style={{ paddingLeft: "30px" }}
            >
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">
                            <Link to={"/"}>Movies</Link>
                        </Nav.Link>
                        <Nav.Link>
                            {props.user ? (
                                <div onClick={logout}>Logout {props.user}</div>
                            ) : (
                                <Link to={"/login"}>Login</Link>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
