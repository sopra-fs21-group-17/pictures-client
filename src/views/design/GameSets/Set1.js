import React, {createContext, useState} from "react";
import styled from "styled-components";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {BaseContainer} from "../../../helpers/layout";
import {Square} from "../../../components/Sets/Square";
import {Board} from "../../../components/Sets/Board";
import {ItemTypes} from "../../../components/utils/Items";
import {Inventory} from "../../../components/Sets/Inventory";
import {SquareField} from "../../../components/Sets/SquareField";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
const SquareFieldContainer = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  `;
const BoardContainer = styled.div`
  width: 17vw;
  height: 17vw;
  background: #C4C4C4;
  border: 25px solid #1f1f1f;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;


/**const Inventory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  right: 2%;
  left: 2%;
  bottom: 2%;
  width: max;
  height: auto;
  background: #303036;
  filter: brightness(75%);
`;*/


const InventoryContainter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ItemContext = createContext({
        markAsBoard: null,
        markAsInventory: null,
        markAsSquareField:null
})



export const Set1 = () => {
        const [itemList, setItemList] = useState([
                {
                        _id: 1,
                        location: 'inventory',
                        color: 'black',
                        amount: 3,
                },
                {
                        _id: 2,
                        location: 'inventory',
                        color: 'white',
                        amount: 3,
                },
                {
                        _id: 3,
                        location: 'inventory',
                        color: 'darkgray',
                        amount: 3,
                },
                {
                        _id: 4,
                        location: 'inventory',
                        color: 'red',
                        amount: 3,
                },
                {
                        _id: 5,
                        location: 'inventory',
                        color: 'limegreen',
                        amount: 3,
                },
                {
                        _id: 6,
                        location: 'inventory',
                        color: 'yellow',
                        amount: 3,
                },
                {
                        _id: 7,
                        location: 'inventory',
                        color: 'blue',
                        amount: 3,
                },
                {
                        _id: 8,
                        location: 'inventory',
                        color: 'brown',
                        amount: 3,
                },
        ]);


        const markAsBoard = _id => {
                const item = itemList.filter((item, i) => item._id === _id);
                item[0].location = 'board';
                setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
        };

        const markAsInventory = _id => {
                const item = itemList.filter((item, i) => item._id === _id);
                item[0].location = 'inventory';
                item[0].amount = item[0].amount+1;
                setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
        };
        const markAsSquareField = _id => {
                const item = itemList.filter((item, i) => item._id === _id);
                item[0].location = 'squarefield';
                item[0].amount = item[0].amount-1;
                setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
        };




        return (
                <ItemContext.Provider value={{ markAsInventory,markAsSquareField }}>
                <BaseContainer>
                        <FormContainer>
                        <BoardContainer>
                                <SquareFieldContainer>
                                <SquareField>
                                {itemList
                                .filter((task, i) => task.location === 'squarefield')
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
                                <SquareField>
                                        {itemList
                                            .filter((task, i) => task.location === 'squarefield')
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
                                <SquareField>
                                        {itemList
                                            .filter((task, i) => task.location === 'squarefield')
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
                                        <SquareField>
                                                {itemList
                                                    .filter((task, i) => task.location === 'squarefield')
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
                                        <SquareField>
                                                {itemList
                                                    .filter((task, i) => task.location === 'squarefield')
                                                    .map((task, i) => (
                                                        <Square
                                                            key={task._id.toString()}
                                                            _id={task._id}
                                                            locatioin={task.location}
                                                            color={task.color}
                                                            amount={task.amount}
                                                        />
                                                    ))}
                                        </SquareField><SquareField>
                                        {itemList
                                            .filter((task, i) => task.location === 'squarefield')
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
                                        <SquareField>
                                                {itemList
                                                    .filter((task, i) => task.location === 'squarefield')
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
                                        <SquareField>
                                                {itemList
                                                    .filter((task, i) => task.location === 'squarefield')
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
                                        <SquareField>
                                                {itemList
                                                    .filter((task, i) => task.location === 'squarefield')
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

                                </SquareFieldContainer>
                        </BoardContainer>


                        </FormContainer>
                        <Inventory>
                                        {itemList
                                        .filter((task, i) => task.location === 'inventory')
                                        .map((task, i) => (
                                            <Square
                                                key={task._id.toString()}
                                                _id={task._id}
                                                locatioin={task.location}
                                                color={task.color}
                                                amount={task.amount}
                                            />
                                        ))}

                        </Inventory>
                </BaseContainer>
                </ItemContext.Provider>
                );
        };

