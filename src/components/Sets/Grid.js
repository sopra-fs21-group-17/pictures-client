import { useDrop} from "react-dnd";
import styled from "styled-components";
import {ItemTypes} from "../utils/Items";
import React, {useContext} from "react";
import {ItemContext} from "../../views/design/GameSets/Set1";
import {SquareField} from "./SquareField";
import {Square} from "./Square";
import {Inventory} from "./Inventory";

const boardStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};
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
const SquareFieldContainer = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  min-height: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid white;
  \`;
`;

export const Grid = props => {


    function renderSquare(i) {
        const x = i % 3;
        const y = Math.floor(i / 3);
        return (<div key={i} style={SquareFieldContainer}>
            <SquareField x={x} y={y} props={props}>

            </SquareField>
        </div>)
    }

    const squares = [];
    for (let i = 0; i < 9; i += 1) {
        squares.push(renderSquare(i));
    }

    /**return (
        <div
            style={boardStyle}>
            {squares}
        </div>
    )
        ;};*/
    return (
        <SquareFieldContainer>


        </SquareFieldContainer>
    )}



