import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Axios from 'axios';
import {API_URL} from '../helpers/apiUrl'

class MovieDetailPage extends Component {
    state = { 
        data:[]
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

    render() { 
        let { data } = this.state
        return ( 
            <div className='container'>
            <div className='row'>
                <div className='col-4'>
                    <img src={data.image} alt='display poster'/>
                </div>
                <div className='col-8'>
                    <div className='vertical-spacing'>
                        <h2>
                            {data.name}
                        </h2>
                    </div>
                    <div className='vertical-spacing'>
                        {data.director}
                    </div>
                    <div className='vertical-spacing'>
                        Duration: {data.duration} Minutes
                    </div>
                    <div className='vertical-spacing'>
                    </div>
                    <div className='vertical-spacing'>
                        {data.synopsis}
                    </div>
                    <div className='vertical-spacing' style={{ marginTop: '100px', float: 'right'}}>
                        <Button color='danger' className='btn-custom'>Choose My Seats</Button>
                    </div>
                </div>
            </div>
        </div>
     );
    }
}


 
export default MovieDetailPage