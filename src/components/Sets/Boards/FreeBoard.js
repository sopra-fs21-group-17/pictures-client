import { useDrop } from "react-dnd";
import { useEffect } from "react";
import styled from "styled-components";
import { ItemTypes } from "../utils/Items";
import React, { useContext } from "react";
import { ItemContext } from "../SetTemplate";
import { Item } from "../Items/Item";

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #C4C4C4;
  position: relative;
`;

export const FreeBoard = ({ itemlist }) => {

    const { moveItem } = useContext(ItemContext)
    let ref;

    //gets the dimensions of the board directly from the DOM
    useEffect(() => {
        ref = document.getElementById("BoardContainer").getBoundingClientRect();
    })

    //makes the free board a drop target
    const [ , drop] = useDrop(() => ({
            accept: ItemTypes.ITEM,
            drop(item, monitor) {

                //calculates the new top and left for the moved item
                const delta = monitor.getDifferenceFromInitialOffset();
                let left = Math.round(item.left + delta.x);
                let top = Math.round(item.top + delta.y);

                //sets top and left of item if it was moved from the inventory
                if(item.location === "inventory"){
                    left = monitor.getClientOffset().x - ref.x;
                    top = monitor.getClientOffset().y - ref.y;
                }

                //Checks if the items are placed to close to the border
                if(left < (ref.width * 0.1)){
                    left = (ref.width * 0.1);
                }
                if(left + (window.innerWidth*0.05) > (ref.width * 0.9)){
                    left = ((ref.width * 0.9)-window.innerWidth*0.05);
                }
                if(top < (ref.height * 0.1)){
                    top = (ref.height * 0.1);
                }
                if(top + (window.innerWidth*0.05) > (ref.height * 0.9)){
                    top = ((ref.height * 0.9)-window.innerWidth*0.05);
                }

                //applies changes to the item
                moveItem(item._id, left, top);
                return undefined;
            },
        }), [moveItem]);

    const getLength = Math.round(window.innerHeight / 100)*52

        return (
            <BoardContainer
                id="Board"
                ref={drop}>
                    <canvas id="canvas" width={getLength} height={getLength}/>
                    {itemlist
                    .filter(item => item.location === 'board')
                    .map((key) => {
                    return (
                            <Item
                                key={key._id}
                                _id={key._id}
                                location={key.location}
                                left={key.left}
                                top={key.top}
                                color={key.color}
                                amount={key.amount}
                                hideSourceOnDrag={key.hideSourceOnDrag}
                                style={key.style}
                                selected={key.selected}
                                rotation={key.rotation}
                                background={key.background}
                            />
                    );
                })}
            </BoardContainer>
        );
}
