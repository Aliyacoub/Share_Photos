import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Container, Row, Col } from 'react-bootstrap';

import FormData from "form-data";





class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: '',
            isLoading: true,
            likes: 0
        };
    }

    componentDidMount() {

        this.fetchPosts();

    }

    addLike = (postId) => {
        var formData = new FormData();
        const userId = this.getUserId();
        formData.append('postId', postId);
        formData.append('userId', userId);

        axios({
            method: "post",
            url: "/api/likes",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
    }

    removeLike = (postId) => {
        var formData = new FormData();
        const userId = this.getUserId();
        formData.append('postId', postId);
        formData.append('userId', userId);
       
        axios({
            method: "post",
            url: "/api/likes/remove",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
    }
    handleLikeClick = (postId) => {
        const userId = this.getUserId();
        const likedPost = this.state.posts.find(post => post._id === postId);
        const filteredPosts = this.state.posts.filter(post => post._id !== postId);

        const isLiked = likedPost.likes.some(like => like === userId);
        if (isLiked) {
            this.removeLike(postId);
            likedPost.likes.pop(userId);
        }
        else {
            this.addLike(postId);
            likedPost.likes.push(userId);
        }

        this.setState({ posts: [...filteredPosts, likedPost] })

    }
    handleUnLikeClick = () => {
        return (alert('مرحبا بك\n الرجاء تسجيل الدخول او انشاء حساب'))

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

    }

    getUserId() {
        return localStorage.getItem('_id');
    }


    render() {
        var i = 0;
        if (this.state.isLoading) {
            return (<h4 style={{ color: "green" }}>الرجاء الإنتظار</h4>);
        }
        if (this.state.error) {
            return (<blockquote style={{ color: "red" }}>{this.state.error}</blockquote>);
        }
        if (this.state.posts.length < 1) {
            return (<h4 style={{ color: "red" }}>  لايوجد صور في المعرض</h4>);
        }
        return (

            <Container >
                <Row md={3} sm={2} xs={1} className="my-5 post">

                    {this.state.posts.sort((a, b) => a._id.localeCompare(b._id)).map(post => {

                        if (i === 2) {

                            return (
                                i = 0,
                                <Col key={post._id} className="mb-5">
                                    <Card className="text-right p-3"  >
                                        <Card.Img variant="top" src={`http://localhost:4000/${post.author._id}/${post.profileImg}`} alt="ali" className="imge-card" style={{ zIndex: 1 }} />
                                        <Card.Body>
                                            <Card.Title className="mb-4 mt-4" >
                                                {post.title.substr(0, 30)}
                                            </Card.Title>
                                            <Card.Text className="card-text">
                                                {post.content.substr(0, 30)}
                                                <span className="span-dot">...</span>
                                            </Card.Text>
                                        </Card.Body>
                                        <Link to={'/post/view/' + post._id}>
                                            <span className="custom-btn">
                                                <button className="btn button-primary button-custom button-outline" >اقرأ المزيد</button>
                                            </span>
                                        </Link>


                                        <span className="custom-btn">
                                            <button className="btn button-primary button-outline  button-custom"
                                                onClick={() => {
                                                    if (localStorage.getItem('token') && localStorage.getItem('_id')) {
                                                        this.handleLikeClick(post._id)
                                                    }
                                                    else {
                                                        this.handleUnLikeClick();
                                                    }
                                                }}
                                            > الإعجابات  {post.likes.length}</button>
                                        </span>
                                    </Card>
                                </Col>)

                        } else {
                            return (
                                ++i,
                                <Col key={post._id} className="mb-5">
                                    <Card className="text-right p-3"  >
                                        <Card.Img variant="top" src={`http://localhost:4000/${post.author._id}/${post.profileImg}`} alt="ali" style={{ zIndex: 1 }} />
                                        <Card.Body>
                                            <Card.Title className="mb-4 mt-4" >
                                                {post.title.substr(0, 30)}
                                            </Card.Title>
                                            <Card.Text className="card-text">
                                                {post.content.substr(0, 30)}
                                                <span className="span-dot">...</span>
                                            </Card.Text>
                                        </Card.Body>
                                        <Link to={'/post/view/' + post._id}>
                                            <span className="custom-btn">
                                                <button className="btn button-primary button-custom button-outline" >اقرأ المزيد</button>
                                            </span>
                                        </Link>


                                        <span className="custom-btn">
                                            <button className="btn button-primary button-outline  button-custom"
                                                onClick={() => {
                                                    if (localStorage.getItem('token') && localStorage.getItem('_id')) {
                                                        this.handleLikeClick(post._id)
                                                    }
                                                    else {
                                                        this.handleUnLikeClick();
                                                    }
                                                }}
                                            > الإعجابات  {post.likes.length}</button>
                                        </span>
                                    </Card>
                                </Col>

                            )
                        }

                    })}
                </Row>
            </Container>
        )
    }

}


export default Home;

