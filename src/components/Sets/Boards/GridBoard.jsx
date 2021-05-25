import React from 'react';
import { SquareField } from "./SquareField";
import { Square } from "../Items/Square";


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


    /**
     *
     * @param i
     * @returns {JSX.Element}
     */
    function renderSquare(i) {
        const x = i
        return (<div key={i} style={squareStyle}>
            <SquareField x={x}   >
                {itemlist
                    .filter(item => item.location === 'squarefield'+x)
                    .map(item => (
                        <Square
                            key={item._id.toString()}
                            _id={item._id}
                            locatioin={item.location}
                            color={item.color}
                            amount={item.amount}
                        />
                    ))}


            </SquareField>
        </div>);
    }
    //create an empty list and put 9 Squares in it.
    const squares = [];
    for (let i = 0; i < 9; i += 1) {
        squares.push(renderSquare(i));


    }
    //return the whole GridBoard

    return <div style={boardStyle}>{squares}</div>;
};


