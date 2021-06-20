import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Container, Row, Col } from 'react-bootstrap';



class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: '',
            isLoading: true,

        };
    }

    componentDidMount() {

        this.fetchPosts();

    }

    fetchPosts() {
        axios.get('/api/posts')

            .then(res => {

                this.setState({
                    posts: res.data,
                    error: '',
                    isLoading: false
                });
            })

            .catch(err => {

                this.setState({
                    error: err?.response?.data?.message,
                    isLoading: false
                });
            })

    };

    render() {
        var i = 0;
        
        if (this.state.isLoading) {
            return (<h4 style={{ color: "green" }}>الرجاء الإنتظار</h4>);
        }
        if (this.state.error) {
            return (<blockquote style={{ color: "red" }}>{this.state.error}</blockquote>);
        }

        if (this.state.posts.length < 1) {
            return (<h4 style={{ color: "red" }}> لايوجد صور لك قم بإضافة بعض الصور </h4>);
        }
        return (
            <Container>
                <Row md={3} sm={2} xs={1} className="my-5">

                    {this.state.posts.map(post => {

                        if (post.author._id === localStorage.getItem('_id')) {

                            if (i === 2) {

                                return (
                                    i = 0,
                                    <Col key={post._id} className="mb-5">
                                        <Card className="text-right p-3">

                                            <Card.Img variant="top" src={`http://localhost:4000/${post.author._id}/${post.profileImg}`} className="imge-card" alt="ali" />

                                            <Card.Body>
                                                <Card.Title className="mb-4 mt-4">{post.title.substr(0, 30)}</Card.Title>
                                                <Card.Text>
                                                    {post.content.substr(0, 30)}
                                                    <span className="span-dot">...</span>
                                                </Card.Text>
                                            </Card.Body>

                                            <Link to={'/post/view/' + post._id}>
                                                <span className="custom-btn">
                                                    <button className="btn button-primary button-outline button-custom" >اقرأ المزيد</button>
                                                </span>
                                            </Link>
                                            <span className="custom-btn">
                                                <button className="btn button-primary button-outline button-custom" >الاعجاب {post.likes.length}</button>
                                            </span>

                                        </Card>
                                    </Col>
                                )
                            } else {
                                return (
                                    ++i,
                                    <Col key={post._id} className="mb-5">
                                        <Card className="text-right p-3">

                                            <Card.Img variant="top" src={`http://localhost:4000/${post.author._id}/${post.profileImg}`} alt="ali" />

                                            <Card.Body>
                                                <Card.Title className="mb-4 mt-4">{post.title.substr(0, 30)}</Card.Title>
                                                <Card.Text>
                                                    {post.content.substr(0, 30)}
                                                    <span className="span-dot">...</span>
                                                </Card.Text>
                                            </Card.Body>

                                            <Link to={'/post/view/' + post._id}>
                                                <span className="custom-btn">
                                                    <button className="btn button-primary button-outline button-custom" >اقرأ المزيد</button>
                                                </span>
                                            </Link>
                                            <span className="custom-btn">
                                                <button className="btn button-primary button-outline button-custom" >الاعجاب {post.likes.length}</button>
                                            </span>

                                        </Card>
                                    </Col>
                                )
                            }


                        }
                           
                        

                    })}

                </Row>
            </Container>
        )
    }
}

export default Home;