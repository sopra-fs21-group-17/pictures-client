// temporary file to simulate BuildScreen for development

import React, {useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import SetTemplate from "../Sets/SetTemplate";

const Container = styled(BaseContainer)`
  color: black;
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

class BuildScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
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

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {

        return (
            <Container>
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
