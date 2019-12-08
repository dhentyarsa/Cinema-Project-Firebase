import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import './cardmovies.css'
import {Link} from 'react-router-dom'

const MovieCard = (props) => {
  console.log(props)
    return (
        <div className='mx-auto d-flex justify-content-center border-none m-auto' style={{flexWrap: 'wrap'}} key={props.id}>
          <Link to={`/detail?id=${props.id}`}>
          <div className="flip-card border-none">
            <div className="flip-card-inner border-none">
              <div className="flip-card-front border-none">
                <img src={props.image} alt="Avatar" style={{width:"100%", height: "100%" }} />
              </div>
              <div className="flip-card-back" style={{width:"100%", height: "100%", fontFamily: 'PT Mono, monospace', fontSize: '15px'}}>
                <h1 className='pt-3' style={{fontWeight: '700'}}>{props.title}</h1>
                <p className='' style={{flexWrap: 'wrap'}}>{props.desc}</p>
                <p></p>
              </div>
            </div>
          </div>
          </Link>
        </div>
  );
};

export default MovieCard;