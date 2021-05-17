// temporary file to simulate GuessingScreen for development
// TODO change "pictureElement" to user element (create new class for this?)
import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import PictureGrid from "./PictureGrid";


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  width: 50px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const UserBar = styled.div`
display: flex;
flex-direction: row;
width: 20%;
height: 600px;
background: pink;
margin: 15px;
border-radius: 5px;
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

const StyledImg = styled.img`
    color: red;
    width: 60%;
`;

const StyledTd = styled.td`
`;

const StyledTr = styled.tr`
`;

const StyledTable = styled.table`
    align: left;
    width: 50%;
    margin: 10px;
`;

//TODO add Constraints for coordinate guessing like only able to input A-D and 1-4 : if possible in js use Regex
class GuessingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            screenshots: [],
            coordinateNames: [
                "A1", "A2", "A3", "A4",
                "B1", "B2", "B3", "B4",
                "C1", "C2", "C3", "C4",
                "D1", "D2", "D3", "D4"],
            guesses: {},
            guessesAsString: "",
        }
      //  this.getScreenshots();
    };

    // GET REQUEST "/screenshots"
    async getScreenshots(){
        try {
            const response = await api.get('/screenshots/'+localStorage.getItem("lobbyId"));
            await new Promise(resolve => setTimeout(resolve, 1000));

            // remove screenshot of current user
            for(let e in response.data){
                // response_array[i][0] = username
                if(response.data[e][0] === this.state.username) {
                    response.data.splice(e, 1);
                }
            }

            // Get the returned screenshots and update the state.
            this.setState({ screenshots: response.data });
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

    saveGuessToDict(user, value) {
        this.setState({...this.state,
            guesses: {...this.state.guesses,[user]:value}})
        //localStorage.setItem(user,value);
        //console.log(this.state.guesses);
    }

    // get corrected guesses and points
    async showScoreScreen() {
        //localStorage.setItem("lobbyId", "test"); // für testzwecke
        try{
            const response = await api.get('/score/'+localStorage.getItem("lobbyId"));

            // punkte auslesen
            let thePoints = {};
            for(const [username, attribute] of Object.entries(response.data)){
                thePoints[username] = attribute["points"];
            }
            localStorage.setItem("thePoints", JSON.stringify(thePoints));

        } catch(error) {
            alert(`Something went wrong while recieving the guesses and points: \n${handleError(error)}`);
        }

        this.props.history.push(`/scoreScreen`);
    }

    createGuessingInfo(){
        let result = [];
        const parsedPlayers = JSON.parse(localStorage.getItem("players"));

        for(const [key, val] of Object.entries(parsedPlayers)){
            if(val.username !== localStorage.getItem('currentUsername')){
                result.push([val.username, val.assignedCoordinates]);
                // result["username"] = val.username;
                // result["assignedCoordinates"] = val.assignedCoordinates;
            }
        }

        return result;
    }
    // TODO call screenshot getter here with await
    async componentWillMount(){
       await this.getScreenshots()
    }

    render() {
        const infos = this.createGuessingInfo();
        const filledTableRows = infos.map( tuple =>{
                return(
                    <StyledTr>
                        {/*<StyledTd width={"25%"}><StyledImg src={tuple["1"]}/></StyledTd>*/}
                        <StyledTd width={"25%"}>{this.state.coordinateNames[tuple[1]]}</StyledTd>
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
                <div align={"center"}>
                    <h2>Which picture were the other players trying to build?</h2>
                    <h3>Make your guesses</h3>
                    <StyledTable>
                        <StyledTr>
                            <StyledTd>What the other players built:</StyledTd>
                            <StyledTd>Coordinates of original picture:</StyledTd>
                        </StyledTr>
                        {filledTableRows}
                    </StyledTable>

                    <Button
                        width="25%"
                        onClick={() => {
                            this.sendUserGuesses();
                            this.createGuessingInfo();
                        }}
                    >
                        My guesses are done!
                    </Button>

                    <Button
                        width="25%"
                        onClick={() => {
                            this.showScoreScreen();
                        }}
                    >
                        DEV: "Guessing is done!"
                    </Button>
                </div>

                <PictureGrid></PictureGrid>

            </Container>
        );
    }
}

export default withRouter(GuessingScreen);
