import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../../utils/Items";
import React, {useCallback, useContext, useState} from "react";
import {ItemContext} from "../SetTemplate";
import update from 'immutability-helper';
import {Box} from "../Box";
import {Stick} from "../Items/Stick";

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #C4C4C4;
  position: relative;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: repeat(3, 1fr);
`;

const BorderContainer = styled.div`
  width: 60vh;
  height: 60vh;
  background: #1f1f1f;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  padding-left: 2.5%;
  padding-right: 2.5%;
  
`;

export const FreeBoard = ({ hideSourceOnDrag }) => {

    const { markAsBoard } = useContext(ItemContext)

    const [boxes, setBoxes] = useState({
        a: {top: 20, left: 80, title: 'Drag me around'},
        b: {top: 180, left: 20, title: 'Drag me too'},
    });

    const moveBox = useCallback((id, left, top) => {
        setBoxes(update(boxes, {
            [id]: {
                $merge: { left, top },
            },
        }));
    }, [boxes,setBoxes]);



    const [ , drop] = useDrop(() => ({
            accept: ItemTypes.STICK,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                moveBox(item.id, left, top);
                return undefined;
            },
        }), [moveBox]);

        return (
            <BorderContainer>
                <BoardContainer
                    ref={drop}>
                    {Object.keys(boxes).map((key) => {
                        const { left, top, title } = boxes[key];
                        return ( <Stick key={key} id={key} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag}>
                            {title}
                        </Stick>);
                    })}
                </BoardContainer>
            </BorderContainer>

        );



}
