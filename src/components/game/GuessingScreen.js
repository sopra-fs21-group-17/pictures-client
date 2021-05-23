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

const StyledTableReady = styled.table`
    background: rgba(1, 1, 1, 0.1);
    color: #000;
    align: right;
    margin: auto;
    border-collapse: collapse;
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
  margin-left: auto;
  font-weight: bold;
  background: rgba(80, 190, 80, 1);
  border-radius: 100%;
  padding: 7px;
  font-size: 20px;
  width: 40px;
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
            guessesAsString: "",
            responseRoom: null,
            count: 60.0,
            allDoneGuessing: null
        }
        this.getScreenshots()
    };

    // GET REQUEST "/screenshots"
    async getScreenshots(){
        try {
            //const response = await api.get('/screenshots/'+localStorage.getItem("currentLobbyId"));
            //await new Promise(resolve => setTimeout(resolve, 1000));

            // new refresh every 100 ms
            setInterval(async () =>{
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
            }, 100)
            //

            // // extract all names+urls from response except the one of the current user
            // let namesAndScsURLs = [] // format: [["username","URL"],["username2"],[URL2]]
            // for(let e in response.data){
            //     // response_array[i][0] = username
            //     if(response.data[e][0] !== localStorage.getItem('currentUsername')) {
            //         namesAndScsURLs.push([response.data[e][0], response.data[e][1]])
            //     }
            // }

            // // Get the returned screenshots and update the state.
            // this.setState({ scsURLsAndUserNames: namesAndScsURLs });

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
            const requestBody = JSON.stringify({
                username: localStorage.getItem("currentUsername"),
                guesses: guessesAsString
            })
            const response = api.post("/guesses/"+localStorage.getItem("currentLobbyId"), requestBody);
            localStorage.setItem("correctedGuesses", (await response).data);
        } catch(error) {
            alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        }
    }

    async doneGuessing(){
        try{
            await api.put('/users/doneGuessing/'+ localStorage.getItem('currentUsername'))

            // update current players
            const response = await api.get("/board/"+localStorage.getItem("currentLobbyId"));
            const stringyfiedPlayers = JSON.stringify(response.data);
            localStorage.setItem("players", stringyfiedPlayers);
        }
        catch(error){
            alert(`Something went wrong while calling "done guessing": \n${handleError(error)}`);
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
        this.setState({...this.state,guesses: {...this.state.guesses,[user]:value}})
    }

    // get corrected guesses and points
    async showScoreScreen() {
        try{
            const response = await api.get('/score/'+localStorage.getItem("currentLobbyId"));
            // punkte auslesen
            let thePoints = [];
            let temp = []
            const data = response.data
            let nrOfPlayers = JSON.parse((localStorage.getItem("players"))).length
            for (var i = 0; i < nrOfPlayers*2; i++) {
                temp = [data[i],data[i++]]
                thePoints.push(temp)
            }
            localStorage.setItem("thePoints", JSON.stringify(thePoints));
        } catch(error) {
            alert(`Something went wrong while receiving the points: \n${handleError(error)}`);
        }

        this.props.history.push(`/scoreScreen`);
    }

    timeOver(){
        this.sendUserGuesses()
        //this.createGuessingInfo();
        this.showScoreScreen()
    }

    async componentWillMount(){
        //await api.put('/guessing/time/'+localStorage.getItem('currentLobbyId'));
        await this.getScreenshots()
    }

    async componentDidMount(){
        try{
            setInterval(async () =>{
                const response = await api.get('/game/checkUsersDoneGuessing/'+localStorage.getItem('currentLobbyId'));
                this.setState({ allDoneGuessing: response.data })

                // update info of all players doneGuessing attribute
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
        const filledTableRows = this.state.scsURLsAndUserNames.map( tuple =>{
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
        )

        let nothing = 1 // needed as filler for if-condition...
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
                {/*    {(this.state.count + buildRoom.timeDifferenceGuessing) <= 0 ?(this.timeOver()):(<h2>Time left: {('0'+Math.round(this.state.count + buildRoom.timeDifferenceGuessing)).slice(-2)}</h2>*/}
                {/*)}*/}

                    {/*Table displaying the players screenshots and input fields for guess*/}
                    <StyledTable>
                        <StyledTr>
                            <StyledTd>for testing: username</StyledTd>
                            <StyledTd>What the other players built:</StyledTd>
                            <StyledTd>Coordinates of original picture:</StyledTd>
                        </StyledTr>
                        {this.state.scsURLsAndUserNames.map( tuple =>{
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
                        )}
                    </StyledTable>
                    <Button1
                        width="25%"
                        onClick={() => {
                            this.sendUserGuesses()
                            this.doneGuessing()
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
                    {(this.state.allDoneGuessing) ?
                        (this.showScoreScreen()):(nothing = 0)}
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
                                        <StyledTd width={"25%"}>{tuple["username"]}</StyledTd>
                                        <StyledTd width={"25%"}>{tuple["doneGuessing"] === true ?
                                            (<Ready>✔</Ready>) : (<NotReady>✘</NotReady>) }
                                        </StyledTd>
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
