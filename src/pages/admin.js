import React, { Component } from 'react';
import Axios from 'axios';
import { MDBBtn } from 'mdbreact'
import { API_URL } from '../helpers/apiUrl'

class AdminPage extends Component {
    state = { 
        data:[]
     }

     componentDidMount(){
        Axios.get(API_URL+`/movies`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderMovies = () => {
        let { data } = this.state;
        return data.map((val,index) => {
            return(
                <tr key={index+7}>
                    <th>{val.id}</th>
                    <th>{val.name}</th>
                    <th>{val.director}</th>
                    <th><img src={val.image} alt='movie-poster' width='100px'/></th>
                    <th>
                        {val.genre.map((genre,index) => {
                            return(
                                <p key={index+3}>{genre}</p>
                            )
                        })}
                    </th>
                    <th>{val.duration}</th>
                    <th>{val.synopsis}</th>
                    <th>
                        {val.casts.map((casts,index) => {
                            return(
                                <p key={index+6}>{casts}</p>
                            )
                        })}
                    </th>
                    <th>{val.trailer}</th>
                    <th>
                        <MDBBtn>Edit</MDBBtn>
                        <MDBBtn>Delete</MDBBtn>
                    </th>
                </tr>
            )
        })
    }

    render() { 
        return ( 
            <div>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Director</th>
                    <th scope="col">Image</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Synopsis</th>
                    <th scope="col">Casts</th>
                    <th scope="col">Trailer</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderMovies()}
                </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminPage;