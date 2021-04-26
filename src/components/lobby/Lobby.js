import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Registration from "../registration/Registration";

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
  transition: all 0.3s ease;
`;

const Countdown = styled.h1`
  margin-top = 10px;
  margin-bottom = 20px;
  font-size = 100px;
`;

// let countdownTime = 20;
// let timePassed = 0;
// let timeLeft = countdownTime;
//
// let countDownInterval = null;
//
// function countDownFormat(time){
//     let seconds = time % 60;
//     return `${seconds}`;
// }

// function makeCountdown(){
//     countDownInterval = setInterval(() => {
//         timePassed += 1;
//         timeLeft = countdownTime - timePassed;
//
//         document.getElementById("countdown") = formatTime
//     }, 1000);
// }




class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            count: 10,
        };
    }



    async ready(){
        const requestBodyPut = JSON.stringify({
            username: null,
        });
        await api.put('/users/'+ localStorage.getItem('currentUsername'), requestBodyPut)
        //this.forceUpdate();
        const responsed = await api.get('/users');

        window.location.reload(false);


    }



     async componentDidMount(){
         // async function getUsers() {
         //     const response = await api.get('/users');
         //     this.setState({users: response.data});

           // }

        try {




            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            //await new Promise(resolve => setTimeout(resolve, 1000));
            this.countdownIntervall= setInterval(() =>{
                this.setState({ count: this.state.count - 1})}, 1000);
            this.setState({users: response.data})

            //  this.responseInterval = setInterval(() =>{
            //     const response = await api.get('/users');
            //     this.setState({users: response.data});
            // };

            //this.setState({users: response.data})

            // Get the returned users and update the state.
            // this.usersInterval = setInterval(() =>{
            //     this.setState({ users: getUsers().response.data })}, 5000)


            // This is just some data for you to see what is available.
            // Feel free to remove it.
            // console.log('request to:', response.request.responseURL);
            // console.log('status code:', response.status);
            // console.log('status text:', response.statusText);
            // console.log('requested data:', response.data);
            //
            // // See here to get more data.
            // console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render(){
        const usersInLobby = this.state.users
        //const numberOfUsers = usersInLobby.length
        let usersReady = 0

        // {this.state.count === 0 && numberOfUsers >= 3 ? (
        //     this.props.history.push("/game")):(this.state.count !== 0 && numberOfUsers >=3 ? ()


        return (

            <Container>
                <h1>Lobby</h1>


                <h2>Countdown: </h2>
                {this.state.count === 0 ? (
                    this.props.history.push("/game")):(
                <Countdown style={{color:"black"}}>{this.state.count}</Countdown>)}
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>

                        <Users style={{position:"absolute", left: "10%", top:"30%" }}>
                            Players in Lobby:
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <Players>
                                            <UserName>{user.username}</UserName>
                                            {!user.isReady === true ? (
                                                <NotReady>✘</NotReady>) : (<Ready>✔</Ready>) }
                                        </Players>
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <ButtonContainer>
                            <Button1

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
