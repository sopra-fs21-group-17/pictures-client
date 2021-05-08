import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useCallback, useContext, useState} from "react";
import {ItemContext} from "../SetTemplate";
import update from 'immutability-helper';
import {Item} from "../Items/Item";

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #C4C4C4;
  position: relative;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: repeat(3, 1fr);
`;

export const FreeBoard = ({ itemlist }) => {

    const { moveItem } = useContext(ItemContext)

    const [ , drop] = useDrop(() => ({
            accept: ItemTypes.ITEM,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                moveItem(item._id, left, top,);
                return undefined;
            },
        }), [moveItem]);

        return (
            <BoardContainer
                ref={drop}>
                {itemlist
                    .filter((task, i) => task.location === 'board')
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
                            background={key.background}
                        />

                    );
                })}
            </BoardContainer>
        );



}
