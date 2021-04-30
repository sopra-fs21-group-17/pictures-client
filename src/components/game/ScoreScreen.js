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
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    async getUsers() {
        try {
            const response = await api.get('/users');

            // Get the returned users and update the state.
            this.setState({ users: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    convertCorrectedGuessesToMap(correctedGuesses){
        let tempUsername = "";
        let tempCoordinates = "";
        let result = [];

        for(let i = 0; i < correctedGuesses.length; i++){
            for(let j = 0; j < 1; j++){ // first letters is y/n for correct/incorrect guess
                tempCoordinates += correctedGuesses.charAt(i+j);
            }
            i++; // skip coordinates, goto username

            while(i < correctedGuesses.length-1 && correctedGuesses.charAt(i) !== '-'){
                tempUsername += correctedGuesses.charAt(i);
                i++;
            }
            result.push([tempUsername, tempCoordinates]);
            tempUsername = tempCoordinates = "";
        }

        return result;
    }

    render() {
        const temp = this.convertCorrectedGuessesToMap(localStorage.getItem("correctedGuesses"));
        const filledTableGuesses = temp.map( tuple =>{
                return(
                    <td>
                        <tr>{tuple[0]}</tr>
                        <tr>{tuple[1]}</tr>
                    </td>
                )
            }
        )

        // TODO points table
        const temp2 = this.convertCorrectedGuessesToMap(localStorage.getItem("correctedGuesses"));
        const filledTablePoints = temp.map( tuple =>{
                return(
                    <td>
                        <tr>{tuple[0]}</tr>
                        <tr>10</tr>
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
                    <Button
                        width="25%"
                        onClick={() => {
                            this.nextRound();
                        }}
                    >
                        Ok, next round!
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }

    async nextRound() {
        try {
            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/board`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }
}

export default withRouter(ScoreScreen);
