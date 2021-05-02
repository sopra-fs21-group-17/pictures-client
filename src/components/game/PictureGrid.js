import {api, handleError} from "../../helpers/api";
import PictureElement from "./PictureElement";
import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import PicturesModel from "../shared/models/PicturesModel";

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
 height: 25px;
  width: 25px;
  color: black;
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

//TODO add api call method to the rendermethod so pictures are taken from backend
class PictureGrid extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            picsURLs: [
                "https://homepages.cae.wisc.edu/~ece533/images/peppers.png", //1
                "https://homepages.cae.wisc.edu/~ece533/images/monarch.png", //2
                "https://homepages.cae.wisc.edu/~ece533/images/pool.png", //3
                "https://homepages.cae.wisc.edu/~ece533/images/tulips.png", //4
                "https://homepages.cae.wisc.edu/~ece533/images/watch.png", //5
                "https://homepages.cae.wisc.edu/~ece533/images/sails.bmp", //6
                "https://homepages.cae.wisc.edu/~ece533/images/fruits.png", //7
                "https://homepages.cae.wisc.edu/~ece533/images/cat.png", //8
                "https://homepages.cae.wisc.edu/~ece533/images/boy.bmp", //9
                "https://picsum.photos/id/237/200/300",//10
                "https://www.diabete.qc.ca/wp-content/uploads/2014/08/Les-fruits.png",//11
                "https://homepages.cae.wisc.edu/~ece533/images/baboon.png",//12
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-168504892-1568303467.png?crop=1.00xw:0.606xh;0,0.0671xh&resize=980:*",//13
                "https://images.unsplash.com/photo-1486578077620-8a022ddd481f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",//14
                "https://assets.eflorist.com/site/EF-3626/Homepage/Spring_Flowers.PNG",//15
                "https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/3/2/shutterstock_anemone-134595248.jpg.rend.hgtvcom.966.644.suffix/1519931799331.jpeg"//16
            ],
            pictureURLs: [],
            coordinate: [0,1,2,3,
                4,5,6,7,
                8,9,10,11,
                12,13,14,15],
        }

    }

    async getPictures(){
        try {
            const response = await api.get("/pictures");
            this.setState({pictureURLs: response.data});

        }
        catch (error) {
            alert(`Something went wrong getting the Pictures: \n${handleError(error)}`);
        }
    }

    // TODO auskommentiert zum testen
    // async componentDidMount() {
    //     await this.getPictures()
    // debugger
    // }



    render(){

        let pictureElements = new Array();
       // let index = 0;
        // if(this.state.pictureURLs.length != 0) {
        //
        //
        //     const pictures = this.state.pictureURLs;
        //
        //     pictures.forEach(picture => {
        //         let pic = new PicturesModel(picture);
        //
        //         debugger
        //         pictureElements.push(<PictureElement pictureURL={pic.pictureLink}> </PictureElement>)
        //     })
        // }

        let i = 0;
        this.state.picsURLs.forEach(picture => {
            pictureElements.push(<PictureElement pictureURL={this.state.picsURLs[i]}> </PictureElement>);
            i++;
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

        <GridContainer >
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