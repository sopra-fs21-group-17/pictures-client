import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Header from "../../views/Header";

const FormContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 200px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-radius: 5px;
  background: rgba(137, 137, 137, 1);
  transition: opacity 0.5s ease, transform 0.5s ease;
 
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(230, 230, 230, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  background: rgba(230, 230, 230, 0.2);
  color: white;
`;

// const Label = styled.label`
//   color: white;
//   margin-bottom: 10px;
//   text-transform: uppercase;
// `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      responseUser: null
    };
  }


  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const response = await api.post('/users/names', requestBody);

      //sets the value with the response data to the key, if user exists, it returns the user
      this.setState({responseUser: response.data})

      // Get the returned user and update a new object.
      const user = new User(this.state.responseUser);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id', user.id);
      localStorage.setItem('currentUsername', user.username)


      // Login successfully worked --> navigate to the route /home in the GameRouter
      this.props.history.push(`/home`);

    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }
  //navigate to route /registration in GameRouter
  register(){
    this.props.history.push('/registration');
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
  handleKeyPress(e, Number){
    if (Number === 1) {
      if (e.keyCode === 13 || e.keyCode === 40) {
        this.refs.passwordField.focus()
      }
    }else if (Number === 2){
      if (e.keyCode === 13){
        this.login()
      }else if (e.keyCode === 38){
        this.refs.usernameField.focus()
      }
    }
  }






  render() {
    return (
      <BaseContainer>
        <Header height={"100"} />
        <h1 style={{color: "white", textAlign: "center", fontSize:"60px"}}>Login</h1>
        <FormContainer>
          <Form>
            <InputField

              placeholder="Username"
              ref="usernameField"
              onKeyDown={e => {this.handleKeyPress(e, 1)}}
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <InputField

              placeholder="Password"
              type="password"
              ref="passwordField"
              onKeyDown={e => {this.handleKeyPress(e, 2)}}
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />

          </Form>
        </FormContainer>
        <ButtonContainer>
          <Button
              ref="loginButton"
              disabled={!this.state.username || !this.state.password}
              width="20%"
              onClick={() => {
                this.login();
              }}
          >
            Login
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
              width="20%"
              ref="registerButton"
              onClick={() => {
                this.register();
              }}
          >
            Register Now
          </Button>
        </ButtonContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
