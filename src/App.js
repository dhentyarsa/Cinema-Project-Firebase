import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import LogInPage from './pages/login';
import RegisterNewUser from './pages/register';
import MovieDetailPage from './pages/MovieDetail'
import { connect } from 'react-redux'
import Axios from 'axios';
import { API_URL } from './helpers/apiUrl';
import { login } from '../src/redux/action'
import InputPage from './pages/testing';
import Footer from './components/FooterBar';


class App extends Component {

  componentDidMount(){
    let username = localStorage.getItem('username')
    if(username){
      Axios.get(API_URL + `/users?username=${username}`)
      .then((res) => {
        console.log(res.data)
        this.props.login(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render() { 
    return ( 
      <BrowserRouter>
        <div>
            <Navbar/>
            <Route path='/' component={Home} exact /> 
            <Route path='/login' component={LogInPage} /> 
            <Route path='/register' component={RegisterNewUser} />
            <Route path='/detail' component={MovieDetailPage} />
            <Route path='/test' component={InputPage} />
            <Footer/>
        </div>
      </BrowserRouter>
     );
  }
}

const mapStatetoProps = (state) => {
  return {
      username: state.user.username,
      password: state.user.password,
      role: state.user.role
  }
}
 
export default connect(mapStatetoProps, { login })(App);
