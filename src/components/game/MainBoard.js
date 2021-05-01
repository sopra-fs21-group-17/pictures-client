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
            requested: false,
            players: {},
            myUserName: "USER 1", // TODO correct this for real data
            mySet: "-",
            myCoordinates: "-",
            coordinateNames: [
                "A1", "A2", "A3", "A4",
                "B1", "B2", "B3", "B4",
                "C1", "C2", "C3", "C4",
                "D1", "D2", "D3", "D4"],
            pictureURLs: null,
            coordinate: [0,1,2,3,
                4,5,6,7,
                8,9,10,11,
                12,13,14,15],
        };
        this.initGame();
    }

    //API REQUESTS//
// TODO delete this comment
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
            const response = await api.get("/board/"+localStorage.getItem("lobbyId"));
            this.setState({players: response.data});
            this.setState({requested: true});

            // update players assigned coord. & set to display it to them
            for(const [key, val] of Object.entries(this.state.players)){
                if(val.username === this.state.myUserName){
                    this.setState({
                        mySet: val.assignedSet,
                        myCoordinates: this.state.coordinateNames[val.assignedCoordinates]
                    });
                    break;
                }
            }

            localStorage.setItem("mySet", this.state.mySet);
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
            <table>
                <td>
                    <tr>Build the picture located at</tr>
                    <tr>{this.state.myCoordinates}</tr>
                    <tr>
                        <ButtonContainer>
                            <Button
                                onClick={() => {
                                    this.showBuildScreen();
                                }}
                            >
                                take me to build screen
                            </Button>
                        </ButtonContainer>
                    </tr>
                </td>
            </table>
        </Container>);
    }

    showBuildScreen() {
        this.props.history.push(`/buildScreen`);
    }
}
export default withRouter(MainBoard);