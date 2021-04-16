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
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


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

const Board = styled.div`
  width: 350px;
  height: 350px;
  background: #C4C4C4;
  border: 25px solid #1f1f1f;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: repeat(3, 1fr);

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

const Square = styled.div`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 100px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 100px;
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



    render() {

        return (
            <DndProvider backend={HTML5Backend}>
                <Set1 />
            </DndProvider>

        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(SetTemplate);
