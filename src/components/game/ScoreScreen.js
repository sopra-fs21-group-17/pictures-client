import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;




class ScoreScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            players: {},


            max_rounds:5,
            rounds: 0,
            playersFinished: false,
            buttonPressed: false

        };

    }

    intervalID = 0;
 //   playersFinished =false;
 //   buttonPressed=false;

//TODO make sure that all players could update their board before board is rendered

     getRoundInformation = async () => {
         try {
             if(this.state.playersFinished && this.state.buttonPressed){
                 this.props.history.push(`/board`);
             }
             const response = await api.get("/rounds/" + localStorage.getItem("currentLobbyId"))
             this.setState({rounds: response.data.rounds})


             //makes the boolean --> the boolean will only return true once all players have finished the round (pressed the button)

             const checkPlayersFinished = response.data["numberOfPlayers"] <= response.data["allUsersFinishedRound"]
             this.setState({playersFinished: checkPlayersFinished})


             console.log(response.data.rounds)
             console.log(response.data["allUsersFinishedRound"])
             console.log(response.data["numberOfPlayers"])
             console.log("All players finished:" + checkPlayersFinished)
             console.log("Button was pressed:" + this.state.buttonPressed)
         } catch (error) {
             alert(`Something went wrong getting the current round: \n${handleError(error)}`);
         }
     }

    async componentWillMount() {
       await this.getRoundInformation()

    }


    componentDidMount() {

        this.intervalID = setInterval(this.getRoundInformation,5000)



    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }


    async nextRound() {
        try {
            await api.put(`/board/` + localStorage.getItem("currentLobbyId"))

        } catch (error) {
            alert(`Something went wrong during the preparation of next Round: \n${handleError(error)}`);
        }
    }

    async playAgain(){
        //TODO frage was da passiere sell --> id lobby gschickt werde --> denne eifach im backend alli betroffene Repos leere aber lobby laa?
        this.props.history.push('/lobbies/' + localStorage.getItem("currentLobbyId"));

    }

    async exitGame(){
        //TODO zrugg is Home alles leere --> BE user us de lobby entferne alueg 

        localStorage.removeItem('currentLobbyId');
        this.props.history.push("/home")
    }

    gameHasFinished() {
        return (

                <Button
                    width="25%"
                    onClick={() => {
                        this.playAgain();
                    }}
                >
                    play again

                </Button>
        )
    }


    convertCorrectedGuessesToMap(correctedGuesses) {

        let tempUsername = "";
        let tempCoordinates = "";
        let result = [];

        for (let i = 0; i < correctedGuesses.length; i++) {
            for (let j = 0; j < 1; j++) { // first letters is y/n for correct/incorrect guess
                //tempCoordinates += correctedGuesses.charAt(i+j);
                if(correctedGuesses.charAt(i+j) === "y"){
                    tempCoordinates = "✔";
                } else {
                    tempCoordinates = "✘";
                }
            }
            i++; // skip coordinates, goto username

            while (i < correctedGuesses.length - 1 && correctedGuesses.charAt(i) !== '-') {
                tempUsername += correctedGuesses.charAt(i);
                i++;
            }
            result.push([tempUsername, tempCoordinates]);
            tempUsername = tempCoordinates = "";
        }

        return result;
    }

    convertToArray(data) {

        let result = [];
        for (const [username, attribute] of Object.entries(data)) {
            let tuple = [username, attribute];
            result.push(tuple);
        }

        return result;
    }

    render() {

        const temp = this.convertCorrectedGuessesToMap(localStorage.getItem("correctedGuesses"));
        const filledTableGuesses = temp.map(tuple => {
                return (
                    <td>
                        <tr>{tuple[0]}</tr>
                        <tr>{tuple[1]}</tr>
                    </td>
                )
            }
        )

        const temp2 = this.convertToArray(JSON.parse((localStorage.getItem("thePoints"))));
        const filledTablePoints = temp2.map(tuple => {
                return (
                    <td>
                        <tr>{tuple[0]}</tr>
                        <tr>{tuple[1]}</tr>
                    </td>
                )
            }
        )

        return (
            <Container>
                <h2>SCORE OVERVIEW</h2>

                <p>Points overview:</p>
                <table align={"center"}>
                    {filledTablePoints}
                </table>

                <p>Your guesses:</p>
                <table align={"center"}>
                    {filledTableGuesses}
                </table>

                <ButtonContainer>
                    {
                        this.state.rounds <= this.state.max_rounds ? (this.state.buttonPressed == false? (<Button
                        width="25%"

                        onClick={() =>
                            ( this.nextRound(),
                            this.setState({buttonPressed:true})

                            )


                        }
                    >
                        Ok, next round!
                        </Button>):<Button
                        width="25%"
                        disabled={true}>Ok, next round!</Button>):this.gameHasFinished()
                    }
                    <Button
                        width="25%"
                        onClick={() => {
                            this.exitGame();
                        }}
                    >
                        Exit Game

                    </Button>

                </ButtonContainer>
                {this.state.buttonPressed ==  true? <h2>...waiting for the other players to finish</h2>:<h2></h2>}
            </Container>
        );
    }
}
export default withRouter(ScoreScreen);
