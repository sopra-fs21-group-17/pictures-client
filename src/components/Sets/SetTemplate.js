import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {Set1} from "../../views/design/GameSets/Set1";
import {Set2} from "../../views/design/GameSets/Set2";
import {Set3} from "../../views/design/GameSets/Set3";
import {Set4} from "../../views/design/GameSets/Set4";
import {Set5} from "../../views/design/GameSets/Set5";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  max-width: 400px;
  height: 140px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border: 2px solid #ffffff26;
  border-radius: 2px;
  background: #303036;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Inventory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  right: 2%;
  left: 2%;
  bottom: 2%;
  width: width;
  height: 200px;
  background: #303036;
  filter: brightness(75%);
`;


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  background: transparent;
  color: white;
`;

const Title = styled.title`
  font-weight: bold;
  display: flex;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 28px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  /*text-transform: uppercase;*/
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Link = styled.button`
  margin-top: 5px; 
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: darkgray;
`;


/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class SetTemplate extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {

        };
    }



    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>

                </FormContainer>
                <Inventory>
                    <Set1 />
                </Inventory>

            </BaseContainer>

        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(SetTemplate);
