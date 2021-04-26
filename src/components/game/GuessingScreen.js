// temporary file to simulate GuessingScreen for development
// TODO change "pictureElement" to user element (create new class for this?)
import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import PictureElement from "./PictureElement";


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  width: 50px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class GuessingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            players: null,
            pictureURLs: null,
            coordinate: [0,1,2,3],
            userNames: ["adam", "eva", "fritzli", "voldemort"],
            // userNames: [],
            guesses: [],
            guess1: {"adam":null}, guess2: {"eva": null}, guess3: null, guess4: null,
        }
        //this.getUsers();
   //     this.setState({username: localStorage.getItem(id)})
        };




    async getUsers() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
//PUT REQUEST
    async sendGuesses(){

        try{
            const guesses = [this.state.guess1, this.state.guess2, this.state.guess3, this.state.guess4]
            const requestBody = JSON.stringify({
                username: this.state.username,   // todo change this to userID
                guess: guesses                      //todo change Coordinate strings to integer
            })
            await api.put("/guess", requestBody);
        } catch(error) {
            alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        }

    }

    handleInputChange(key, value) {
     //   this.setState({ [key]:{ key: dictKey,//                              value: value }});
     //   this.state.guesses.push(dictKey,value);
        localStorage.setItem(key,value);
        console.log(this.state.guesses);
    }



    showScoreScreen() {
        this.props.history.push(`/scoreScreen`);
    }

    render() {

        // const guessInput = this.state.userNames.map(user =>{
        //
        //
        //    return(
        //        <tr>
        //            <td>SCREENSHOT 1</td>
        //        <td><InputField
        //         placeholder="A1"
        //         onChange={e => {
        //             this.state.guesses.push(user,"");
        //             this.handleInputChange('guesses', user,e.target.value);
        //         }}
        //        />  </td>
        //        </tr>
        //    )
        // })

        return (
            <Container>
                <h1>GUESSING SCREEN</h1>
                    <div>
                        <h3 align={"left"}>Make your guesses</h3>
                        <p align={"left"}>Select the coordinates corresponding to the pictures position:</p>

                        <table align={"left"}>
                            <tr>
                                <td>&nbsp;</td>
                                <td>coordinates</td>

                            </tr>
                            {/*{guessInput}*/}
                            <tr>
                                <td>SCREENSHOT 1</td>
                                <td>

                                    <InputField
                                        placeholder="A1"
                                        onChange={e => {
                                            this.handleInputChange('guess1', e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>SCREENSHOT 2</td>
                                <td>
                                    <InputField
                                        placeholder="A1"
                                        onChange={e => {
                                            this.handleInputChange('guess2',e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>SCREENSHOT 3</td>
                                <td>
                                    <InputField
                                        placeholder="A1"
                                        onChange={e => {
                                            this.handleInputChange('guess3',e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>SCREENSHOT 4</td>
                                <td>
                                    <InputField
                                        placeholder="A1"
                                        onChange={e => {
                                            this.handleInputChange('guess4',e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                        </table>

                        <p></p>
                        <p align={"center-right"}>"ORIGINAL PICTURES"</p>
                        <p></p>

                        <table align={"center"}>
                            <tr>
                                <td>&nbsp;</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>A</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                            </tr>
                            <tr>
                                <td>D</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                                <td>XXX</td>
                            </tr>
                        </table>

                        <Button
                            width="100%"
                            onClick={() => {
                                this.sendGuesses();

                            }}
                        >
                            I'm done guessing!
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.showScoreScreen();
                            }}
                        >
                            Guessing is done!
                        </Button>
                    </div>
            </Container>
        );
    }

}

export default withRouter(GuessingScreen);
