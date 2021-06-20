
import React from 'react';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Container, Row, Col, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';





class ViewPost extends React.Component {

    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.state = {
            post: {},
            commentError: '',
            error: ''
        };
    }

    //حذف الصوره
    deletePost() {
        axios.delete("/api/posts/" + this.state.post._id)
            .then(res => {
                this.props.history.push('/');
            })
    }

    componentDidMount() {
        let postId = this.props.match.params.id
        axios.get('/api/posts/' + postId)
            .then(res => {
                this.setState({
                    post: res.data,
                    error: ''
                });
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            });
    }


    //تعديل ع عنوان والمحتوى الصورة
    renderActions() {
        if (localStorage.getItem('token') && localStorage.getItem('_id') === this.state.post.author._id) {
            return (
                <span>
                    <Link to={"/post/edit/" + this.state.post._id}>

                        <Button variant="primary" type="submit" className="m-3 p-3 " >
                            تعديل
                        </Button>
                    </Link>
                    <Button variant="primary" type="submit" className="m-3 p-3" onClick={this.deletePost}>
                        حذف
                    </Button>

                </span>
            );
        }
    }


    render() {
        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>);
        }
        if (!this.state.post.title) {
            return (<h4 style={{ color: "green" }}> الرجاء الإنتظار </h4>);
        }
        return (
            <Container >
                <Row lg={2} className="my-5 post">

                    <Col key={this.state.post._id} className="mb-5">

                        <Card className="text-right p-3"  >
                            <Card.Img variant="top" src={`http://localhost:4000/${this.state.post.author._id}/${this.state.post.profileImg}`} alt="ali" className="img-view" />
                            <Card.Body>
                                <Card.Title className="mb-4 mt-4">{this.state.post.title}</Card.Title>
                                <Card.Text> {this.state.post.content}</Card.Text>
                            </Card.Body>

                        </Card>
                        {this.renderActions()}
                    </Col>

                </Row>
            </Container>

        );
    }

}

export default ViewPost

