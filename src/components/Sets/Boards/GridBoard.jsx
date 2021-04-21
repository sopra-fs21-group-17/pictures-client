import React, { useEffect, useState } from 'react';



import {SquareField} from "./SquareField";
import styled from "styled-components";
import {Square} from "../Items/Square";
import {Inventory} from "../Inventory";
import {Set1} from "../../../views/design/GameSets/Set1";
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

export const GridBoard = ({ itemlist }) => {



    function renderSquare(i) {
        const x = i
        return (<div key={i} style={squareStyle}>
            <SquareField x={x}   >
                {itemlist
                    .filter((task, i) => task.location === 'squarefield'+x)
                    .map((task, i) => (
                        <Square
                            key={task._id.toString()}
                            _id={task._id}
                            locatioin={task.location}
                            color={task.color}
                            amount={task.amount}
                        />
                    ))}


            </SquareField>
        </div>);
    }
    const squares = [];
    for (let i = 0; i < 9; i += 1) {
        squares.push(renderSquare(i));


    }
    return <div style={boardStyle}>{squares}</div>;
};


