import React, { Component } from 'react';
import Axios from 'axios';
import { MDBBtn, MDBInput } from 'mdbreact'
import { API_URL } from '../helpers/apiUrl'
import { Button } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { textAlign } from '@material-ui/system';

class AdminPage extends Component {
    state = { 
        data:[],
        openModal: false,
        selectedId: null
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

    editMovies = (id) => {
        let name = this.editmovtitle.value;
        let director = this.editdirector.value;
        let image = this.editimageurl.value;
        let genre = this.arrPush(this.editgenre.value);
        let duration = this.editduration.value;
        let synopsis = this.editsynopsis.value;
        let casts = this.arrPush(this.editcasts.value);
        let trailer = this.edittrailer.value
        Axios.patch(API_URL+`/movies/${id}`, {
            name,
            genre,
            director,
            duration,
            synopsis,
            casts,
            image,
            trailer
        })
        .then((res) => {
            console.log(res)
            Axios.get(API_URL + `/movies`)
            .then((res) => {
                console.log(res)
                this.setState({data: res.data})
                this.setState({selectedId: null})
                alert('Movie edit successful.')

            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })

    }

    renderMovies = () => {
        let { data, selectedId } = this.state;
        return data.map((val,index) => {
            if(val.id === selectedId){
                return(
                    <tr>
                        <th>#</th>
                        <th>
                            <MDBInput type='text' valueDefault={val.name} label='MovieTitle' inputRef={(editmovtitle) => this.editmovtitle = editmovtitle}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.director} label='Director' inputRef={(editdirector) => this.editdirector = editdirector}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.image} label='ImageURL' inputRef={(editimageurl) => this.editimageurl = editimageurl}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.genre} label='Genre' inputRef={(editgenre) => this.editgenre = editgenre}/>
                        </th>
                        <th>
                            <MDBInput type='number' valueDefault={val.duration} label='Duration' inputRef={(editduration) => this.editduration = editduration}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.synopsis} label='Synopsis' inputRef={(editsynopsis) => this.editsynopsis = editsynopsis}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.casts} label='Casts' inputRef={(editcasts) => this.editcasts = editcasts}/>
                        </th>
                        <th>
                            <MDBInput type='text' valueDefault={val.trailer} label='Trailer' inputRef={(edittrailer) => this.edittrailer = edittrailer}/>
                        </th>
                        <th>
                            <MDBBtn color='success' onClick={() => this.editMovies(selectedId)}>Confirm</MDBBtn>
                            <MDBBtn color='danger' onClick={() => this.setState({selectedId: null})}>Cancel</MDBBtn>
                        </th>
                    </tr>
                )
            }
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
                        <MDBBtn color='dark-green' style={{color: 'white'}} onClick={() => this.setState({selectedId: val.id})}>Edit</MDBBtn>
                        <MDBBtn color='danger' onClick={() => this.deleteMovie(val.id)}>Delete</MDBBtn>
                    </th>
                </tr>
            )
        })
    }

    deleteMovie = (id) => {
        Axios.delete(API_URL+`/movies/${id}`)
        .then((res) => {
            console.log(res)
            Axios.get(API_URL + `/movies`)
            .then((res) => {
                this.setState({data: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddMovie = () => {
        let name = this.movtitle.value;
        let director = this.director.value;
        let image = this.imageurl.value;
        let genre = this.arrPush(this.genre.value);
        let duration = this.duration.value;
        let synopsis = this.synopsis.value;
        let casts = this.arrPush(this.casts.value);
        let trailer = this.trailer.value
        if(name && director && image && genre && duration && synopsis && casts && trailer){
            Axios.post(API_URL + `/movies`, {
            name,
            genre,
            director,
            duration,
            synopsis,
            casts,
            booked:[],
            image,
            trailer
            })
            .then((res) => {
                console.log(res)
                Axios.get(API_URL + `/movies`)
                .then((res) => {
                    console.log(res)
                    this.setState({data: res.data})

                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
            this.setState({openModal: false})
        }else{
            alert('Please fill in all the fomrs!')
        }
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
        console.log(this.state.selectedId)
        let { openModal } = this.state
        return ( 
            <div>
                <MDBBtn className='col-12 p-2 m-auto justify-content-center' color='yellow' onClick={() => this.setState({openModal: true})}>
                    <h4 style={{color: 'black'}}>
                        - Add Movie -
                    </h4>
                </MDBBtn>
                <Modal isOpen={openModal}>
                    <ModalHeader>New Movie Details</ModalHeader>
                    <ModalBody>

                      <MDBInput label='Movie Title' type='text' inputRef={(movtitle) => this.movtitle = movtitle}/>
                        
                      <MDBInput label='Director' type='text' inputRef={(director) => this.director = director}/>
                        
                      <MDBInput label='ImageURL' type='text' inputRef={(imageurl) => this.imageurl = imageurl}/>
                        
                      <MDBInput label='Genre' type='text' inputRef={(genre) => this.genre = genre}/>
                        
                      <MDBInput type='number' label='Duration' type='number' inputRef={(duration) => this.duration = duration}/>
                        
                      <MDBInput label='Synopsis' type='text' inputRef={(synopsis) => this.synopsis = synopsis}/>
                        
                      <MDBInput label='Casts' type='text' inputRef={(casts) => this.casts = casts}/>
                      
                      <MDBInput label='Trailer' type='text' inputRef={(trailer) => this.trailer = trailer}/>
                      <Label>
                          Use commas(,) for multiple items like genre and casts.
                      </Label>
                    </ModalBody>
                    <ModalFooter>
                        <MDBBtn outline color="primary" onClick={this.onBtnAddMovie}>Confirm</MDBBtn>
                        <MDBBtn outline color="danger" onClick={() => this.setState({openModal: false})}>Cancel</MDBBtn>
                    </ModalFooter>
                </Modal>
                <table className="table table-hover" style={{border: '1px solid black', textAlign: 'center'}}>
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