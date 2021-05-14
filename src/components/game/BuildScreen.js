// temporary file to simulate BuildScreen for development

import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import SetTemplate from "../Sets/SetTemplate";
import BuildRoom from "../shared/models/BuildRoom";

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;

const Countdown = styled.h1`
  margin-top = 10px;
  margin-bottom = 20px;
  font-size = 100px;
`;

class BuildScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            responseRoom: null,
            countMin: 5.0,
            count: 0.0,
        };
    }

    async putscreenshot() {
        try {
            await api.put("/screenshot/"+localStorage.getItem("currentUsername"), localStorage.getItem("screenshot"));
        } catch (error) {
            alert(`Something went wrong  \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            this.countInterval = setInterval(async () =>{
                await api.put('/buildRooms/count/'+localStorage.getItem('currentLobbyId'))
            }, 100)
            this.checkInterval = setInterval(async () =>{
                const responseCheck = await api.get('/buildRooms/'+localStorage.getItem('currentLobbyId'));
                this.setState({responseRoom: responseCheck.data})}, 100)


        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {

        const buildRoom = new BuildRoom(this.state.responseRoom)
        const difference = Math.round(buildRoom.timeDifference)
         if(difference< 0.00 && difference>=-59.00){
             this.setState({
                 count: 59,
                 countMin: 4
             })
         } else if (difference<-59.00 && difference>=-119.00){
             this.setState({
                 count: 119.00,
                 countMin: 3
             })
         }else if (difference<-119.00 && difference>=-179.00){
             this.setState({
                 count: 179.00,
                 countMin: 2
             })
         }else if (difference< -179.00 && difference>=-239.00){
             this.setState({
                 count: 239.00,
                 countMin: 1
             })
         }else if (difference< -239.00){
             this.setState({
                 count: 299.00,
                 countMin: 0
             })
         }

        return (
            <Container>
                {this.state.countMin <= 0 && (this.state.count + buildRoom.timeDifference) <= 0 ? (this.userFinishedBuilding()):(
                <Countdown>Countdown: {this.state.countMin}:{Math.round(this.state.count + buildRoom.timeDifference)}</Countdown>)}

                <div>
                    <SetTemplate pictureURL={localStorage.getItem("myPicURL")}/>
                    {/*<Button*/}
                    {/*    width="100%"*/}
                    {/*    onClick={() => {*/}
                    {/*        this.userFinishedBuilding();*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    I'm done building!*/}
                    {/*</Button>*/}
                </div>
            </Container>
        );
    }


    userFinishedBuilding() {
        this.putscreenshot()
        this.props.history.push(`/GuessingScreen`);
    }
}

export default withRouter(BuildScreen);
