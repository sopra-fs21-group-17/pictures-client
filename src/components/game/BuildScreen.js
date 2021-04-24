// temporary file to simulate BuildScreen for development

import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

import testPic from '../../test_pictures/doggo1.jpg';

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

class BuildScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
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
        return (
            <Container>
                <h2>BUILD SCREEN</h2>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <p></p>
                        <div> [ here goes the set building stuff... ] </div>

                        <img src={testPic}/>

                        <p></p>

                        <Button
                            width="100%"
                            onClick={() => {
                                this.userFinishedBuilding();
                            }}
                        >
                            I'm done building!
                        </Button>
                    </div>
                )}
            </Container>
        );
    }

    userFinishedBuilding() {
        this.props.history.push(`/GuessingScreen`);
    }
}

export default withRouter(BuildScreen);
