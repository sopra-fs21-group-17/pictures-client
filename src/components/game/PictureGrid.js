import {api, handleError} from "../../helpers/api";
import PictureElement from "./PictureElement";
import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

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
  height: 600px;
  
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  
  
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(4,1fr);
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 2;
  grid-column-end: span 4;
`;


const GridCoordinate = styled.div`
 height: 100px;
  width: 100px;
background: pink;
border-radius: 50px;
margin: 15px;



`;

const GridVoid = styled.div`
background: transparent;
 height: auto;
  width: auto;
  grid-row-start: 1;
  grid-column-start: 1;
`;


class PictureGrid extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currentGameState: "start",  /*idea to allow picture selection when in state guessing for the future*/
            pictureURLs: null,
            coordinate: [0,1,2,3,
                4,5,6,7,
                8,9,10,11,
                12,13,14,15],
        }
    }

    async getPictures(){
        try {
            const response = await api.get("/pictures");
            this.setState({pictureLink: response});

        }
        catch (error) {
            alert(`Something went wrong getting the Pictures: \n${handleError(error)}`);
        }
    }

    render(){

        const location = this.state.coordinate;
        const pictureElements = location.map(coordinate => {
            return <PictureElement coordinates={coordinate}></PictureElement>
        })
        const numberColumn =[1,2,3,4];
        const columnCoordinates = numberColumn.map((number) => {
            return <GridCoordinate>{number}</GridCoordinate>
        })

        const letterColumn =['A','B','C','D'];
        const rowCoordinates = letterColumn.map((letter) => {
            return <GridCoordinate>{letter}</GridCoordinate>
        })

        return(

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