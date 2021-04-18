import React from 'react';
import styled from "styled-components";

const GridElement = styled.div`
background: grey;
 height: auto;
  width: auto;`;

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