import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import PictureGrid from "./PictureGrid";
import BuildRoom from "../shared/models/BuildRoom";


const Button1 = styled(Button)`
  background: green;
  padding: 6px; 
  `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

const Container = styled(BaseContainer)`
  display: flex;
  color: white;
  text-align: center;
  flex-direction: row;
  min-width: 900px;
  margin: 5px;
`;

const StyledImg = styled.img`
    max-width:100%;
    height:auto;
    border: 1px solid #fff;
    border-collapse: collapse;
`;

const StyledTd = styled.td`
    padding: 15px;
    border: 1px solid #000;
    border-collapse: collapse;
`;

const StyledTdReady = styled.td`
    padding: 15px;
    border-collapse: collapse;
`;

const StyledTr = styled.tr`
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

const StyledTableReady = styled.table`
    background: rgba(1, 1, 1, 0.1);
    color: #000;
    align: right;
    margin: auto;
    border-collapse: collapse;    
    border: 1px solid rgba(1, 1, 1, 0.1);
`;

const NotReady = styled.div`
  margin: auto;
  font-weight: bold;
  background: rgba(190, 80, 80, 1);
  border-radius: 100%;
  padding: 7px;
  font-size: 20px;
  width: 40px;
`;

const Ready = styled.div`
  margin: auto;
  font-weight: bold;
  background: rgba(80, 190, 80, 1);
  border-radius: 100%;
  padding: 7px;
  font-size: 20px;
  width: 40px;
