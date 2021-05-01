import React from 'react';
import styled from "styled-components";
import {api, handleError} from "../../helpers/api";

// add put request for guesses so that it always just updates guesses as long as the same user is chosen

//TODO make state to ensure guessing is only possible in guessing phase

const GridElement = styled.div`
background: grey;
 height: auto;
  min-width: 150px`;

class PictureElement extends React.Component{
    constructor(props) {
        super(props);

        this.state ={

            coordinate: this.props.coordinate,
            pictureURL: this.props.pictureURL
        }
    }

    renderPicture(){

        return(

            <img key={this.state.pictureURL} src={this.state.pictureURL} height={100} width={100}
            />
        )
    }
    renderCoordinates(){return(this.state.coordinate) }

//TODO wait for functioning external api
    render(){

        return <GridElement>
            {this.state.pictureURL != null ? this.renderPicture() : this.renderCoordinates()}
        </GridElement>
    }
}

export default PictureElement;