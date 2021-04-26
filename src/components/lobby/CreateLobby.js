import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';

export default class CreateLobby extends React.Component{
    state = {
        roomName:"",
        restrictions: {
            timeLimit:""
        }
    }
}