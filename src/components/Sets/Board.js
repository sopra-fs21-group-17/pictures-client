import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useContext} from "react";
import {ItemContext} from "../../views/design/GameSets/Set1";


const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const BorderContainer = styled.div`
  width: 40vw;
  height: 40vw;
  max-height: 800px;
  max-width: 800px;
  background: #1f1f1f;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  padding-left: 2.5%;
  padding-right: 2.5%;
`;

export const Board = props => {

    const { markAsBoard } = useContext(ItemContext)

    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.SQUARE,
        drop: (item, monitor) => markAsBoard(item.id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <BorderContainer>
            <BoardContainer
                style={isOver ? {background: '#919191'} : {background: '#C4C4C4'}}
                ref={drop}>
                {props.children}
            </BoardContainer>
        </BorderContainer>

    )
}