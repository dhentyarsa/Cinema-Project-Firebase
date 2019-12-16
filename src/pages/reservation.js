import React, { Component } from 'react';
import { MDBIcon, MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addToCart } from '../redux/action'
import Axios from 'axios';
import { API_URL } from '../helpers/apiUrl';
import Swal from 'sweetalert2'


class ReserveSeats extends Component {
    state = {
        data: [],
        chosen: [],
        booked:[],
        price: 0,
        count: 0,
        cart:[],
        totalseatnumber:[]
     }

     componentDidMount(){
        let id = this.props.location.state.id
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

     onBtnSeatClick = (arr) => {
        let { chosen, price, count, totalseatnumber } = this.state;
        let alphabet = ['E', 'D', 'C', 'B', 'A']
        let seatnumber = []
            for(var i = 0; i<1; i++){
                (seatnumber.push(alphabet[arr[0]]+arr[1]))
            }
            console.log(seatnumber)
            totalseatnumber.push(seatnumber)
            chosen.push(arr);
            this.setState({ 
                chosen,
                price: price + 50000,
                count: count + 1,
                totalseatnumber
            })
            console.log(this.state.seatnumber)
            
    }

    onBtnCancelSeat = (arr) => {
        let { chosen, price, count, totalseatnumber } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        let output2 = totalseatnumber.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            chosen: output,
            price: price - 50000,
            count: count -1,
            totalseatnumber: output2
        })
    }

     renderSeats = () => {
        let seats = 100;
        let { chosen } = this.state;
        let { booked } = this.props.location.state;
        let arr = [];
        for (let i = 0; i < seats/20; i++){
            arr.push([])
            for(let j = 0; j < seats/(seats/20); j++){
            arr[i].push(1)
            }
        }
        console.log(arr)
        for(let k = 0 ; k< booked.length; k++){
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for(let l = 0 ; l< chosen.length; l++){
            arr[chosen[l][0]][chosen[l][1]] = 3
        }

        return arr.map((val, index) => {
            return(
                <div key={index+4} className='d-flex justify-content-center '>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return (
                                    <MDBIcon key={i+'c'} icon='square'
                                        className='red-text'
                                        disabled
                                        size='2x'
                                        style={{padding: '2px'}}
                                    />
                                )
                            }
                            if (val1 ===3){
                                return (
                                    <MDBIcon 
                                        key={i+'b'} 
                                        icon='square'
                                        className='indigo-text'
                                        onClick={() => this.onBtnCancelSeat([index,i])}
                                        size='2x'
                                        style={{padding: '2px'}}
                                    />
                                )
                            }
                            return(
                                <MDBIcon 
                                key={i+'a'} 
                                onClick={() => this.onBtnSeatClick([index,i])} 
                                far icon="square" 
                                size='2x' 
                                style={{padding: '2px'}}
                                />
                            )
                        })
                    }
                </div>
            )
        })


    }

    addToCart = () => {
        console.log(this.props)
        let { cart, idUser } = this.props;
        let { name, id, booked } = this.props.location.state;
        let { price, chosen, count} = this.state;
        let addCart ={
            name,
            totalPrice: price,
            seats: chosen,
            ticketAmount: count
        }
        console.log(addCart)
        cart.push(addCart)
        booked.push(...chosen)
        Axios.patch(API_URL + `/users/${idUser}`, {
            cart: cart
        })
        .then((res) => {
            console.log(res.data)
            Axios.patch(API_URL + `/movies/${id}`, {
                booked: booked
            })
            .then ((res) => {
                console.log(res)
                this.redirectPage()
                this.setState({totalseatnumber:0})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addtoCartAlert = () => {
        Swal.fire({
            title: 'Your Booking Details',
            imageUrl: `${this.state.data.image}`,
            imageAlt: `Movie Poster`,
            imageHeight: '50%',
            imageWidth: '50%',
            html:
                
                `
                <center>
                <table id=table border=1>
                    <center>
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Total Seat</th>
                            <th scope="col">Seat Number</th>
                            <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="col">${this.props.location.state.name}</th>
                            <th scope="col">${this.state.count}</th>
                            <th scope="col">${this.state.totalseatnumber}</th>
                            <th scope="col">${this.state.price.toLocaleString()}</th>
                            </tr>
                        </tbody>
                    </center>
                </table>
                </center>`
                
            ,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
          }).then((result) => {
            if (result.value) {
            Swal.fire(
                'Booking Successful!',
                'Proceed to Checkout',
                'success',
                )
            .then(
                this.addToCart()
            )
            }
          })
    }

    redirectPage = () => {
        return(
            <Redirect to='/checkout'>

            </Redirect>
        )
    }

    

    render() {
        return ( 
            <div className='col-12 justify-content-center text-center m-auto p-3'>
                <h1 style={{fontFamily: 'Bebas Neue, cursive'}}>Choosing seats for {this.props.location.state.name}</h1>
                <div className='p-3'> 
                    {this.renderSeats()}
                </div>
                <div className='col-12 justify-content-center text-center'>
                    <h3>_________________________</h3>
                    <h6>|SCREEN|</h6>
                </div>
                <div>
                    <div>
                        Total Price: Rp. 
                        {this.state.price.toLocaleString()}
                    </div>
                    <div>
                        Tickets: 
                        {this.state.count}
                    </div>
                        <MDBBtn onClick={this.addtoCartAlert}>
                                Add to Cart
                        </MDBBtn>
                </div>
            </div>
         );
    }
}

const mapStatetoProps = (state) => {
    return{
        cart: state.user.cart,
        idUser: state.user.id
    }
}
 
export default connect(mapStatetoProps, { addToCart })(ReserveSeats);