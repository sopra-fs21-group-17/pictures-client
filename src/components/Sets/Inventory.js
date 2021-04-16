import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useContext} from "react";
import {ItemContext} from "../../views/design/GameSets/Set1";

const Inventorycontainer = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  right: 2%;
  left: 2%;
  bottom: 2%;
  width: max;
  height: auto;
  background: #303036;
  filter: brightness(75%);
`;
export const Inventory = props => {

    const { markAsBoard } = useContext(ItemContext)

    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.SQUARE,
        drop: (item, monitor) => markAsBoard(item.id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Inventorycontainer
            style={isOver ? {background: 'white'} : {background: '#C4C4C4'}}
            ref={drop}>
            {props.children}
        </Inventorycontainer>
    )
}