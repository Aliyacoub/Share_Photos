import React from 'react';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import { Form, Button, Container, Row } from 'react-bootstrap';




class Login extends React.Component {

    constructor(props) {

        super(props);
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderError = this.renderError.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);



        this.state = {
            email: '',
            password: '',
            error: '',


        };
    }


//تغيير الايميل
    onChangeEmail(e) {

        this.setState({

            email: e.target.value,
            error: ''
        });
    }

//تغيير كلمة السر
    onChangePassword(e) {

        this.setState({

            password: e.target.value,
            error: ''
        });
    }


    onSubmit(e) {

        e.preventDefault();

        let data = {

            email: this.state.email,

            password: this.state.password

        };

        axios.post('/api/auth', data)

            .then(res => {

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token };
                this.props.history.push('/');
            })

            .catch(err => {

                this.setState({
                    error: err.response.data.message
                });
            })
    }


    renderError() {
        return this.state.error ? (<blockquote >{this.state.error}</blockquote>) : "";

    }

    render() {
        return (
            <Container className="text-center">
                <Row>

                    <h5 className="mt-5 custom-text">تسجيل الدخول</h5>

                    {this.renderError()}
                </Row>
                <Row>
                    <Form onSubmit={this.onSubmit} >

                        <Form.Group className="mb-5 mt-5" controlId="validationCustom01">
                            <Form.Label>البريد الالكتروني</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="ادخل البريد الإلكتروني" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>كلمة المرور</Form.Label>
                            <Form.Control type="password" name='password' value={this.state.password} onChange={this.onChangePassword} placeholder=" ادخل كلمة المرور" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            تسجيل الدخول
                        </Button>

                    </Form>

                </Row>
            </Container>
        );
    }
}


export default Login;