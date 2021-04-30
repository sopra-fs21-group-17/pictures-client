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

    render() {
        return (
            <Container>
                <h2>SCORE OVERVIEW</h2>

                <table>
                    <tr>
                        <td>POINTS</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>USER 1</td>
                        <td>USER 2</td>
                        <td>USER 3</td>
                        <td>USER 4</td>
                        <td>USER 5</td>
                    </tr>
                    <tr>
                        <td>ROUND 1</td>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                    </tr>
                </table>

                <p></p>

                <table>
                    <tr>
                        <td>CORRECT</td>
                        <td>GUESSES</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>USER 1</td>
                        <td>USER 2</td>
                        <td>USER 3</td>
                        <td>USER 4</td>
                        <td>USER 5</td>
                    </tr>
                    <tr>
                        <td>USER 1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>USER 2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>USER 3</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>USER 4</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>USER 5</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <Button
                    width="100%"
                    onClick={() => {
                        this.nextRound();
                    }}
                >
                    Ok, next round!
                </Button>
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
