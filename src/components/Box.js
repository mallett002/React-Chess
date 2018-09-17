import React, { Component } from 'react'
import King from './King';

export default class Box extends Component {

  render() {

    const { place } = this.props;
    console.log(place.split(",")[1]);

    return (
      <div className="box"
        style={isEven(Number(place.split(",")[0]), Number(place.split(",")[1]))
            ? {background: 'green'} 
            : {background: 'white'}}
      >
        <King user="black" />
      </div>
    )
  }
}

function isEven(n, j) {
    if ((n + j) % 2 === 0) return true;
    else return false;
}

// {String.fromCharCode(charCode)}