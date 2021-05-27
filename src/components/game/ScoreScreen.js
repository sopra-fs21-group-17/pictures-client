import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Button1 = styled(Button)`
  background: green  
  `;

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

const StyledTd = styled.td`
    padding: 15px;
    border: 4px solid #000;
    border-collapse: collapse;
`;

const StyledTr = styled.tr`
    border: 1px solid #000;
    border-collapse: collapse;
`;

const StyledTable = styled.table`
    background: #F8F8FF;
    color: #000;
    align: right;
    width: 50%;
    margin: auto;
    border: 1px solid #000;
    border-collapse: collapse;
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

    getRoundInformation = async () => {
         try {
             if(this.state.playersFinished && this.state.buttonPressed){
                 this.props.history.push(`/board`);
             }

             const response = await api.get("/rounds/" + localStorage.getItem("currentLobbyId"))
             this.setState({rounds: response.data.rounds})


             //makes the boolean --> the boolean will only return true once all players have finished the round (pressed the button)
            if(response.data["numberOfPlayers"] < 3){
                this.exitGame().then()
            }

             const checkPlayersFinished = response.data["numberOfPlayers"] <= response.data["allUsersFinishedRound"]
             this.setState({playersFinished: checkPlayersFinished})


             console.log(response.data.rounds)
             console.log(response.data["allUsersFinishedRound"])
             console.log(response.data["numberOfPlayers"])
             console.log("All players finished:" + checkPlayersFinished)
             console.log("Button was pressed:" + this.state.buttonPressed)
             localStorage.setItem("currentNoOfUsers",response.data["numberOfPlayers"])
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

    exitGame = async () => {
        try {
            await api.delete("/players/" + localStorage.getItem("currentLobbyId") + "/" + localStorage.getItem("id"));

            this.setState({buttonPressed: true})
            this.setState({playersFinished: true})
            localStorage.removeItem('currentLobbyId');
            this.props.history.push("/home")
        } catch (error) {
            alert(`Something went wrong during the preparation of next Round: \n${handleError(error)}`);
        }
    }

    buttonHandler(){
        return(this.state.rounds < this.state.max_rounds ? (this.state.buttonPressed == false? (<Button
            width="25%"

            onClick={() =>
                ( this.nextRound(),
                        this.setState({buttonPressed:true})
                )
            }
        >
            Ok, next round!
        </Button>):<Button1
            width="25%"
            disabled={true}>Ok, next round!</Button1>):(""))
    }

    convertCorrectedGuessesToMap(correctedGuesses) {

        let tempUsername = ""
        let tempCoordinates = ""
        let result = []

        for (let i = 0; i < correctedGuesses.length; i++) {
            for (let j = 0; j < 1; j++) {
                // first letters is y/n for correct/incorrect guess
                //tempCoordinates += correctedGuesses.charAt(i+j);
                if(correctedGuesses.charAt(i+j) === "y"){
                    tempCoordinates = "✔"
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

    getPointsArray(x){
        let result = []
        for(let i = 0; i < x.length; i++){
            if(i % 2 === 0){
                result.push([x[i],x[i+1]])
            }
        }
        return result
    }

    render() {

        // fill in corrected guesses table
        const temp = this.convertCorrectedGuessesToMap(localStorage.getItem("correctedGuesses"));
        const guessesNames = temp.map(tuple => {
                return (
                    <StyledTd>{tuple[0]}</StyledTd>
                )
            })
        const guessesCorrected = temp.map(tuple => {
                return (
                    <StyledTd>{tuple[1]}</StyledTd>
                )
            })

        // fill in points table
        let input = this.getPointsArray(JSON.parse((localStorage.getItem("thePoints"))))
        if(input === null){ input = ["error","error"]}
        const playerNames = input.map(tuple =>{
            return(
                <StyledTd>{tuple[0]}</StyledTd>
            )
        })
        const playerPoints = input.map(tuple =>{
            return(
                <StyledTd>{tuple[1]}</StyledTd>
            )
        })

        return (
            <Container>
                <h2>SCORE OVERVIEW</h2>

                <p>Points overview:</p>
                <StyledTable align={"center"}>
                    <StyledTr>{playerNames}</StyledTr>
                    <StyledTr>{playerPoints}</StyledTr>
                </StyledTable>

                <p>Your guesses:</p>
                <StyledTable align={"center"}>
                    <StyledTr>{guessesNames}</StyledTr>
                    <StyledTr>{guessesCorrected}</StyledTr>
                </StyledTable>

                <ButtonContainer>
                    {this.buttonHandler()}
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
