import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../helpers/apiUrl';
import EventSeatIcon from '@material-ui/icons/EventSeat';

class SeatReservation extends Component {
    state = { 
        data: [],
        booked: [[0,0], [0,1]],
        chosen: [],
        price: 0,
        count: 0
    };

    // componentDidMount(){
    //     Axios.get(API_URL + `/movies?id=1`)
    //     .then((res) => {
    //         this.setState({data: res.data})
    //         console.log(this.state.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    onBtnSeatClick = (arr) => {
        let { chosen, price, count } = this.state;
        // if(chosen.length >= 5){
        //     return null
        // }else{

            chosen.push(arr);
            this.setState({ 
                chosen,
                price: price + 50000,
                count: count + 1
            })
            // console.log(chosen)
        // }
    }

    onBtnCancelSeat = (arr) => {
        let { chosen, price, count } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            chosen: output,
            price: price - 50000,
            count: count -1
        })
    }

    renderSeat = () => {
        let seats = 100;
        let { chosen, booked } = this.state;
        let arr = [];

        for (let i = 0; i<seats/20; i++){
            arr.push([])
            for (let j = 0; j<seats/(seats/20); j++){
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

        

        // let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        return arr.map((val, index) => {
            return(
                <div className='d-flex justify-content-center '>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return (
                                    <EventSeatIcon 
                                        color={"secondary"}
                                        disabled
                                        fontSize={"large"}
                                    />
                                )
                            }
                            if (val1 ===3){
                                return (
                                    <EventSeatIcon 
                                        color={"primary"}
                                        onClick={() => this.onBtnCancelSeat([index,i])}
                                        fontSize={"large"}
                                    />
                                )
                            }
                            return(
                                <EventSeatIcon 
                                    onClick={() => this.onBtnSeatClick([index, i])} 
                                    fontSize={"large"} 
                                />
                            )
                        })
                    }
                </div>
            )
        })
    }

    render() { 
        console.log(this.props.location.state)
        return ( 
            <div className='container full-height'>
                <div className='d-flex justify-content-center'>
                    <h1>Choosing Seats for </h1>
                </div>
                {this.renderSeat()}
            </div>
        );
    }
}
 
export default SeatReservation;