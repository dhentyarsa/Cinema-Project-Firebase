import React, { Component } from 'react';
import MovieCard from '../components/cardmovies';
import Axios from 'axios'
import { API_URL } from '../helpers/apiUrl'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class LandingPage extends Component {
    state = { 
        data:[]
     }

    componentDidMount(){
        Axios.get(API_URL + '/movies')
        .then((res) => {
            console.log(res.data)
            this.setState({data: res.data})
        })
    }

    renderMovieCard = () => {
        return this.state.data.map((val,index) => {
            return(
                    <MovieCard 
                    key={index}
                    id={val.id}
                    title={val.name} 
                    genre={val.genre} 
                    director={val.director} 
                    duration={val.duration}
                    image={val.image}
                    desc={val.synopsis}
                    />
            )
        })
    }



    render() { 
        console.log(this.props.username)
        console.log(this.props.password)
        return (
            <div style={{  
                backgroundImage: "url(" + "https://cdn.dribbble.com/users/23161/screenshots/4283954/cinema-pattern.gif" + ")",
                backgroundPosition: '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
                  <div>
                        <div className='d-flex justify-content-center m-auto' style={{flexWrap:'wrap', border: 'none'}}>
                                {this.renderMovieCard()}
                        </div>
                  </div>
                  <br/>
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
 
export default connect( mapStatetoProps ) (LandingPage);