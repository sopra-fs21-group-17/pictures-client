import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import LobbyModel from "../shared/models/LobbyModel";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
`;

const Players = styled.div`
  margin: 6px 0;
  width: 200px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: none;`

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  font-weight: bold;
  font-size: 17px;
`;


const NotReady = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
  background: rgba(190, 80, 80, 1);
  border-radius: 100%;
  padding: 7px;
  font-size: 20px;
  width: 40px;
`;

const Ready = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
  background: rgba(80, 190, 80, 1);
  border-radius: 100%;
  padding: 7px;
  font-size: 20px;
  width: 40px;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top:10px;
  
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


const Button1 = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 17px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgba(110, 190, 110, 1);
  transition: all 0.0s ease;
`;

const Countdown = styled.div`
  margin-top = 10px;
  margin-bottom = 20px;
  font-size = large;
`;


class Lobby extends React.Component {

    constructor() {
        super();
        this.state = {
            users: null,
            responseLobby: null,
            count: 100.0,
        };
    }

    async ready(){
        try{
            const requestBodyPut = JSON.stringify({
                username: null,
            });
            await api.put('/users/'+ localStorage.getItem('currentUsername'), requestBodyPut)

            document.getElementById("edit").style.cssText="visibility: hidden";
            document.getElementById("edit2").style.cssText="visibility: hidden";

        } catch (error) {
            alert(`Something went wrong while calling "ready()": \n${handleError(error)}`);
        }
    }

     backToHome() {
        try {
            //await api.put('/lobby/' + localStorage.getItem('currentUsername') +"/"+ localStorage.getItem('currentRoomNumber'));
        } catch (error) {
            alert(`Something went wrong while calling "backTOHome()": \n${handleError(error)}`);
        }
        localStorage.removeItem('lobbyId');
        this.props.history.push("/home")
    }

    async componentDidMount(){

        try {
            this.usersInterval = setInterval(async () =>{
                 const response = await api.get('/lobbies/users/'+localStorage.getItem('currentLobbyId'));
                 this.setState({users: response.data})}, 100)
            this.countInterval = setInterval(async () =>{
                await api.put('/lobbies/count/'+localStorage.getItem('currentLobbyId'))
            }, 100)
            this.checkInterval = setInterval(async () =>{
                const responseCheck = await api.get('/lobbies/ready/'+localStorage.getItem('currentLobbyId'));
                this.setState({responseLobby: responseCheck.data})}, 100)

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }


    render(){


        const lobby = new LobbyModel(this.state.responseLobby)


        return (


            <Container>
                <h1 style={{fontSize: "40px", color: "rgba(170, 170, 170, 1)", margin: "5px"}}>LOBBY CODE: </h1>
                <h2 style={{color: "white", fontWeight:"bold", fontSize: "60px", margin: "5px"}}>{lobby.lobbyId}</h2>

                <h2 style={{fontSize: "35px", color: "rgba(170, 170, 170, 1)", marginTop: "20px"}}>Countdown: </h2>
                {((this.state.count + lobby.timeDifference) <= 0.0 && lobby.lobbyReady) || lobby.lobbyReady? (
                    this.props.history.push("/board")
                ):( this.state.count + lobby.timeDifference <= 0.0 ?( this.backToHome()):
                    (<Countdown style={{position:"absolute", left: "46%", top:"30%", color:"white", fontSize: "100px", fontWeight:"bold"}}>{parseFloat(this.state.count + lobby.timeDifference).toFixed(0)}</Countdown>))}
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>

                        <Users style={{padding:"10px", background: "rgba(100, 100, 100, 1)",borderRadius: "10%", position:"absolute", left: "10%", top:"30%" }}>
                            <span style={{fontSize: "23px", fontWeight: "bold"}}> Players in Lobby:</span>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <Players>
                                            <UserName style={{fontSize: "19px"}}>{user.username}</UserName>
                                            {!user.isReady === true ? (
                                                <NotReady>✘</NotReady>) : (<Ready>✔</Ready>) }
                                        </Players>
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <ButtonContainer>
                            <Button1

                                id="edit"
                                style={{position:"absolute", left: "80%", top: "80%"}}
                                width="10%"
                                onClick={() => {
                                    this.ready();
                                }}
                            >
                                Ready
                            </Button1>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button1

                                id="edit2"
                                style={{position:"absolute", left:"65%", top:"80%", background:"rgba(130, 130, 130, 1)"}}
                                width="10%"
                                onClick={() =>{
                                    this.props.history.push("/")
                                }}> Leave</Button1>
                        </ButtonContainer>

                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Lobby);
