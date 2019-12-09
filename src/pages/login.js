import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { login } from '../redux/action'
import Axios from 'axios'
import { connect, } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn, MDBInput } from 'mdbreact'

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
            Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`, {
                username,
                password
            })
            .then((res) => {
                if(res.data.length === 0){
                    alert('username or password invalid')
                }else{
                    localStorage.setItem('username',username)
                    this.props.login(res.data[0])
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
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
                    <MDBBtn gradient='purple' onClick={this.loginUser} style={{marginTop: '25px'}}>
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