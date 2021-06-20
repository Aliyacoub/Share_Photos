import React from "react";

import { withRouter, Link } from "react-router-dom";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';

import { Container } from 'react-bootstrap';





class Header extends React.Component {

    constructor(props) {

        super(props);
        this.logout = this.logout.bind(this);
    }

    //تسجيل الخروج والعوده الى الصفحة الرئيسية
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');
    }



    render() {


        if (localStorage.getItem('token')) {

            return (

                <Navbar sticky="top" collapseOnSelect expand="md" bg="light" variant="light" className="p-4 mb-4">
                    <Container>
                        <Navbar.Brand > معرض الصور </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link as={Link} to="/"> الصفحة الرئيسية</Nav.Link>
                                <Nav.Link as={Link} to="/UserPage"> صفحة المستخدم </Nav.Link>
                                <Nav.Link as={Link} to="/post/create"> اضافة صورة </Nav.Link>
                                <Nav.Link href="#logout" onClick={this.logout}>تسجيل خروج</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            )
        }


        return (
            <Navbar sticky="top" collapseOnSelect expand="md" bg="light " variant="light" className="p-4">
                <Container>
                    <Navbar.Brand > معرض الصور </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"> الصفحة الرئيسية</Nav.Link>
                            <Nav.Link as={Link} to="/Login"> تسجيل الدخول </Nav.Link>
                            <Nav.Link as={Link} to="/Register">تسجيل حساب جديد </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}



export default withRouter(Header);