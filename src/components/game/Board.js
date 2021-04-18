import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import PictureElement from "./PictureElement";
//TODO define game states

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  `;

const GridContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
 
`;

const Grid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 10px;
  
  width: 80%;
  height: 600px;
  
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  
  
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
  grid-template-columns: repeat(5,1fr);
  grid-template-rows: repeat(5,1fr);
  
`;

const GridElement = styled.div`
background: grey;
 height: auto;
  width: auto;
  
`;

const GridCoordinate = styled.div`
 height: 100px;
  width: 100px;
background: pink;
border-radius: 50px;
margin: auto;

`;

const GridVoid = styled.div`
background: transparent;
 height: auto;
  width: auto;
`;


//TODO Board will need PUT request for guesses
//TODO Board needs get Request for pictures (depending on api)

//TODO will need to be styled

// made Picture element a separate classe so it can store its coordinates,
// so when the time comes to select a specific coordinate it will be able to ti pass it on directly
// could also be usefull for the pictures
class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            coordinate: [['A1','A2','A3','A4'],
                ['B1','B2','B3','B4'],
                ['C1','C2','C3','C4'],
                ['D1','D2','D3','D4']]
        };
    }


    render(){
        return(<Container>
            <GridContainer>

                <Grid>
                    <GridVoid></GridVoid>

                    <GridCoordinate>1</GridCoordinate>
                    <GridCoordinate>2</GridCoordinate>
                    <GridCoordinate>3</GridCoordinate>
                    <GridCoordinate>4</GridCoordinate>

                    <GridCoordinate>A</GridCoordinate>
                    <PictureElement coordinates={this.state.coordinate[0][0]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[0][1]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[0][2]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[0][3]}></PictureElement>

                    <GridCoordinate>B</GridCoordinate>
                    <PictureElement coordinates={this.state.coordinate[1][0]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[1][1]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[1][2]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[1][3]}></PictureElement>

                    <GridCoordinate>C</GridCoordinate>
                    <PictureElement coordinates={this.state.coordinate[2][0]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[2][1]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[2][2]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[2][3]}></PictureElement>

                    <GridCoordinate>D</GridCoordinate>
                    <PictureElement coordinates={this.state.coordinate[3][0]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[3][1]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[3][2]}></PictureElement>
                    <PictureElement coordinates={this.state.coordinate[3][3]}></PictureElement>
                </Grid>
            </GridContainer>
        </Container>);
    }


}
export default withRouter(Board);