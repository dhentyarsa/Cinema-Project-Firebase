import React, { Component } from 'react';
import { array } from 'prop-types';
import { validate } from '@babel/types';

class ReserveSeats extends Component {
    state = {
        data: [],
        chosen: [],
        booked:[]
     }

     renderSeats = () => {
         let seats = 100;
         let { chosen, booked } = this.state
         let arr = []
         for (let i = 0; i < seats/20; i++){
             arr.push([])
             for(let j = 0; j < seats/(seats/20); j++){
                 arr[i].push(1)
             }
            }
            console.log(arr)
    }
    
    render() {
        {this.renderSeats()}
        return ( 
            <div className='col-12 justify-content-center text-center'>
                <h1 style={{fontFamily: 'Bebas Neue, cursive'}}>Choose your seats for {this.props.location.state.name}</h1>
                <p>{this.arr}</p>
            </div>
         );
    }
}
 
export default ReserveSeats;