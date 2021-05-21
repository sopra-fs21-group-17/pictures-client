// temporary file to simulate GuessingScreen for development
// TODO change "pictureElement" to user element (create new class for this?)
import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import PictureGrid from "./PictureGrid";
import BuildRoom from "../shared/models/BuildRoom";


const Button1 = styled(Button)`
  background: green  
  `;

const InputField = styled.input`
  &::placeholder {
    color: #000;
  }
  height: 35px;
  width: 50px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: #C0C0C0;
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Container = styled(BaseContainer)`
  display: flex;
  color: white;
  text-align: center;
  flex-direction: row;
  min-width: 900px;
  margin: 5px;
`;

const StyledImg = styled.img`
    width: 80%;
    border: 1px solid #fff;
    border-collapse: collapse;
`;

const StyledTd = styled.td`
    padding: 15px;
    border: 1px solid #000;
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
    margin: auto;
    border: 1px solid #000;
    border-collapse: collapse;
`;



class GuessingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            scsURLsAndUserNames: [],
            coordinateNames: [
                "A1", "A2", "A3", "A4",
                "B1", "B2", "B3", "B4",
                "C1", "C2", "C3", "C4",
                "D1", "D2", "D3", "D4"],
            guesses: {},
            guessesAsString: "",
            responseRoom: null,
            count: 60.0,
        }
        this.getScreenshots();
    };


    // GET REQUEST "/screenshots"
    async getScreenshots(){
        try {
            const response = await api.get('/screenshots/'+localStorage.getItem("currentLobbyId"));
            await new Promise(resolve => setTimeout(resolve, 1000));

            // extract all names+urls from response except the one of the current user
            let namesAndScsURLs = [] // format: [["username","URL"],["username2"],[URL2]]
            for(let e in response.data){
                // response_array[i][0] = username
                if(response.data[e][0] !== localStorage.getItem('currentUsername')) {
                    namesAndScsURLs.push([response.data[e][0], response.data[e][1]])
                }
            }

            // Get the returned screenshots and update the state.
            this.setState({ scsURLsAndUserNames: namesAndScsURLs });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    convertGuessesToString(dict){
        let mergedGuesses = "";
        for(const [username, coordinate] of Object.entries(dict)){
            mergedGuesses += coordinate + username;
            mergedGuesses += "-"; // guesses voneinander trennen
        }

        return mergedGuesses;
    }

    // PUT REQUEST
    async sendUserGuesses(){
        try{
            let temp = this.convertGuessesToString(this.state.guesses);
            const requestBody = JSON.stringify({
                username: localStorage.getItem("currentUsername"),
                guesses: temp
            })
            const response = api.post("/guesses/"+localStorage.getItem("currentLobbyId"), requestBody);
            localStorage.setItem("correctedGuesses", (await response).data);
        } catch(error) {
            alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        }
    }

    //needed for endRound handling
    async resetRoundHandle(){
        try{
            await api.put("/rounds/"+localStorage.getItem("currentLobbyId"))
        } catch (error) {
            alert(`Something went wrong resetting the round handle: \n${handleError(error)}`)
        }
    }

    saveGuessToDict(user, value) {
        this.setState({...this.state,
            guesses: {...this.state.guesses,[user]:value}})
    }

    // get corrected guesses and points
    async showScoreScreen() {
        try{
            const response = await api.get('/score/'+localStorage.getItem("currentLobbyId"));

            // punkte auslesen
            let thePoints = {};
            for(const [username, attribute] of Object.entries(response.data)){
                thePoints[username] = attribute["points"];
            }
            localStorage.setItem("thePoints", JSON.stringify(thePoints));

        } catch(error) {
            alert(`Something went wrong while receiving the guesses and points: \n${handleError(error)}`);
        }

        this.props.history.push(`/scoreScreen`);
    }

    async componentDidMount(){
        await this.resetRoundHandle()
    }

    render() {
        const buildRoom = new BuildRoom(this.state.responseRoom)
        const filledTableRows = this.state.scsURLsAndUserNames.map( tuple =>{
                return(
                    <StyledTr>
                        {/*for dev use, after remove tuple[0] which displays username...*/}
                        <StyledTd width={"25%"}>{tuple[0]}</StyledTd>
                        <StyledTd width={"25%"}>{<StyledImg src={tuple[1]}/>}</StyledTd>
                        <StyledTd width={"25%"}>
                            <InputField
                                placeholder="A1"
                                onChange={e => {
                                    this.saveGuessToDict(tuple[0], e.target.value);
                                }}
                            />
                        </StyledTd>
                    </StyledTr>
                )
            }
        )

        return (
            <Container>
            <div>
                <h1>Which picture were the other players trying to build?</h1>
                <PictureGrid/>
            </div>
                <div>
                    <h2>Make your guesses:</h2>
                    {(this.state.count + buildRoom.timeDifferenceGuessing) <= 0 ?(this.timeOver()):(<h2>Time left: {('0'+Math.round(this.state.count + buildRoom.timeDifferenceGuessing)).slice(-2)}</h2>
                )}
                    <StyledTable>
                        <StyledTr>
                            <StyledTd>for testing: username</StyledTd>
                            <StyledTd>What the other players built:</StyledTd>
                            <StyledTd>Coordinates of original picture:</StyledTd>
                        </StyledTr>
                        {filledTableRows}
                    </StyledTable>
                    <Button1
                        width="25%"
                        onClick={() => {
                            this.sendUserGuesses();
                        }}
                    >
                        My guesses are done!
                    </Button1>
                    <Button
                        width="25%"
                        onClick={() => {
                            this.showScoreScreen();
                        }}
                    >
                        DEV: "Guessing is done!"
                    </Button>
                </div>
            </Container>
        );
    }

}

export default withRouter(GuessingScreen);
