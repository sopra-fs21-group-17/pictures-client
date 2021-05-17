import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import { RegistrationGuard } from "../routeProtectors/RegistrationGuard";
import Registration from "../../registration/Registration";
import { HomeGuard } from "../routeProtectors/HomeGuard";
import Game from "../../game/Game";
import Lobby from "../../lobby/Lobby";
import GuessingScreen from "../../game/GuessingScreen";
import BuildScreen from "../../game/BuildScreen";
import ScoreScreen from "../../game/ScoreScreen";
import MainBoard from "../../game/MainBoard";
import { SetTemplate } from "../../Sets/SetTemplate";
// import Lobby from "../../game/Lobby";
// import ScoreScreen from "../../game/ScoreScreen";
// import GuessingScreen from "../../game/GuessingScreen";
// import BuildScreen from "../../game/BuildScreen";
// import MainBoard from "../../game/MainBoard";

// TODO lobby guard wieder hinzufügen

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
              <Route
                  path="/"
                  exact
                  render={() => (
                      <Redirect to={"/home"} />
                  )}
              />
              <Route
                  path="/login"
                  exact
                  render={() => (
                      <LoginGuard>
                          <Login />
                      </LoginGuard>
                  )}
              />
              <Route
                  path="/lobbies/"
                  render={() => (
                        <Lobby />
                  )}
              />
              <Route
                  path="/board"
                  exact
                  render={() => (
                      <MainBoard />
                  )}
              />
              <Route
                  path="/buildScreen"
                  exact
                  render={() => (
                      <BuildScreen />
                  )}
              />
              <Route
                  path="/SetTemplate"
                  exact
                  render={() => (
                      <SetTemplate />
                  )}
              />
              <Route
                  path="/guessingScreen"
                  exact
                  render={() => (
                      <GuessingScreen />
                  )}
              />
              <Route
                  path="/scoreScreen"
                  exact
                  render={() => (
                      <ScoreScreen />
                  )}
              />
            <Route
              path="/home"
              render={() => (
                <HomeGuard>
                  <GameRouter base={"/home"} />
                </HomeGuard>
              )}
            />

            <Route
                path="/registration"
                exact
                render={() => (
                    <RegistrationGuard>
                        <Registration />
                    </RegistrationGuard>
                )}
            />

              <Route
                  path="/game"
                  exact
                  render={() => (
                      <GameGuard>
                          <Game />
                      </GameGuard>
                  )}
              />

            <Route path="/" exact render={() => <Redirect to={"/home"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