`;

const StyledP = styled.p`
  color: red;
  background: rgba(1, 1, 1, 0.25);
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
            players: [],
            isDoneGuessing: false,
            guessesAsString: "",
            responseRoom: null,
            count: 60.0,
            allDoneGuessing: false, // default value
            wrongInput: false
        }
    }

    // GET REQUEST "/screenshots"
    async getScreenshots(){
        try {
            // fetch screenshots every 100 ms
            //setInterval(async () =>{
                const response = await api.get('/screenshots/'+localStorage.getItem("currentLobbyId"));

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
            //}, 100)

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
        // send this user's guesses to BE
        try{
            let guessesAsString = this.convertGuessesToString(this.state.guesses);
            console.log("mysubmitted guesses: ",guessesAsString)
            const requestBody = JSON.stringify({
                username: localStorage.getItem("currentUsername"),
                guesses: guessesAsString
            })
            const response = await api.post("/guesses/"+localStorage.getItem("currentLobbyId"), requestBody);
            localStorage.setItem("correctedGuesses", response.data);
            this.setState({isDoneGuessing: true});
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
        // regex input validation for guesses
        if(value.match("[A-Da-d]{1}[1-4]{1}") != null){
            this.setState({...this.state,guesses: {...this.state.guesses,[user]:value}})
            this.setState({wrongInput: false})
        }
        else{ this.setState({wrongInput: true})}
    }

    // get corrected guesses and points
    async showScoreScreen() {
        try{
            const response = await api.get('/score/'+localStorage.getItem("currentLobbyId"));
            // punkte auslesen
            let thePoints = []
            const data = response.data
            for(let i in data[0]) {
                thePoints.push(data[0][i])
            }
            localStorage.setItem("thePoints", JSON.stringify(thePoints));
        } catch(error) {
            alert(`Something went wrong while receiving the points: \n${handleError(error)}`);
        }
        this.props.history.push(`/scoreScreen`);
    }

    timeOver(){
        this.sendUserGuesses()
        this.showScoreScreen()
    }

    async componentWillMount(){
        await api.put('/guessing/time/'+localStorage.getItem('currentLobbyId'));
        await this.getScreenshots()
    }

    async componentDidMount(){
        this.countInterval = setInterval(async () =>{
            await api.put('/guessing/count/'+localStorage.getItem('currentLobbyId'))},100)
        this.checkInterval = setInterval(async () =>{
            const responseCheck = await api.get('/buildRooms/'+localStorage.getItem('currentLobbyId'));
            this.setState({responseRoom: responseCheck.data})}, 100)

        await this.fetchChecks()

    }

    componentWillUnmount() {
        //clear intervals
        if(this.countInterval) clearInterval(this.countInterval);
        if(this.checkInterval) clearInterval(this.checkInterval);
        if(this.guessingInterval) clearInterval(this.guessingInterval);
        if(this.doneGuessingInterval) clearInterval(this.doneGuessingInterval);
    }

    async fetchChecks(){
        try{
            // check if ALL users have submitted their guesses
            const guessingInterval = setInterval(async () =>{
                const response = await api.get('/game/checkUsersDoneGuessing/'+localStorage.getItem('currentLobbyId'));

                this.setState({ allDoneGuessing: response.data });

                if(this.state.allDoneGuessing){ await this.showScoreScreen() }
            }, 100)

            // update info of all players doneGuessing attribute (true/false)
            const doneGuessingInterval = setInterval(async () =>{
                const response2 = await api.get("/board/"+localStorage.getItem("currentLobbyId"));
                this.setState({players: response2.data});
            }, 100)

            await this.resetRoundHandle()

        }catch (error) {
            alert(`Something went wrong checking "all users done guessing": \n${handleError(error)}`);
        }

    }

    render() {
        const buildRoom = new BuildRoom(this.state.responseRoom)
        this.state.scsURLsAndUserNames.forEach( tuple =>{
                return(
                    <StyledTr>
                        {/*for dev use, after comment out tuple[0] which displays username...*/}
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
        );

        let nothing = "" // needed as filler for if-condition...
        return (
            <Container>
                <Container>
                    <div>
                        <h1>Which picture were the other players trying to build?</h1>
                        <PictureGrid/>
                    </div>
                </Container>
                <div>
                    <h2>Make your guesses:</h2>
                    {(this.state.count + buildRoom.timeDifferenceGuessing) <= 0 ?(this.timeOver()):(<h2>Time left: {('0'+Math.round(this.state.count + buildRoom.timeDifferenceGuessing)).slice(-2)}</h2>
                )}
                    {/*Display error message if wrong input for guesses was given*/}
                    <p>Please type in your guesses into each box with the following format: "a1", "D4", etc.</p>
                    <p>Letters from A-D and numbers from 1-4.</p>
                    {(this.state.wrongInput) ? (<StyledP>! Please, use this format for your guesses: "A1", "d4" (A-D and 1-4).</StyledP>):(nothing)}
                    {/*Table displaying the players screenshots and input fields for guess*/}
                    <StyledTable>
                        <StyledTr>
                            {/*<StyledTd>for testing: username</StyledTd>*/}
                            <StyledTd>What the other players built:</StyledTd>
                            <StyledTd>Coordinates of original picture:</StyledTd>
                        </StyledTr>
                        {this.state.scsURLsAndUserNames.map( tuple =>{
                                return(
                                    <StyledTr>
                                        {/*for testing, after comment out tuple[0] which displays username...*/}
                                        {/*<StyledTd width={"25%"}>{tuple[0]}</StyledTd>*/}
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
                        )}
                    </StyledTable>
                    <ButtonContainer>
                        <Button1
                            width="25%"
                            disabled={this.state.isDoneGuessing || this.state.wrongInput}
                            onClick={() => {
                                this.sendUserGuesses()
                            }}
                        >
                            My guesses are done!
                        </Button1>
                    </ButtonContainer>
                    {/*for testing */}
                    {/*<Button*/}
                    {/*    width="25%"*/}
                    {/*    onClick={() => {*/}
                    {/*         this.showScoreScreen();*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    DEV: "Guessing is done!"*/}
                    {/*</Button>*/}

                    <Container>
                        {/*Table displaying which users have already submitted their guesses*/}
                        <StyledTableReady>
                            <StyledTr>
                                <StyledTd>The other players</StyledTd>
                                <StyledTd>Done guessing?</StyledTd>
                            </StyledTr>
                            {this.state.players.map( tuple =>{
                                    return(
                                        <StyledTr>
                                            <StyledTdReady width={"25%"}>{tuple["username"]}</StyledTdReady>
                                            <StyledTdReady width={"25%"}>{tuple["doneGuessing"] === true ?
                                                (<Ready>✔</Ready>) : (<NotReady>✘</NotReady>) }
                                            </StyledTdReady>
                                        </StyledTr>
                                    )
                                }
                            )}
                        </StyledTableReady>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default withRouter(GuessingScreen);
