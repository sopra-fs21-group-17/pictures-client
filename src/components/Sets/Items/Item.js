import styled from "styled-components";
import { useDrag } from "react-dnd";
import { ItemTypes } from '../utils/Items';
import {
    Bridgecontainer,
    BridgeRectangle,
    Circle,
    Dice,
    Halfcircle,
    ThickRectangle,
    Stick,
    Stone,
    ThinRectangle,
    Triangle,
    Trianglecontainer
} from "./ItemStyles";
import React, {useEffect} from 'react';
import { Card, Icon } from "./Cards";
import { Rope } from "./Rope"
import {getEmptyImage} from "react-dnd-html5-backend";

const ItemContainer = styled.div`
  background: inherit;
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

export const Item = ({_id, location, left, top, color, amount, hideSourceOnDrag, style, selected, rotation, background: icon}) => {

    //makes the item invisible when it is dragged
    //necessary for the dragpreview
    function getStyles(left, top, isDragging) {
        const transform = `translate3d(${left}px, ${top}px, 0`;
        return {
            position: 'absolute',
            transform,
            WebkitTransform: transform,
            opacity: isDragging ? 0 : 1,
            height: isDragging ? 0 : '',
        };
    }

    //makes the Item Draggable and defines what is returned in the item
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: ItemTypes.ITEM,
        item: {_id, location, left, top, color, amount, style, selected, rotation, background: icon},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [_id, location, left, top, color, amount, style, selected, rotation, icon]);

    useEffect(() => {
        preview(getEmptyImage());
    }, [preview]);

    //only shows the amount for items in the inventory
    function showAmount() {
        if (location === 'inventory') {
            return amount + 'X';
        }
    }

    if (isDragging && hideSourceOnDrag) {
        return (
            <div ref={drag} style={getStyles(left, top, isDragging)} >
                {/*<Item style={style}/>*/}
            </div>

        );
    }

    //in the following part all the styles are assigned based on the property "style" of the item
    if (style === 'stick') {
        return (
            <ItemContainer>
                <Stick ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role={preview ? "ItemPreview" : "Item"}>
                    {showAmount()}
                </Stick>
            </ItemContainer>
        );
    } else if (style === 'stone') {
        return (
            <ItemContainer>
                <Stone ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role={preview ? "ItemPreview" : "Item"}>
                    {showAmount()}
                </Stone>
            </ItemContainer>
        );
    } else if (style === 'triangle') {
        return (
            <ItemContainer>
                <Trianglecontainer ref={drag} style={selected === true ? {background: "limegreen", transform: 'rotate('+rotation+'deg)',
                    location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                    <Triangle/>
                </Trianglecontainer>
            </ItemContainer>

        );
    } else if (style === 'dice') {
        return (
            <ItemContainer>
                <Dice ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}}  role="Box">
                </Dice>
            </ItemContainer>
        );
    } else if (style === 'circle') {
        return (
            <ItemContainer>
                <Circle ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                </Circle>
            </ItemContainer>

        );
    } else if (style === 'rectangle') {
        return (
            <ItemContainer>
                <ThickRectangle ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                </ThickRectangle>
            </ItemContainer>
        );
    }else if (style === 'thinrectangle') {
        return (
            <ItemContainer>
                <ThinRectangle ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                </ThinRectangle>
            </ItemContainer>
        );
    } else if (style === 'bridge') {
        return (
            <ItemContainer style={location === "inventory" ? {background: "#303036"} : {background: "#C4C4C4"}}>
                <Bridgecontainer ref={drag} style={{ transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                    <Halfcircle style={selected === true ? {borderTop: "2px solid limegreen", borderRight: "2px solid limegreen", borderLeft: "2px solid limegreen"} : {}}/>
                    <BridgeRectangle style={selected === true ? {border: '3px solid limegreen'} : {}}/>
                </Bridgecontainer>
            </ItemContainer>
        );
    } else if (style === 'card') {
        return (
            <ItemContainer>
                <Card ref={drag} style={{location, left, top, amount}} role="Box">
                    <Icon style={{backgroundImage: icon}}> </Icon>
                </Card>
            </ItemContainer>

        );
    } else  {
        return (
            <Rope/>
        )
        // } else {
        //     //if none of the styles is matching a default stick style is returned
        //     return (
        //         <ItemContainer>
        //             <div ref={drag} style={{...stickstyle, transform: 'rotate('+rotation+'deg)',  location, left, top, amount}} >
        //                 {showAmount()}
        //             </div>
        //         </ItemContainer>
        //     );
         }

    }