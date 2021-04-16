import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";

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

class Board extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {}



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
                    <GridElement>A1</GridElement>
                    <GridElement>A2</GridElement>
                    <GridElement>A3</GridElement>
                    <GridElement>A4</GridElement>

                    <GridCoordinate>B</GridCoordinate>
                    <GridElement>B1</GridElement>
                    <GridElement>B2</GridElement>
                    <GridElement>B3</GridElement>
                    <GridElement>B4</GridElement>

                    <GridCoordinate>C</GridCoordinate>
                    <GridElement>C1</GridElement>
                    <GridElement>C2</GridElement>
                    <GridElement>C3</GridElement>
                    <GridElement>C4</GridElement>

                    <GridCoordinate>D</GridCoordinate>
                    <GridElement>D1</GridElement>
                    <GridElement>D2</GridElement>
                    <GridElement>D3</GridElement>
                    <GridElement>D4</GridElement>
                </Grid>
            </GridContainer>
        </Container>);
    }


}
export default withRouter(Board);