import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from '../utils/Items';
import {
    Bridgecontainer,
    BridgeRectangle,
    Circle,
    Dice,
    Halfcircle,
    Rectangle,
    Stick,
    Stone, ThinRectangle,
    Triangle
} from "./BuildingBlocks";
import stoneimg from "../stone_background.jpg";
import React from 'react';
import ReactDOM from 'react-dom';

import img from "../wood_texture_background2.jpg";


const ItemContainer = styled.div`
  background inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  padding-right: 5vw;
  padding-left: 5vw;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;
const StoneContainer = styled.div`
  
  background inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;


const stickstyle = {
    position: 'absolute',
    width: '1.3vw',
    height: '8.3vw',
    transform: 'rotate(30deg)',
    border: '2px solid black',
    backgroundColor: 'beige',
    cursor: 'move',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const Circlestyle ={
    position: 'absolute',
    height: '5vw',
    width: '5vw ',
    borderRadius: '50%',
    backgroundColor: 'green',
    margin: '10px',
    cursor:'move',
}
// const stonestyle = {
//     transform: 'rotate(120deg)',
//     width: '5vw',
//     height: '2.7vw',
//     background: 'red',
//     // border-radius: '100px / 50px',
//     cursor:'move',
//     border: '2px solid black',
//     // backgroundimage: url(${stoneimg})',
// }



export const Item = ({ _id, location, left, top, color, amount, hideSourceOnDrag,style }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ITEM,
        item: { _id, location, left, top, color, amount,style},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [_id, location, left, top, color, amount,style]);

    function showAmount(){
        if(location === 'inventory'){
            return amount+'X';
        }
    }

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag}/>;
    }

    if (style==='stick'){
        return (
            <ItemContainer>
                <Stick ref={drag} style={{  location, left, top, amount }} role="Box">
                    {showAmount()}
                </Stick>
            </ItemContainer>

        );}
    else if (style==='stone'){

        return (
            <StoneContainer>
                <Stone ref={drag} style={{ location, left, top, amount,style }} role="Box">
                    {showAmount()}
                </Stone>
            </StoneContainer>

        );}
    else if (style==='triangle'){
        return (
           <ItemContainer>
                <Triangle ref={drag} style={{ location, left, top, amount }} role="Box">
                </Triangle>
           </ItemContainer>

        );}

    else if (style==='dice'){
        return (
            <ItemContainer>

                <Dice ref={drag} style={{ location, left, top, amount }} role="Box">
                </Dice>


            </ItemContainer>
        );}
    else if (style==='circle'){
        return (
            <ItemContainer>

                <Circle ref={drag} style={{location, left, top, amount }} role="Box">
                </Circle>
            </ItemContainer>

        );}
    else if (style==='rectangle'){
        return (
            <ItemContainer>
                <Rectangle ref={drag} style={{ location, left, top, amount }} role="Box">

                </Rectangle>
            </ItemContainer>
        );}
    if (style==='thinrectangle'){
        return (
            <ItemContainer>
                <ThinRectangle ref={drag} style={{ location, left, top, amount }} role="Box">

                </ThinRectangle>
            </ItemContainer>
        );}

    else if (style==='bridge'){
        return (
            <ItemContainer>
                <Bridgecontainer ref={drag} style={{ location, left, top, amount }} role="Box">
                    <Halfcircle/>
                    <BridgeRectangle/>


                </Bridgecontainer>
            </ItemContainer>
        );}

    else{
        return (
            <ItemContainer>
                <div ref={drag} style={{...stickstyle,location, left, top, amount }}  role="Box">
                    {showAmount()}
                </div>
            </ItemContainer>
        );
    }

}