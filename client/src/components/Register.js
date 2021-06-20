import React from 'react';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import { Form, Button, Container, Row } from 'react-bootstrap';




class Register extends React.Component {

    constructor(props) {

        super(props);

        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }


        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderError = this.renderError.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);


        this.state = {

            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: ''

        };
    }
//تغيير الاسم
    onChangeName(e) {

        this.setState({

            name: e.target.value,
            error: ''
        });

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
//تغيير تاكيد كلمة السر
    onChangeConfirmPassword(e) {

        this.setState({

            confirmPassword: e.target.value,
            error: ''
        });
    }


    onSubmit(e) {

        e.preventDefault();

        let data = {
            name: this.state.name,

            email: this.state.email,

            password: this.state.password,

            confirmPassword: this.state.confirmPassword
        };

        axios.post('/api/register', data)

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
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";

    }

    render() {
        return (
            <Container className="text-center">
                <Row>

                    <h5 className="mt-5 custom-text">انشاء حساب جديد</h5>

                    {this.renderError()}
                </Row>
                <Row>
                    <Form onSubmit={this.onSubmit}>

                        <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                            <Form.Label> الاسم </Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} placeholder="الإسم" required />
                        </Form.Group>

                        <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                            <Form.Label>  البريد الالكتروني </Form.Label>
                            <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="البريد الالكتروني" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>كلمة المرور</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder=" ادخل كلمة المرور " required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label> تاكيد كلمة المرور</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} placeholder=" تأكيد كلمة المرور " required />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            التسجيل
                        </Button>

                    </Form>

                </Row>
            </Container>
        );
    }
}


export default Register;