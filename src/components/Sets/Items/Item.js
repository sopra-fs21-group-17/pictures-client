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

                <Trianglecontainer ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)',
                    location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                    <Triangle/>
                </Trianglecontainer>
         {/*<Triangle ref={drag} style={{location, left, top, amount}} role="Box">*/}
         {/*</Triangle>*/}



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
    }
    if (style === 'thinrectangle') {
        return (
            <ItemContainer>
                <ThinRectangle ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                </ThinRectangle>
            </ItemContainer>
        );
    } else if (style === 'bridge') {
        return (
            <ItemContainer>
                <Bridgecontainer ref={drag} style={selected === true ? {border: '3px solid limegreen', transform: 'rotate('+rotation+'deg)', location, left, top, amount} : {transform: 'rotate('+rotation+'deg)', location, left, top, amount}} role="Box">
                    <Halfcircle/>
                    <BridgeRectangle/>
                </Bridgecontainer>
            </ItemContainer>

        );
    }
    else if (style === 'card') {
        return (
            <ItemContainer>
                <Card ref={drag} style={{location, left, top, amount}} role="Box">
                    <Icon style={{backgroundImage: icon}}> </Icon>
                </Card>
            </ItemContainer>

        );
    }
    else if (style === 'longString') {
        return (
            <Rope/>
        )
    }
    else {
        return (
            <ItemContainer>
                <div ref={drag} style={{...stickstyle, transform: 'rotate('+rotation+'deg)',  location, left, top, amount}} >
                    {showAmount()}
                </div>
            </ItemContainer>
        );
    }

}