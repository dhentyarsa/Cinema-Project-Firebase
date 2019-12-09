import React, { Component } from 'react';
import Axios from 'axios';
import { MDBBtn } from 'mdbreact'
import { API_URL } from '../helpers/apiUrl'
import { Button } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

class AdminPage extends Component {
    state = { 
        data:[],
        openModal: false
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

    renderSynopsis  = (text) => {
        const arrSyn = text.split(' ')
        var output = []
        for (var i = 0; i<5; i++){
            output.push(arrSyn[i])
        }
        return output.join(' ') + '...'
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
                    <th>{this.renderSynopsis(val.synopsis)}</th>
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

    onBtnAddMovie = () => {
        let name = this.movtitle.value;
        let director = this.director.value;
        let imageurl = this.imageurl.value;
        let genre = this.arrPush(this.genre.value);
        let duration = this.duration.value;
        let synopsis = this.synopsis.value;
        let casts = this.arrPush(this.casts.value);
        if(name && director && imageurl && genre && duration && synopsis && casts){
            Axios.post(API_URL + `/movies`, {
            name,
            director,
            imageurl,
            genre,
            duration,
            synopsis,
            casts,
            booked:[]
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Please fill in all the fomrs!')
        }
        this.setState({openModal: false})
    }

    arrPush = (text) => {
        const arrSyn = text.split(',')
        var output = []
        for (var i = 0; i<arrSyn.length; i++){
            output.push(arrSyn[i])
        }
        return output
    }

    render() {
        let { openModal } = this.state
        return ( 
            <div>
                <MDBBtn className='col-12 p-2 m-auto justify-content-center' color='yellow' onClick={() => this.setState({openModal: true})}>
                    <h4 style={{color: 'black'}}>
                        -Add Movie-
                    </h4>
                </MDBBtn>
                <Modal isOpen={openModal}>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        <Label>
                            Movie Title
                        </Label>
                      <Input type='text' innerRef={(movtitle) => this.movtitle = movtitle}/>
                        <Label>
                            Director
                        </Label>
                      <Input type='text' innerRef={(director) => this.director = director}/>
                        <Label>
                            Image URL
                        </Label>
                      <Input type='text' innerRef={(imageurl) => this.imageurl = imageurl}/>
                        <Label>
                            Genre
                        </Label>
                      <Input type='text' innerRef={(genre) => this.genre = genre}/>
                        <Label>
                            Duration
                        </Label>
                      <Input type='text' innerRef={(duration) => this.duration = duration}/>
                        <Label>
                            Synopsis
                        </Label>
                      <Input type='text' innerRef={(synopsis) => this.synopsis = synopsis}/>
                        <Label>
                            Casts
                        </Label>
                      <Input type='text' innerRef={(casts) => this.casts = casts}/>
                      <Label>
                          Use comma(,) for multiple items like genre and casts
                      </Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button href='/admin' color="primary" onClick={this.onBtnAddMovie}>Confirm</Button>
                        <Button color="secondary" onClick={() => this.setState({openModal: false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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