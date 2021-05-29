import React from 'react';
import styled from "styled-components";
import "./picture.css";


const GridElement = styled.div`
position: relative;
background: #13fb03;

padding-left: 2px;
padding-right: 2px;
padding-color: white;

min-height: 100px;
min-width: 100px;`;


const ImageContainer = styled.img`
  top: 50%
  position: absolute;
  height: 90%;
  width: 90%;
  max-height:200px;
  max-width: 200px;
  min-height: 150px;
  min-width: 150px; 
`;


class PictureElementSpecial extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinate: this.props.coordinate,
            pictureURL: this.props.pictureURL
        }
    }

    renderPicture() {
        return (
            <ImageContainer class="picture" key={this.state.pictureURL} src={this.state.pictureURL}
            />
        )
    }

    renderCoordinates() {
        return (this.state.coordinate)
    }

    render() {

        return <GridElement>
            {this.state.pictureURL != null ? this.renderPicture() : this.renderCoordinates()}
        </GridElement>
    }
}

export default PictureElementSpecial;