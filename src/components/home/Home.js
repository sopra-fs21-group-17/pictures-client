import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Header from "../../views/Header";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(230, 230, 230, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  background: rgba(230, 230, 230, 0.2);
  color: white;
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
  margin-top: 15px;
`;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            roomNumber: null,
        };
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUsername');
        this.props.history.push('/login');
    }
    randomRoomNumber(length){
        let validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let roomNumber = '';
        let lengthValidCharacters = validCharacters.length;
        for (let i = 0; i < length; i++){
            roomNumber += validCharacters.charAt(Math.floor(Math.random() * lengthValidCharacters));
        }
        return roomNumber

    }
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        try {
            const respons = await api.get('/users');
            const response = await api.get('/users/'+localStorage.getItem('currentUsername'));
            const createRoomNumber= this.randomRoomNumber(4);
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });
            if (this.state.roomNumber !== null){
                localStorage.setItem('currentRoomNumber', this.state.roomNumber)
            }else{
                this.setState({roomNumber: createRoomNumber});
                localStorage.setItem('currentRoomNumber', createRoomNumber)
            }


            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {

        return (
            <Container>
                <h1>PICTURES</h1>
                <h2>HOME</h2>
                <p>Logged in as:</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {/*{this.state.users.map(user => {*/}
                            {/*    return (*/}
                                    <PlayerContainer>
                                        <Player user={this.state.users}
                                        hidden={localStorage.getItem('currentUsername') !== this.state.users.username}/>
                                    </PlayerContainer>
                                {/*);*/}

                        </Users>
                        <InputField
                            id="edit"
                            style={{visibility: "visible"}}
                            placeholder="Enter Code to Join Game"
                            onChange={e => {
                                this.handleInputChange('roomCode', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                width="70%"
                                onClick={() => {
                                    this.props.history.push('/lobby');
                                }}
                            >
                                Join Game
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="70%"
                                onClick={() => {
                                    this.props.history.push('/lobby');
                                }}
                            >
                                Create Game
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="70%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                        </ButtonContainer>


                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Home);
