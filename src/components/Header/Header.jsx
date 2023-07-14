import React from "react";
import "../Header/style.css";
import "../Header/responsive.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

export const Header = () => {
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    navigate(eventKey);
  };

  const handleDropdownSelect = (eventKey) => {
    if (eventKey == "/logout") logout();
    else navigate(eventKey);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        className="navBackground"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src="/images/logo.svg" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav activeKey="1" className="me-auto" onSelect={handleSelect}>
              <Nav.Link
                eventKey="/"
                className={pathname === "/" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                eventKey="/upcoming-auctions"
                className={pathname === "/upcoming-auctions" ? "active" : ""}
              >
                Upcoming Auctions
              </Nav.Link>
              {/* <Nav.Link className={pathname === '/live-auction' ? 'active' : ''} onClick={handleLinkClick}>
                <Link className='navLink'  to='/live-auction'>Live Auction</Link>
              </Nav.Link> */}
              {loggedIn && (
                <Nav.Link
                  eventKey="/my-auctions"
                  className={pathname === "/my-auctions" ? "active" : ""}
                >
                  My Auctions
                </Nav.Link>
              )}
              <Nav.Link
                eventKey="/private-treaty"
                className={pathname === "/private-treaty" ? "active" : ""}
              >
                Private Treaty
              </Nav.Link>
              <Nav.Link
                eventKey="/contact-us"
                className={pathname === "/contact-us" ? "active" : ""}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                eventKey="/work-with-us"
                className={pathname === "/work-with-us" ? "active" : ""}
              >
                Work With Us
              </Nav.Link>
              <Nav.Link
                eventKey="/about-us"
                className={pathname === "/about-us" ? "active" : ""}
              >
                About Us
              </Nav.Link>
              {/* <Nav.Link href="https://hecta.co/contact-us/" target="_blank" onClick={handleLinkClick}>Contact Us</Nav.Link>
              <Nav.Link href="https://hecta.co/about-us/" target="_blank" onClick={handleLinkClick}>About Us</Nav.Link> */}
            </Nav>

            <Nav activeKey="2" onSelect={handleDropdownSelect}>
              {loggedIn ? (
                <>
                  <Nav.Link
                    eventKey="/my-account"
                    className={pathname === "/my-account" ? "active" : ""}
                  >
                    My Account
                  </Nav.Link>
                  <Nav.Link
                    eventKey="/logout"
                    className={pathname === "/logout" ? "active" : ""}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  eventKey="/login"
                  id="loginButton"
                  className={pathname === "/login" ? "" : ""}
                >
                  Login
                </Nav.Link>
              )}
              {/* {loggedIn ? (
                <NavDropdown
                  active={pathname === "/my-account" ? "active" : ""}
                  title="My Account"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item eventKey="/my-account">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item eventKey="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  eventKey="/login"
                  id="loginButton"
                  className={pathname === "/login" ? "" : ""}
                >
                  Login
                </Nav.Link>
                
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
