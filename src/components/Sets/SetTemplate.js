import React, {createContext, useEffect, useState} from "react";
import styled from "styled-components";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {BaseContainer} from "../../helpers/layout";
import {Square} from "./Items/Square";
import {GridBoard} from "./Boards/GridBoard";
import {ItemTypes} from "../utils/Items";
import {Inventory} from "./Inventory";
import {SquareField} from "./Boards/SquareField";
import {FreeBoard} from "./Boards/FreeBoard";
import {ItemsSet1} from "./SetItemLists/ItemsSet1";
import {ItemsSet2} from "./SetItemLists/ItemsSet2";
import {withRouter} from "react-router-dom";

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
  min-height: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  `;
const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #c4c4c4;
  justify-content: center;
  align-items: center;
  
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

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: max;
  margin-left: 1vw;
  margin-right: 1vw;
`;

export const ItemContext = createContext({
    markAsBoard: null,
    markAsInventory: null,
    markAsSquareField: null,
})



export const SetTemplate = () => {
    const [itemList, setItemList] = useState([

    ]);



    const markAsBoard = _id => {
        const item = itemList.filter((item, i) => item._id === _id);
        item[0].location = 'board';
        item[0].amount = item[0].amount-1;
        setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
    };

    const markAsInventory = _id => {
        const item = itemList.filter((item, i) => item._id === _id);
        if(item[0].amount != 3){
            item[0].location = 'inventory';
            item[0].amount = item[0].amount+1;
            setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
        }
    };

    const markAsSquareField = _id => {
        const item = itemList.filter((item, i) => item._id === _id);
        item[0].location = 'squarefield';
        item[0].amount = item[0].amount-1;
        setItemList(itemList.filter((item, i) => item._id !== _id).concat(item[0]));
    };

    useEffect(() => {
        setItemList(ItemsSet1)
    }, [])


    return (
        <DndProvider backend={HTML5Backend}>
            <ItemContext.Provider value={{ markAsInventory, markAsBoard, markAsSquareField }}>
                <BaseContainer>
                    <FormContainer>
                        <GridBoard>
                            {itemList
                                .filter((task, i) => task.amount !== 3)
                                .map((task, i) => (
                                    <Square
                                        key={task._id.toString()}
                                        _id={task._id}
                                        location={task.location}
                                        color={task.color}
                                        amount={task.amount}
                                    />
                                ))}
                        </GridBoard>
                    </FormContainer>
                    <Inventory>
                        {itemList
                            .filter((task, i) => task.amount !== 0)
                            .map((task, i) => (
                                <ItemContainer>
                                    <Square
                                        key={task._id.toString()}
                                        _id={task._id}
                                        location={task.location}
                                        color={task.color}
                                        amount={task.amount}
                                    />
                                </ItemContainer>
                            ))}
                    </Inventory>
                </BaseContainer>
            </ItemContext.Provider>
        </DndProvider>

    );
};

export default withRouter(SetTemplate);
