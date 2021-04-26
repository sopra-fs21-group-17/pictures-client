import styled from "styled-components";
import {useDrag} from "react-dnd";


import React from "react";

import {ItemTypes} from '../../utils/Items';


const SquareContainer = styled.div`
  width: 5vw;
  height: 5vw;
  min-height: 100%;
  min-width: 100%;
  // max-width: 100%;
  // max-height: 100%;
  font-size: 26px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  cursor:move;
  text-align: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;

export const Square = props => {

    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.SQUARE,
        item: {
        type: ItemTypes.SQUARE,
        id: props._id,
        location: props.location,
        amount: props.amount},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    function showAmount(){
        if(props.location === 'inventory'){
            return props.amount.toString()+'X';
        }
    }

    return (
        <SquareContainer
            style={{background: props.color}}
            ref={drag}
            opacity={isDragging ? '0.5' : '1'}>
            {showAmount()}
        </SquareContainer>
    )
}