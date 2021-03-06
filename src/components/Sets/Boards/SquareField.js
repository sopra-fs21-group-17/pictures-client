import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useContext} from "react";
import {ItemContext} from "../SetTemplate";

const SquareFieldContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0px;
  font-weight: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  cursor:move;
`;


export const SquareField = (props) => {

    const { markAsSquareField } = useContext(ItemContext)
    //SquareFields, which only allows SquareItems inside
    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.SQUARE,
        drop: (item, monitor) => markAsSquareField(item,props.x),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <SquareFieldContainer
            style={isOver ? {background: '#fcfc90'} : {}}
            ref={drop}>
            {props.children}
        </SquareFieldContainer>
    )
}