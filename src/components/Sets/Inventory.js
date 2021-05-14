import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./utils/Items";
import React, { useContext } from "react";
import { ItemContext } from "./SetTemplate";

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 2%;
  left: 2%;
  bottom: 2%;
  width: max;
  height: auto;
  max-width: 100%;
  min-height: 15vh;
  padding: 2%;
  background: #303036;
  filter: brightness(75%);
`;



export const Inventory = props => {

    const { markAsInventory } = useContext(ItemContext)

    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item, monitor) => markAsInventory(item._id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <InventoryContainer

            style={isOver ? {background: '#65656b'} : {background: '#303036'}}
            ref={drop}>
                {props.children}



        </InventoryContainer>
    )
}