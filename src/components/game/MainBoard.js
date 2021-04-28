// TODO define game states
// TODO add getRequest for after guessing for ending guesses
// TODO will need to be styled
// TODO map urls to components

import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import PictureElement from "./PictureElement";
import {api, handleError} from "../../helpers/api";
import {Button} from "../../views/design/Button";
import PictureGrid from "./PictureGrid"

const Container = styled(BaseContainer)`
  display: flex;
  color: white;
  text-align: center;
  flex-direction: row;
  min-width: 900px;
  
  `;

const GridContainer = styled.div`
  
  display: grid;
  align-items: center;
  min-height: 300px;
  min-width: 600px;
  justify-content: center;
  
  grid-template-areas: 
  'empty 1 2 3 4'
  'A G G G G'
  'B G G G G'
  'C G G G G'
  'D G G G G';
 
`;

const Grid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 10px;
  
  width: auto;
  height: 600px;
  
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  
  
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 2;
  grid-column-end: span 4;
`;

const GridCoordinate = styled.div`
 height: 100px;
  width: 100px;
background: pink;
border-radius: 50px;
margin: 15px;



`;

const GridVoid = styled.div`
background: transparent;
 height: auto;
  width: auto;
  grid-row-start: 1;
  grid-column-start: 1;
`;

const UserBar = styled.div`
display: flex;
flex-direction: row;
width: 20%;
height: 600px;
background: pink;
margin: 15px;
border-radius: 5px;

color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


// made Picture element a separate class so it can store its coordinates,
// so when the time comes to select a specific coordinate it will be able to ti pass it on directly
// could also be useful for the pictures
class MainBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            pictureURLs: null,
            coordinate: [0,1,2,3,
                4,5,6,7,
                8,9,10,11,
                12,13,14,15],
        };
    }

    //API REQUESTS//

    async getPlayersFromLobby(){
        try {
            const response = await api.get("/players");
            this.setState({players: response});
        }
        catch (error) {
            alert(`Something went wrong getting the Players: \n${handleError(error)}`);
        }
    }

    async initGame(){
        try {
            const response = await api.get("/board");
            this.setState({players: response});
            console.log(response);
        }
        catch (error) {
            alert(`Something went wrong getting the Players: \n${handleError(error)}`);
        }
    }

    componentDidMount() {}

    //DISPLAY//

    render(){

        return(<Container>

            <PictureGrid/>
            <UserBar>
                <div>Build the picture located at "{}"</div>
                <div>with the set "{localStorage.getItem("mySet")}"</div>
            </UserBar>

            <ButtonContainer>
                <Button
                    width="50%"
                    onClick={() => {
                        this.initGame();
                    }}
                >
                    get me set & token!
                </Button>
            </ButtonContainer>

            <ButtonContainer>
            <Button
                width="50%"
                onClick={() => {
                    this.showBuildScreen();
                }}
            >
                take me to build screen
            </Button>
        </ButtonContainer>
        </Container>);
    }

    showBuildScreen() {
        this.props.history.push(`/buildScreen`);
    }
}
export default withRouter(MainBoard);