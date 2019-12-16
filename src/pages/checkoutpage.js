import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../helpers/apiUrl';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'

class CheckoutCart extends Component {
    state = { 
        data: []
    }

    componentDidMount(){
        let id = this.props.id
        // id ambil dari global state
        // connect react-redux
        Axios.get(API_URL +`/users/${id}`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(res.data.cart)
            console.log(this.state)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCart = () => {
        console.log('halo')
        //map isi this.state.data
        // map jadi tbody === html
        // TableRow === reactstrap
    }

    render() {
        console.log(this.props.id)
        console.log(this.state)
        return ( 
            <div>
                <table className='container table table-hover'>
                    <thead>
                        <th>#</th>
                        <th>Movie Title</th>
                        <th>Seats</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <Button>
                    Check Out
                </Button>
            </div>    
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        id: state.user.id
    }
}
 
export default connect(mapStatetoProps)(CheckoutCart);