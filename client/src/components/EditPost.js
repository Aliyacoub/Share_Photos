import React from 'react';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import { Form, Button, Container, Row } from 'react-bootstrap';



class EditPost extends React.Component {

    constructor(props) {

        super(props);

        if (!localStorage.getItem('token')) {
            this.props.history.push('/Login');
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderError = this.renderError.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
       

        this.state = {

            title: '',
            content: '',
            authorId: '',
            isLoading: true,
            error: ''

        };
    }



    onChangeTitle(e) {

        this.setState({

            title: e.target.value,
            error: ''
        });
    }

    onChangeContent(e) {

        this.setState({

            content: e.target.value,
            error: ''
        });
    }


    onSubmit(e) {

        e.preventDefault();

        let data = {

            title: this.state.title,

            content: this.state.content

        };

        axios.put('/api/posts/' + this.props.match.params.id, data)

            .then(res => {
            
                this.props.history.push('/');
            })

            .catch(err => {

                this.setState({
                    error: err.response.data.message
                });
            })
    }

    
    componentDidMount() {
        axios.get('/api/posts/' + this.props.match.params.id)

            .then(res => {

                this.setState({

                    title: res.data.title,
                    content: res.data.content,
                    authorId: res.data.author._id,
                    isLoading: false
                })
            })
    }

    renderError() {

        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";

    }

    render() {

        if (this.state.isLoading) {
            return (<h4>الرجاء الانتضار</h4>)
        }

        if (localStorage.getItem('_id') !== this.state.authorId) {
            return (<blockquote>خطا 404</blockquote>);
        }
        return (

            <Container className="text-center">
                <Row>

                    <h5 className="mt-5 custom-text">تعديل العنوان والمحتوى</h5>

                    {this.renderError()}
                </Row>
                <Row>
                    <Form onSubmit={this.onSubmit} >

                        <Form.Group className="mb-5 mt-5" controlId="validationCustom01">
                            <Form.Label> تعديل العنوان</Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label> تعديل المحتوى</Form.Label>
                            <Form.Control as="textarea" value={this.state.content} onChange={this.onChangeContent} />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            تعديل
                        </Button>

                    </Form>

                </Row>
            </Container>
        );
    }
}


export default EditPost;