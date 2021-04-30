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
            coordinate: this.props.coordinates,
            pictureURL: this.props.pictureURLs
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
    //     }}

//TODO wait for functioning external api
    render(){

        return(
        <GridElement>
        <img>
         src={this.state.pictureLink}
        </img>
        </GridElement>);
    }
}

export default PictureElement;