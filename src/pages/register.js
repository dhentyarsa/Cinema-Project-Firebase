import React, { Component, Fragment } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { Input, Button } from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../helpers/apiUrl';
import { login } from '../redux/action'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

class RegisterNewUser extends Component {

    onBtnRegis = () => {
        let username = this.newuser.value;
        let email = this.newemail.value;
        let password = this.newpass.value;
        let confirmPass = this.connewpass.value;
        if(username && email && password && confirmPass){
            if(password === confirmPass){
                Axios.get(API_URL + `/users?username=${username}`)
                .then((res) => {
                    if(res.data.length === 0){
                        Axios.post(API_URL + `/users`, {
                            username,
                            email,
                            password,
                            role: 'user'
                        })
                        .then((res) => {
                            this.props.login(res.data)
                            localStorage.setItem('username',username)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }else{
                        alert('Username has already been taken!')
                    }
                })
            }else{
                alert('Invalid Password')
            }

        }else{
            alert('Please fill in all the fomrs!')
        }
    }

    state = {  }
    render() { 
        if(this.props.username !== ''){
            return(
                <Redirect to='/'>

                </Redirect>
            )
        }
        return ( 
        <div className='' style={{  
            backgroundPosition: '',
            height:'100%',
            width:'100%',
            margin:'auto',
            padding:'55px',
            backgroundRepeat: 'no-repeat'
        }}>>
            <div className='container w-25 text-center' >
                <h4 className='container d-flex justify-content-center'>
                    Create your new Account below!
                </h4>
                <br/>
                <MDBInput type='text' label='Username' inputRef={(newuser) => this.newuser = newuser}></MDBInput>
                <MDBInput type='text' label='E-mail' inputRef={(newemail) => this.newemail = newemail}></MDBInput>
                <MDBInput type='text' label='Password' inputRef={(newpass) => this.newpass = newpass}></MDBInput>
                <MDBInput type='text' label='Confirm Password' inputRef={(connewpass) => this.connewpass = connewpass}></MDBInput>
                <br/>
                    <MDBBtn color="dark" gradient='blue' onClick={this.onBtnRegis}>
                        Sign-Up
                    </MDBBtn>
                <div className='container m-auto justify-content-center p-5'>
                    <h6>Already have an acount?</h6>
                    
                    <h6>
                        <Link to='/login'>
                            Sign-In here!
                        </Link>
                    </h6>
                </div>
            </div>
        </div>
         );
    }
}

const mapStatetoProps = (state) => {
    return{
        username: state.user.username
    }
}
 
export default connect(mapStatetoProps,{ login })(RegisterNewUser);