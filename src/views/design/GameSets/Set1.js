import React from "react";
import styled from "styled-components";
import {useDrag} from 'react-dnd';

const Square = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
`;

const InventoryContainter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;


export const Set1 = () => {
    // const [{ isDragging }, drag, preview] = useDrag(() => ({
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     })
    // }), []);
    return (
        <InventoryContainter>
            <Square style={{background:"red"}} draggable className="draggable">
                3X
            </Square>
            <Square style={{background:"blue"}}>
                3X
            </Square>
            <Square style={{background:"green"}}>
                3X
            </Square>
            <Square style={{background:"yellow"}}>
                3X
            </Square>
            <Square style={{background:"black"}}>
                3X
            </Square>
            <Square style={{background:"white"}}>
                3X
            </Square>
            <Square style={{background:"gray"}}>
                3X
            </Square>
            <Square style={{background:"brown"}}>
                3X
            </Square>
        </InventoryContainter>
    );
};
