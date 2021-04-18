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
