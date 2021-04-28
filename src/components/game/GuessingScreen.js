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
import PictureGrid from "./PictureGrid";


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

//TODO add Constraints for coordinate guessing like only able to input A-D and 1-4 : if possible in js use Regex
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
            guesses: {},
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

    // PUT REQUEST
    async sendGuesses(){

        try{
       //     const guesses = [this.state.guess1, this.state.guess2, this.state.guess3, this.state.guess4]
            const requestBody = JSON.stringify({
                username: this.state.username,   // todo change this to userID
                guesses: this.state.guesses                  //todo change Coordinate strings to integer (maybe in BE)
            })
            await api.put("/guess", requestBody);
        } catch(error) {
            alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        }

    }

    // handleInputChange(key, value) {
    //  //   this.setState({ [key]:{ key: dictKey,//                              value: value }});
    //  //   this.state.guesses.push(dictKey,value);
    //     localStorage.setItem(key,value);
    //     console.log(this.state.guesses);
    // }

    saveGuessToDict(user, value) {

        this.setState({...this.state,
            guesses: {...this.state.guesses,[user]:value}})
        localStorage.setItem(user,value);
        console.log(this.state.guesses);
    }

    showScoreScreen() {
        this.props.history.push(`/scoreScreen`);
    }

    render() {
        let num = 1
        const guessInput = this.state.userNames.map(user =>{

           return(
               <tr>
                   <td>SCREENSHOT {num++}</td>
               <td>

                   <InputField
                placeholder="A1"
                onChange={e => {
                    this.saveGuessToDict( user,e.target.value);
                }}
               />  </td>
               </tr>
           )

        })

        return (
            <Container>
                <h1>GUESSING SCREEN</h1>
                    <div>
                        <h3 align={"left"}>Make your guesses</h3>
                        <p align={"left"}>Type in the coordinates corresponding to the pictures position:</p>

                        <table align={"left"}>
                            <tr>
                                <td>&nbsp;</td>
                                <td>coordinates</td>

                            </tr>
                            {guessInput}
                        </table>

                        <p></p>
                        <p align={"center-right"}>"ORIGINAL PICTURES"</p>
                        <p></p>


                        <PictureGrid></PictureGrid>

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
