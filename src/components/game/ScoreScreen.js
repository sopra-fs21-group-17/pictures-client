import React from 'react';
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
            rounds: 0
        };

    }

    async componentWillMount() {
        try {
            const response = await api.get("/rounds/" + localStorage.getItem("lobbyId"))
            this.setState({rounds: response.data})
        } catch (error) {
            alert(`Something went wrong getting the current round: \n${handleError(error)}`);
        }
    }

    async nextRound() {
        try {
            await api.put(`/board/` + localStorage.getItem("lobbyId"))
            this.props.history.push(`/board`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async playAgain(){
        //TODO frage was da passiere sell --> id lobby gschickt werde --> denne eifach im backend alli Repos leere aber lobby laa
        this.props.history.push('/lobbies/' + localStorage.getItem("lobbyId"));

    }

    async exitGame(){
        //TODO zrugg is Home alles leere --> BE user us de lobby entferne alueg
        this.props.history.push(`/dashboard/home`);
    }

    gameHasFinished() {
        return (
            <Button
                width="25%"
                onClick={() => {
                    this.exitGame();
                }}
            >
                Exit Game

            </Button>,
                <Button
                    width="25%"
                    onClick={() => {
                        this.playAgain();
                    }}
                >
                    new Round

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
                if (correctedGuesses.charAt(i + j) == "y") {
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
                    {this.state.rounds == 5 }?{this.gameHasFinished()}:{<Button
                        width="25%"
                        onClick={() => {
                            this.nextRound();
                        }}
                    >
                        Ok, next round!
                    </Button>}
                </ButtonContainer>
            </Container>
        );
    }
}
export default withRouter(ScoreScreen);
