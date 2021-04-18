import React, { useEffect, useState } from 'react';


import {SquareField} from "./SquareField";
import styled from "styled-components";
/** Styling properties applied to the board element */
const boardStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};



/** Styling properties applied to each square element */
const squareStyle = { width: '33.333333%', height: '33.33333%' };
/**
 * The chessboard component
 * @param props The react props
 */
export const Grid2 = ({ game }) => {


    function renderSquare(i) {
        const x = i % 3;
        const y = Math.floor(i / 3);
        return (<div key={i} style={squareStyle}>
            <SquareField x={x} y={y} game={game}>

            </SquareField>
        </div>);
    }
    const squares = [];
    for (let i = 0; i < 9; i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>;
};
