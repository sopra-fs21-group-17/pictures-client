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
    // async sendGuess() {
    //     try {
    //         const requestBody = JSON.stringify({
    //             coordinate: this.state.coordinate
    //         });
    //
    //         await api.put("/guess",requestBody);
    //
    //     } catch (error) {
    //         alert(`Something went wrong during guessing: \n${handleError(error)}`);
    //     }
    // }

    renderPictures(){
        return(
            <img>
                src={this.state.pictureURL}
            </img>
        )
    }
    renderCoordinates(){return(this.state.coordinate) }

//TODO wait for functioning external api
    render(){

        return <GridElement>
            {this.state.pictureURL ? this.renderPictures() : this.renderCoordinates()}
        </GridElement>
    }
}

export default PictureElement;