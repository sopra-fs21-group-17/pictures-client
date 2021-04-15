import React from "react";
import styled from "styled-components";

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


export const Set4 = () => {
    return (
        <InventoryContainter>
            <Square style={{background:"red"}}>
                3X
            </Square>
            <Square style={{background:"blue"}}>
                3X
            </Square>
        </InventoryContainter>
    );
};
