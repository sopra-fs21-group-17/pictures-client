import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import LobbyModel from "../shared/models/LobbyModel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Button} from "../../views/design/Button";

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
  margin-top = 5px;
  margin-bottom = 20px;
  font-size = large;
`;


class Lobby extends React.Component {

    constructor() {
        super();
        this.state = {
            users: null,
            loggedUser: null,
            responseLobby: null,
            count: 99.0,
            copied: false,
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

     async backToHome() {
        try {
            await api.put('/lobby/' + localStorage.getItem('currentUsername') +"/"+ localStorage.getItem('currentRoomNumber'));
        } catch (error) {
            alert(`Something went wrong while calling "backTOHome()": \n${handleError(error)}`);
        }
        localStorage.removeItem('lobbyId');
        this.props.history.push("/home")
    }
    copied(){
        this.setState({copied: true}, () =>{
            setTimeout(() =>{
                this.setState({copied: false})
            },2000)
            }
        )
    }

    async componentDidMount(){

        try {
            const response = await api.get('/users/'+localStorage.getItem('currentUsername'));
            this.setState({ loggedUser: response.data });

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
                <h2 style={{color: "white", fontWeight:"bold", fontSize: "60px", margin: "5px", justifyContent: "center"}}>
                    {lobby.lobbyId}
                </h2>
                <CopyToClipboard text={lobby.lobbyId}>
                    <ButtonContainer>
                        <Button style={{background: "rgba(130, 130, 130, 1)"}}
                                onClick={() => {
                                    this.copied()}}
                        >Copy Lobby Code
                        </Button>
                    </ButtonContainer>
                </CopyToClipboard>
                <h6 hidden={this.state.copied === false}
                    style={{margin:"1.5px", position: "fixed", left:"760px", top:"170px"}}
                >Copied!</h6>
                {((this.state.count + lobby.timeDifference) <= 0.0 && lobby.lobbyReady) || lobby.lobbyReady? (
                    localStorage.setItem("numberOfUsers",this.state.users.length),
                    this.props.history.push("/board")
                ):( this.state.count + lobby.timeDifference <= 0.0 ?( this.backToHome()):
                    (<Countdown style={{position:"relative", left: "0%", top:"-5px", color:"white", justifyContent:"center", fontSize: "100px", fontWeight:"bold"}}>
                        <span style={{fontSize: "35px", color: "rgba(170, 170, 170, 1)", marginTop: "0px"}}>Countdown: </span><br></br>
                        {('0' + parseFloat(this.state.count + lobby.timeDifference).toFixed(0)).slice(-2)}</Countdown>))}
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div >

                        <Users style={{padding:"10px", background: "rgba(100, 100, 100, 1)",borderRadius: "10%", position:"fixed", left: "3%", top:"30%", width:"220px" }}>
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

                                id="edit2"
                                hidden ={this.state.loggedUser.username === localStorage.getItem('currentUsername') && this.state.loggedUser.isReady === true}
                                style={{ position:"relative", left:"25%", top: "150px", background:"rgba(130, 130, 130, 1)"}}
                                width="10%"
                                onClick={() =>{
                                    this.backToHome()
                                    this.props.history.push("/")
                                }}> Leave</Button1>
                            <Button1

                                id="edit"
                                hidden ={this.state.loggedUser.username === localStorage.getItem('currentUsername') && this.state.loggedUser.isReady === true}
                                style={{position: "relative", left: "30%", top: "150px"}}
                                width="10%"
                                onClick={() => {
                                    this.ready();
                                }}
                            >
                                Ready
                            </Button1>

                        </ButtonContainer>

                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Lobby);
