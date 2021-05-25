import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LobbyModel from "../shared/models/LobbyModel";

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
            lobbyId: null,
            lobbyIdInput: null,
            count: null,
        };
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUsername');
        localStorage.removeItem('id');
        localStorage.removeItem('currentRoomNumber');
        localStorage.removeItem('currentLobbyId');
        localStorage.removeItem('lobbyId');
        localStorage.removeItem('mySet');
        localStorage.removeItem('players');
        localStorage.removeItem('screenshot');
        localStorage.removeItem('correctedGuesses')
        localStorage.removeItem('thePoints')
        localStorage.removeItem('screenshot')



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

    async createLobby(){
        // try {
            const requestBody = JSON.stringify({
                lobbyId: localStorage.getItem('currentRoomNumber'),
            });
            const userReqBody = JSON.stringify({
                username: localStorage.getItem('currentUsername'),
            });
            //creates the new lobby in the backend if lobby with lobbyId don't exists
            const response = await api.post('/lobbies', requestBody)
            //adds the currentUser to the lobby
            await api.put('/lobbies/users/'+localStorage.getItem('currentRoomNumber'), userReqBody)

            // get the returned lobby and updates a new object
            const lobby = new LobbyModel(response.data);

            //Store the lobbyId into the local storage.
            localStorage.setItem('currentLobbyId', lobby.lobbyId);


            this.props.history.push('/lobbies/' + lobby.lobbyId);
       // }
        //catch (error) {
            //alert(`Something went wrong getting the Lobby: \n${handleError(error)}`);
       // }


    }

    async joinLobby(){
        try {
            const userReqBody = JSON.stringify({
                username: localStorage.getItem('currentUsername')
            });

            localStorage.setItem('currentLobbyId', this.state.lobbyIdInput)

            //adds the currentUser to the lobby
            await api.put('/lobbies/' + localStorage.getItem('currentLobbyId') + '/users');

            await api.put('/lobbies/users/' + localStorage.getItem('currentLobbyId'), userReqBody);


            localStorage.setItem('currentRoomNumber', localStorage.getItem('currentLobbyId'));

            this.props.history.push('/lobbies/' + localStorage.getItem('currentLobbyId'));
        }catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        try {
            //const respons = await api.get('/users');
            const response = await api.get('/users/'+localStorage.getItem('currentUsername'));
            const createRoomNumber= this.randomRoomNumber(4);


            // Get the returned users and update the state.
            this.setState({ users: response.data });

            if (this.state.lobbyId !== null){
                localStorage.setItem('currentRoomNumber', this.state.lobbyId)
            }else{
                this.setState({roomNumber: createRoomNumber});
                localStorage.setItem('currentRoomNumber', createRoomNumber)
            }


        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {

        return (
            <Container>
                <h1 style={{fontSize:"50px"}}>PICTURES</h1>
                <h2 style={{fontSize:"30px"}}>HOME</h2>
                <p style={{fontSize:"20px"}}>Logged in as:</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users style={{fontSize:"25px"}}>
                            <PlayerContainer>
                                <Player
                                    style={{fontSize:"25px"}}
                                    user={this.state.users}
                                    hidden={localStorage.getItem('currentUsername') !== this.state.users.username}
                                />
                            </PlayerContainer>

                        </Users>
                        <InputField
                            id="edit"
                            style={{visibility: "visible"}}
                            placeholder="Enter Code to Join Game"
                            onChange={e => {
                                this.handleInputChange('lobbyIdInput', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                width="70%"
                                disabled={!this.state.lobbyIdInput}
                                onClick={() => {
                                    this.joinLobby();

                                }}
                            >
                                Join Game
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="70%"
                                onClick={() => {
                                    this.createLobby();
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
