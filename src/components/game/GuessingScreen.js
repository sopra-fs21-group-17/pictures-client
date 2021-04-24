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


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const GridContainer = styled.div`
  
  display: grid;
  align-items: center;
  min-height: 300px;
  min-width: 600px;
  justify-content: center;
  
  grid-template-areas: 
  'empty 1 2 3 4'
  'A G G G G'
  'B G G G G'
  'C G G G G'
  'D G G G G';
 
`;

const Grid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 10px;
  
  width: auto;
  height: 600px;
  
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  
  
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 2;
  grid-column-end: span 4;
`;

const GridCoordinate = styled.div`
 height: 100px;
  width: 100px;
background: pink;
border-radius: 50px;
margin: 15px;



`;

const GridVoid = styled.div`
background: transparent;
 height: auto;
  width: auto;
  grid-row-start: 1;
  grid-column-start: 1;
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

class GuessingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            pictureURLs: null,
            coordinate: [0,1,2,3],
            userNames: ["adam", "eva", "fritzli", "voldemort"],
        };
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {

        const location = this.state.coordinate;

        // map each picture to a coordinate
        const pictureElements = location.map(coordinate => {
            return <PictureElement coordinates={coordinate}></PictureElement>
        })

        // map each username to a container
        const selectUsers = location.map(userName => {
            return <PictureElement coordinates={userName}></PictureElement>
        })

        const numberColumn =[1,2,3,4];
        const columnCoordinates = numberColumn.map((number) => {
            return <GridCoordinate>{number}</GridCoordinate>
        })

        const letterColumn =['A','B','C','D'];
        const rowCoordinates = letterColumn.map((letter) => {
            return <GridCoordinate>{letter}</GridCoordinate>
        })

        return (
            <Container>
                <h2>GuessingScreen</h2>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.showScoreScreen();
                            }}
                        >
                            Guessing is done!
                        </Button>
                    </div>
                )}
            </Container>
        );
    }

    async startGame() {
        try {
            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/board`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    showScoreScreen() {
        this.props.history.push(`/scoreScreen`);
    }
}

export default withRouter(GuessingScreen);
