import React from 'react';
import styled from "styled-components";

// add put request for guesses so that it always just updates guesses as long as the same user is chosen


const GridElement = styled.div`
background: grey;
 height: auto;
  min-width: 150px`;

class PictureElement extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            coordinate: this.props.coordinates
        }

    }

    render(){

        return <GridElement >{this.state.coordinate}</GridElement>
    }
}

export default PictureElement;