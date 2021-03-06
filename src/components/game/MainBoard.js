
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { Button } from "../../views/design/Button";
import PictureGrid from "./PictureGrid"

const Container = styled(BaseContainer)`
  display: flex;
  color: white;
  text-align: center;
  flex-direction: row;
  min-width: 900px;
  
  `;

const Button1 = styled(Button)`
  background: green  
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
color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


// made Picture element a separate class so it can store its coordinates,
// so when the time comes to select a specific coordinate it will be able to ti pass it on directly
// could also be useful for the pictures
class MainBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            requested: false,
            players: {},
            mySet: "-",
            myCoordinates: "-",
            coordinateNames: [
                "A1", "A2", "A3", "A4",
                "B1", "B2", "B3", "B4",
                "C1", "C2", "C3", "C4",
                "D1", "D2", "D3", "D4"],
            // for testing
            picsURLs: [
                "https://homepages.cae.wisc.edu/~ece533/images/peppers.png", //1
                "https://homepages.cae.wisc.edu/~ece533/images/monarch.png", //2
                "https://homepages.cae.wisc.edu/~ece533/images/pool.png", //3
                "https://homepages.cae.wisc.edu/~ece533/images/tulips.png", //4
                "https://homepages.cae.wisc.edu/~ece533/images/watch.png", //5
                "https://homepages.cae.wisc.edu/~ece533/images/sails.bmp", //6
                "https://homepages.cae.wisc.edu/~ece533/images/fruits.png", //7
                "https://homepages.cae.wisc.edu/~ece533/images/cat.png", //8
                "https://homepages.cae.wisc.edu/~ece533/images/boy.bmp", //9
                "https://picsum.photos/id/237/200/300",//10
                "https://www.diabete.qc.ca/wp-content/uploads/2014/08/Les-fruits.png",//11
                "https://homepages.cae.wisc.edu/~ece533/images/baboon.png",//12
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-168504892-1568303467.png?crop=1.00xw:0.606xh;0,0.0671xh&resize=980:*",//13
                "https://images.unsplash.com/photo-1486578077620-8a022ddd481f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",//14
                "https://assets.eflorist.com/site/EF-3626/Homepage/Spring_Flowers.PNG",//15
                "https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/3/2/shutterstock_anemone-134595248.jpg.rend.hgtvcom.966.644.suffix/1519931799331.jpeg"//16
            ],
            pictureURLs: null,
            coordinate: [0,1,2,3,
                4,5,6,7,
                8,9,10,11,
                12,13,14,15],
        };

    }

    //API REQUESTS//
    secondTry = false;


    async initGame(){
        try {
            const response = await api.get("/board/"+localStorage.getItem("currentLobbyId"))
            this.setState({players: response.data})
            this.setState({requested: true})

            // update players assigned coordinate & set to display it to them
            for(const [key, val] of Object.entries(this.state.players)){
                if(val.username === localStorage.getItem('currentUsername')){
                    this.setState({
                        mySet: val.assignedSet,
                        myCoordinates: this.state.coordinateNames[val.assignedCoordinates]
                    });
                    localStorage.setItem("myCoordinates", val.assignedCoordinates)
                    localStorage.setItem("myPicURL", this.state.picsURLs[val.assignedCoordinates])
                    break;
                }
                delete val.password
            }

            // add NEEDED info to localstorage
            localStorage.setItem("players", JSON.stringify(this.state.players))
            localStorage.setItem("mySet", this.state.mySet)
            localStorage.setItem("currentNoOfUsers", response.data.length) //needed for guard
        }
        catch (error) {
            if(this.secondTry === true){
                alert(`Something went wrong getting the Players: \n${handleError(error)}`)
            }
            else{
                this.secondTry = true
                await this.initGame()

            }
        }
    }

    async componentWillMount(){
        await this.initGame();
    }

    //DISPLAY//

    render(){
        return(<Container>
            <div>
                <h1>Take a look at your assigned coordinates</h1>
                <PictureGrid/>
            </div>
            <div>
            <table style={{position: "fixed", top: "250px", margin: "10px"}}>
                <td>
                    <tr><h3>You have been assigned the picture
                        <br></br>
                        located at the following coordinates:</h3></tr>
                    <tr style={{"font-weight":"bold"}}>{this.state.myCoordinates}</tr>
                    <tr><p>(highlighted in green)</p></tr>
                    <tr>
                        <ButtonContainer>
                            <Button1
                                onClick={() => {
                                    this.showBuildScreen();
                                }}
                            >
                                got it !
                            </Button1>
                        </ButtonContainer>
                    </tr>
                </td>
            </table>
            </div>
        </Container>);
    }

    async showBuildScreen() {
        const requestBody = JSON.stringify({
            roomId: localStorage.getItem('currentRoomNumber'),
        });

        const userReqBody = JSON.stringify({
            username: localStorage.getItem('currentUsername'),
        });
        localStorage.setItem("isbuilding","true");

        await api.put('/users/buildScreens/start/'+localStorage.getItem('currentUsername'), userReqBody);

        await api.put('/lobbies/buildScreens/ready/preparations/'+localStorage.getItem('currentLobbyId'));

        await api.post('/buildRooms', requestBody);

        this.props.history.push(`/buildScreen`);
    }
}
export default withRouter(MainBoard);