import React, {createContext, createRef, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {BaseContainer} from "../../helpers/layout";
import {Square} from "./Items/Square";
import {GridBoard} from "./Boards/GridBoard";
import {ItemTypes} from "./utils/Items";
import {Inventory} from "./Inventory";
import {SquareField} from "./Boards/SquareField";
import {FreeBoard} from "./Boards/FreeBoard";
import {ItemsSet1} from "./SetItemLists/ItemsSet1";
import {ItemsSet2} from "./SetItemLists/ItemsSet2";
import {withRouter} from "react-router-dom";
import { useScreenshot } from 'use-react-screenshot'
import {OptionsType} from "html-to-image";
import {ItemsSet3} from "./SetItemLists/ItemsSet3";
import {Stick} from "./Items/Stick";
import img from "./wood_texture_background.jpg"
import {ThickRectangle, Triangle} from "./Items/BuildingBlocks";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  
  justify-content: center;
`;

const Button = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  color: rgba(300, 255, 255, 1);
  width: 90px;
  height: 50px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: green;
  transition: all 0.3s ease;
  float: right;
`;

const ButtonContainer = styled.div`
  padding-bottom: 25px;
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
  background-image: url(${img});
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
    moveItem: null,
    markAsInventory: null,
    markAsSquareField: null,
})

export const SetTemplate = () => {
    const [itemList, setItemList] = useState([

    ]);

    const moveItem = (id, left, top) => {

        const updatedItem = itemList.filter((item, i) => item._id === id);

        const newItem = {
            _id: id+10*id*updatedItem[0].amount,
            location: 'board',
            top: 300,
            left: 300,
            color: updatedItem[0].color,
            amount: updatedItem[0].amount-1,
            hideSourceOnDrag: true,
        };

        if(updatedItem[0].location !== 'inventory'){
            updatedItem[0].left = left;
            updatedItem[0].top = top;
            setItemList(itemList.filter((item) => item._id !== id).concat(updatedItem[0]));
        } else {
            updatedItem[0].amount = updatedItem[0].amount-1;
            setItemList(((itemList.filter((item, i) => item._id < id).concat(updatedItem[0])).concat(itemList.filter((item, i) => item._id > id))).concat(newItem));
        }
    };

    const markAsInventory = _id => {
        //gets the item which was moved
        const movedItem = itemList.filter((item, i) => item._id === _id);

        //gets the corresponding item in the inventory
        const inventoryItem = (itemList.filter((item, i) => item.color === movedItem[0].color).filter((item, i) => item._id <= 8));

        //creates new list without the item which was moved
        const newList = itemList.filter((item, i) => item._id !== _id)

        //only apply changes when item is moved from board to inventory
        if(movedItem[0].location !== 'inventory'){
            inventoryItem[0].amount += 1;
            setItemList((newList.filter((item, i) => item._id < inventoryItem[0]._id).concat(inventoryItem[0])).concat(newList.filter((item, i) => item._id > inventoryItem[0]._id)));
        }
    };

    const markAsSquareField = (square,x) => {
        //gets the item that was moved
        const item = itemList.filter((item, i) => item._id === square._id);

        //creates a new item
        const newSquare = {
                _id: square._id+10*square._id*square.amount,
                location: 'squarefield'+x,
                color: item[0].color,
                amount: item[0].amount-1,
            };

        //only applies changes if item moved to a empty square or the inventory
        if(itemList.filter((item, i) => item.location === 'squarefield'+x).length === 0){
            if(square.location !== 'inventory'){
                item[0].location = 'squarefield'+x;
                setItemList(itemList.filter((item, i) => item._id !== square._id).concat(item[0]));
            } else {
                item[0].amount = item[0].amount-1;
                setItemList(((itemList.filter((item, i) => item._id < square._id).concat(item[0])).concat(itemList.filter((item, i) => item._id > square._id))).concat(newSquare));
            }
        }
    };

    useEffect(() => {
        setItemList(ItemsSet1)
    }, [])

    const ref = createRef()
    const [screenshot, takeScreenshot] = useScreenshot()
    const   getImage = () => takeScreenshot(ref.current)
    console.log(screenshot)

    return (
        <DndProvider backend={HTML5Backend}>
            <ItemContext.Provider value={{ markAsInventory, moveItem, markAsSquareField }}>
                <BaseContainer>
                    <FormContainer>
                        <div ref={ref}>
                            <BorderContainer>
                                <BoardContainer>
                                    <GridBoard itemlist={itemList}></GridBoard>
                                </BoardContainer>
                            </BorderContainer>
                        </div>
                    </FormContainer>
                    <ButtonContainer>
                        <Button onClick={getImage}>Submit</Button>
                    </ButtonContainer>
                    <Inventory>
                        {itemList
                            .filter((task, i) => task.location === 'inventory')
                            .filter((task, i) => task.amount > 0)
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
