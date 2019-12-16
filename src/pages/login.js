import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { login } from '../redux/action'
import Axios from 'axios'
import { connect, } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn, MDBInput, MDBIcon } from 'mdbreact'
import Swal from 'sweetalert2'

class LogInPage extends Component {
    state = { 
        data: []
     }

     loginUser = () => {
        let username = this.text.value;
        let password = this.pass.value;
        if(username === '' || password === ''){
            alert('Fill in all the forms')
        }else{
            this.props.login(username, password)
            localStorage.setItem('username', username)
            this.alertLogin()
        }
    }
    alertLogin = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
    }

    render() {
        if(this.props.username !== ''){
            return(
                <Redirect to='/'>

                </Redirect>
            )
        }
        return(
            <div className='col-12' style={{  
                height:'500px',
                width:'500px',
                margin:'auto',
                padding:'55px',
                backgroundRepeat: 'no-repeat',
                margintop: '25px'
            }}>
                <div className='container col-12' style={{color: 'black'}}>
                    <MDBInput label='Username' type='text' id='outline' inputRef={(text) => this.text = text}></MDBInput>
                    <MDBInput label='Password' type='password' inputRef={(pass) => this.pass = pass}></MDBInput>
                    <MDBBtn rounded gradient='purple' type='button' className='p-3 col-12' onClick={this.loginUser} style={{marginTop: '25px'}}>
                        Log-in
                    </MDBBtn>
                </div>
            </div>    
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
 
export default connect(mapStatetoProps, { login }) (LogInPage);