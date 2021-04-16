import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import {useContext} from "react";
import {ItemContext} from "../../views/design/GameSets/Set1";


const BoardContainer = styled.div`
  width: 350px;
  height: 350px;
  //background: #C4C4C4;
  border: 25px solid #1f1f1f;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: repeat(3, 1fr);

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
        <BoardContainer
            style={isOver ? {background: 'white'} : {background: '#C4C4C4'}}
            ref={drop}>
            {props.children}
        </BoardContainer>
    )
}