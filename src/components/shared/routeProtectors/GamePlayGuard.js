import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import {api} from "../../../helpers/api";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const GamePlayGuard = props => {

    const [currentAmountOfPlayers,setCurrentAmountOfPlayers]= useState(localStorage.getItem("currentNoOfUsers"))

    const getRoundInformation = async () => {
        try {
            const response = await api.get("/rounds/" + localStorage.getItem("currentLobbyId"))
            setCurrentAmountOfPlayers(response.data["numberOfPlayers"])
        } catch (error){

        }
    }

    useEffect(() => {
        getRoundInformation()
    }, [])



    if (window.location.pathname === ('/lobbies/'+ localStorage.getItem('lobbyId'))|| localStorage.getItem("currentNoOfUsers") == currentAmountOfPlayers)  {
        return props.children;
    }

    return (<alert>A player has left the game, you will be redirected to your home screen.</alert>,
        <Redirect to={"/home"} />
        );
};
