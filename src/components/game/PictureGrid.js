import {api, handleError} from "../../helpers/api";
import PictureElement from "./PictureElement";
import PictureElementSpecial from "./PictureElementSpecial";
import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import PicturesModel from "../shared/models/PicturesModel";
import img from "./wood_texture_background.jpg"

const GridContainer = styled.div`
  
  display: grid;
  align-items: center;
  min-height: 300px;
  min-width: 600px;
  justify-content: center;
  
  grid-template-areas: 
  'empty 1 2 3 4'
  'A G G G G'
  'B G G G G'
  'C G G G G'
  'D G G G G';
`;

const Grid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 10px;
  
  width: auto;
  min-height: 600px;
  
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  
  
  background-image: url(${img});
  transition: opacity 0.5s ease, transform 0.5s ease;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 2;
  grid-column-end: span 4;
`;

const GridCoordinate = styled.div`
  font-weight: bold;
  color: white;
  margin: 15px;
`;

const GridVoid = styled.div`
  background: transparent;
  height: auto;
  width: auto;
  grid-row-start: 1;
  grid-column-start: 1;
`;


class PictureGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureURLs: [],
            coordinate: [0, 1, 2, 3,
                4, 5, 6, 7,
                8, 9, 10, 11,
                12, 13, 14, 15],
        }
    }

    async getPictures() {
        try {
            const response = await api.get("/pictures/" + localStorage.getItem("currentLobbyId"));
            this.setState({pictureURLs: response.data});
        } catch (error) {
            alert(`Something went wrong getting the Pictures: \n${handleError(error)}`);
        }
    }

    async componentWillReceiveProps() {
        await this.getPictures()
    }

    render() {

        let pictureElements = new Array();
        if (this.state.pictureURLs.length != 0) {

            const pictures = this.state.pictureURLs;
            let i = 0;
            pictures.forEach(picture => {
                let pic = new PicturesModel(picture)
                if(i.toString() === localStorage.getItem("myCoordinates")
                    && (window.location.href === "http://localhost:3000/board" || window.location.href === "https://sopra-fs21-group-17-client.herokuapp.com/board")
                ){
                    pictureElements.push(<PictureElementSpecial pictureURL={pic.pictureLink}> </PictureElementSpecial>)
                }
                else{
                    pictureElements.push(<PictureElement pictureURL={pic.pictureLink}> </PictureElement>)
                }
                i+=1
            })
        }

        const numberColumn = [1, 2, 3, 4];
        const columnCoordinates = numberColumn.map((number) => {
            return <GridCoordinate>{number}</GridCoordinate>
        })

        const letterColumn = ['A', 'B', 'C', 'D'];
        const rowCoordinates = letterColumn.map((letter) => {
            return <GridCoordinate>{letter}</GridCoordinate>
        })

        return (
            <GridContainer>
                <GridVoid/>
                {columnCoordinates}
                {rowCoordinates}
                <Grid>
                    {pictureElements}
                </Grid>
            </GridContainer>
        );
    }
}

export default withRouter(PictureGrid);