import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";

import Home from "./components/Home";

import UserPage from "./components/UserPage";

import Login from "./components/Login";

import Register from "./components/Register";

import CreatePost from "./components/CreatePost";

import ViewPost from "./components/ViewPost";

import EditPost from "./components/EditPost";

import axios from "axios";




class App extends Component {

  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': token };
  }

  render() {
    return (

      <Router>
        <div>
          <Header></Header>
          <div className="container">
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/Login" component={Login} />
                <Route path="/UserPage" component={UserPage} />
                <Route path="/Register" component={Register} />
                <Route path="/post/create" component={CreatePost} />
                <Route path="/post/view/:id" component={ViewPost} />
                <Route path="/post/edit/:id" component={EditPost} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
