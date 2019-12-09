import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Axios from 'axios';
import {API_URL} from '../helpers/apiUrl'
import '../App.css'
import { connect } from 'react-redux'
import { MDBBtn, MDBInput } from 'mdbreact'
import { Redirect } from 'react-router-dom'

class MovieDetailPage extends Component {
    state = { 
        data:[
            {
                redirectPurchase: false,
                redirectLogin: false
            }
        ]
     }
     componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        console.log(id)
        Axios.get(API_URL+`/movies/${id}`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnReservation = () => {
        let { username } = this.props;
        if(username === ''){
            this.setState({redirectPurchase:true})
        }else{
            this.setState({redirectLogin:true})
        }
    }

    renderCasts = () =>{
        let { casts } = this.state.data;
        if(casts){
            return casts.map((val,index) => {
                return(
                    <h5 key={index+5}>{val}</h5>
                )
            })
        }
    }

    renderGenre = () =>{
        let { genre } = this.state.data;
        if(genre){
            return genre.map((val,index) => {
                return(
                    <row style={{padding: '0px 5px 0px 0px'}}>
                        <MDBBtn color='info' key={index+5}>{val}</MDBBtn>
                    </row>
                )
            })
        }
    }



    render() { 
        let { data, redirectLogin, redirectPurchase } = this.state
        if(redirectLogin){
            return(
                <Redirect to='/reservation'/>
            )
        }else if(redirectPurchase){
            return(
                <Redirect to='/register'/>
            )
        }
        return ( 
            <div className='container p-5 m-auto justify-content-center'>
            <div className='row'>
                <div className='col-4'>
                    <img src={data.image} alt='display poster'/>
                    <div className='vertical-spacing p-3'>
                        <h1>
                            {data.name}
                        </h1>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='vertical-spacing justify-content-center d-flex p-1'>
                    <iframe title='Movie-Trailer' width="700" height="422" src={data.trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='vertical-spacing casts-spacing'>
                        {this.renderCasts()}
                    </div>
                    <div className='vertical-spacing'>
                        <h6>
                            {data.director}
                        </h6>
                    </div>
                    <div className='vertical-spacing' style={{padding: "0px 0px 5px 0px"}}>
                        Duration: {data.duration} Minutes
                    </div>
                    <div className='vertical-spacing' style={{padding: "0px 0px 5px 0px"}}>
                        {this.renderGenre()}
                    </div>
                    <div className='vertical-spacing'>
                        {data.synopsis}
                    </div>
                    <div className='vertical-spacing' style={{ marginTop: '100px', float: 'right'}}>
                        <MDBBtn onClick={this.onBtnReservation} color='success' className='btn btn-indigo'>
                            Choose My Seats
                        </MDBBtn>
                    </div>
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


 
export default connect( mapStatetoProps )(MovieDetailPage)