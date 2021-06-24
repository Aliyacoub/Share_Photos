import React from 'react';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import Resizer  from "react-image-file-resizer";

import { Form, Button, Container, Row } from 'react-bootstrap';

import FormData from "form-data";

const createError = require('http-errors');




class CreatePost extends React.Component {

    constructor(props) {

        super(props);
        if (!localStorage.getItem('token')) {
            this.props.history.push('/Login');
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.renderError = this.renderError.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);


        this.state = {

            title: '',
            content: '',
            isLoading: true,
            likes: 0,
            error: '',
            profileImg: '',
            selectedFile: null,

        };
    }


    onChangeContent(e) {

        this.setState({

            content: e.target.value,
            error: ''
        });
    }


    onChangeTitle(e) {

        this.setState({

            title: e.target.value,
            error: ''
        });
    }

   
    

    onChangePhoto = async (e)=> {
       
       const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 600, 600, 'png', 70, 0,
            uri => {
              resolve(uri);
            },
            'file',
            
            );
        });
        try {
            this.setState({profileImgPath: e.target.value});
            const file = e.target.files[0];
            const image = await resizeFile(file)
            console.log(image)
            this.setState({selectedFile: image})
       
        } catch(err) {
            console.log(err);
        }
          
    };


    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }


    onSubmit(e) {

        e.preventDefault();
        var formData = new FormData();
        console.log(e);
        formData.append('profileImg', this.state.selectedFile);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content)
        formData.append('count', this.state.count || 0)

        axios({
            method: "post",
            url: "/api/posts",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => {
                this.props.history.push('/');


            })

            .catch(err => {
                if (err.title === ' ' && err.content === ' ' && err.profileImg === ' ') throw createError(404);
                this.setState({
                    error: err.response.data.message,
                });
            })

    }


    render() {

        if (!this.state.isLoading) {

            return (<h4 style={{ color: "green" }}>الرجاء الإنتظار</h4>);

        }
        return (

            <Container className="text-center">
                <Row>

                    <h5 className="mt-5 custom-text"> انشاء صورة جديدة</h5>

                    {this.renderError()}
                </Row>
                <Row>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data" method="POST" action="/upload">

                        <Form.Group className="mb-5 mt-5" >
                            <Form.Label> أضف العنوان  </Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} placeholder="اضف عنوان للصورة " required />
                        </Form.Group>

                        <Form.Group className="mb-5 mt-5" >
                            <Form.Label>  أضف صورة </Form.Label>
                            <Form.Control type="file" id="image" name="image" placeholder="اضف صوره" value={this.state.profileImgPath || ''} onChange={this.onChangePhoto} required />
                        </Form.Group>

                        <Form.Group className="mb-3 mt-5" >
                            <Form.Label> أضف الوصف</Form.Label>
                            <Form.Control as="textarea" value={this.state.content} onChange={this.onChangeContent} placeholder="اضف وصف للصورة " required />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            إضافة
                        </Button>

                    </Form>

                </Row>
            </Container>
        );
    }
}


export default CreatePost;