// temporary file to simulate GuessingScreen for development
// TODO change "pictureElement" to user element (create new class for this?)
import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import PictureElement from "./PictureElement";
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
            players: null,
            username: "USER 1", // for test purposes
            screenshots: [],
            guesses: {},
            guessesAsString: ""
        }
        //this.getUsers();
        this.getScreenshots();
        };

    // GET REQUEST "/screenshots"
    async getScreenshots(){
        try {
            const response = await api.get('/screenshots');

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned screenshots and update the state.
            this.setState({ screenshots: response.data });
            console.log(this.state.screenshots);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    async getUsers() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // See here to get more data.
            //console.log(response);
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
        // let temp = this.convertGuessesToString(this.state.guesses)
        // try{
        //     const requestBody = JSON.stringify({
        //         username: this.state.username,
        //         guesses: temp
        //     })
        //     //console.log(this.state.guesses);
        //     await api.put("/guesses", requestBody);
        // } catch(error) {
        //     alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        // }

        let temp = this.convertGuessesToString(this.state.guesses)
        try{
            const requestBody = JSON.stringify({
                username: this.state.username,
                guesses: temp
            })
            //console.log(this.state.guesses);
            const response = api.post("/guesses", requestBody);
            localStorage.setItem("correctedGuesses", (await response).data)
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

    async showScoreScreen() {
        // TODO get not returning anything at the moment
        // // get corrected guesses
        // try{
        //     const response = await api.get('/correctedGuesses');
        //     console.log(response.data);
        // } catch(error) {
        //     alert(`Something went wrong while sending the guesses: \n${handleError(error)}`);
        // }

        this.props.history.push(`/scoreScreen`);
    }

    render() {
        const filledTableRows = this.state.screenshots.map( tuple =>{
            return(
                <StyledTr>
                    <StyledTd width={"25%"}><StyledImg src={tuple[1]}/></StyledTd>
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

        // let num = 1
        // const guessInput = this.state.userNames.map(user =>{
        //     return (
        //         <tr>
        //             <td></td>
        //             <img />
        //             <td>
        //                 <InputField
        //                     placeholder="A1"
        //                     onChange={e => {
        //                         this.saveGuessToDict(user, e.target.value);
        //                     }}
        //                 />
        //             </td>
        //         </tr>
        //     )
        // })

        return (
            <Container>
                <h1>GUESSING SCREEN</h1>
                    <div align={"center"}>
                        <p>Which picture were the other players trying to build?</p>
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
