import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useContext} from "react";
import {ItemContext} from "../../views/design/GameSets/Set1";

const SquareFieldContainer = styled.div`
  width: 5vw;
  height: 5vw;
  // margin-left: 20px;
  // margin-right: 20px;
  // margin-top: 20px;
  // margin-bottom: 20px;
  font-size: 26px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  cursor:move;
`;


export const SquareField = props => {

    const { markAsSquareField } = useContext(ItemContext)

    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.SQUARE,
        drop: (item, monitor) => markAsSquareField(item.id),
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