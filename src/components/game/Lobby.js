  ///////////////////////////////////////////////////////
 // temporary file to simulate lobby for development //
/////////////////////////////////////////////////////

import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import User from '../shared/models/User';

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

class Lobby extends React.Component {
    constructor(props) {
        //User testUser1 = new User("id = 1, name = fritzli") // TODO add test users

        super(props);
        this.state = {
            usersList: [["olstra"],
                        ["jukosta"],
                        ["dkajin"],
                        ["lakicv"],
                        ["xinox2000"]
            ]
        };
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');

            // Get the returned users and update the state.
            this.setState({ users: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    async startGame() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                name: this.state.name
            });
            //const response = await api.post(`/game/${this.state.usersList}`, requestBody);  // init game

            const nrOfUsers = 5;


            // for(let i = 0; i < nrOfUsers; i++){
            //      // if this state id = response[i] id
            //      // TODO save set nr and coordinates to local storage
            //     this.state.usersList[i] = response[i].username;
            // }

            // store current user list in local storage
            localStorage.setItem('users-list', this.state.usersList);

            // für Testzwecke
            localStorage.setItem('mySet', "icon cards");
            localStorage.setItem('myCoordinates', "A1");

            // after init game show main board
            this.props.history.push(`/board`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <h2>Lobby</h2>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.startGame();
                            }}
                        >
                            lobby is ready, take me to game!
                        </Button>
                    </div>
                )}
            </Container>
        );
    }


}

export default withRouter(Lobby);
