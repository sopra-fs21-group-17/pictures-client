import React, { createContext, createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { BaseContainer } from "../../helpers/layout";
import { Square } from "./Items/Square";
import { Item } from "./Items/Item";
import { GridBoard } from "./Boards/GridBoard";
import { FreeBoard } from "./Boards/FreeBoard";
import { Inventory } from "./Inventory";
import { ItemsSet1 } from "./SetItemLists/ItemsSet1";
import { ItemsSet2 } from "./SetItemLists/ItemsSet2";
import { ItemsSet3 } from "./SetItemLists/ItemsSet3";
import { ItemsSet4 } from "./SetItemLists/ItemsSet4";
import { ItemsSet5 } from "./SetItemLists/ItemsSet5";
import { withRouter, useHistory } from "react-router-dom";
import { useScreenshot } from 'use-react-screenshot'
import img from "./wood_texture_background.jpg"
import { api, handleError } from "../../helpers/api";
import PicturesModel from "../shared/models/PicturesModel";
import {CustomDragLayer} from "./Items/CustomDragLayer";

const TopContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 70vh; 
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 2vh;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 30vh;
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  font-size: 42px;
  font-weight: 800;
  cursor: pointer;
`;

const ImageBorderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  max-height: 45vh;
  max-width: 30vw;
  min-height: 15vh;
  min-width: 10vh;
  margin: 5%;
  background-image: url(${img});
`;

const ImageContainer = styled.img`
  height: auto;
  width: auto;
  max-height: 45vh;
  max-width: 30vw;
  min-height: 15vh;
  min-width: 10vh;
  padding: 3%
`;

const Button = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: #c4c4c4;
  justify-content: center;
  align-items: center;
`;

const BorderContainer = styled.div`
  height: 55vh;
  width: 55vh;
  background-image: url(${img});
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  padding-left: 2.5%;
  padding-right: 2.5%;
  margin: 5%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  height: 100%;
  width: max;
  margin-left: 1vw;
  margin-right: 1vw;
  background: inherit;
`;
const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  height: 100%;
  width: max;
  
  
`;


export const ItemContext = createContext({
    moveItem: null,
    markAsInventory: null,
    markAsSquareField: null,
})


export const SetTemplate = () => {
    const [itemList, setItemList] = useState([

    ]);

    const [pictureURL, setPictureURL ]= useState(
        ""
    )
    const [currentRightIndex, setCurrentRightIndex] = useState(5)
    const [currentLeftIndex, setCurrentLeftIndex] = useState(0)


    const showArrows = () => {
        if((localStorage.getItem("mySet")) === "STICKS" || (localStorage.getItem("mySet")) === "BLOCKS"){
            return (
                    <ArrowContainer>
                        <div style={{margin: "5px"}} onClick={() => {
                            Rotate("Clockwise");
                        }}>↻ </div>
                        <div style={{margin: "5px"}} onClick={() => {
                            Rotate("Counterclockwise");
                        }}> ↺</div>
                    </ArrowContainer>
                )
        }
    }
    // const showScrollBar = () =>{
    //     if((localStorage.getItem("mySet")) === "ICONS"){
    //         return(
    //
    //             <Inventory>
    //                 <ButtonContainer>
    //                     <button onClick={() => scroll(-20)}>▶</button>
    //                     <button onClick={() => scroll(20)}>◀</button>
    //                 </ButtonContainer>
    //             </Inventory>
    //
    //
    //             //     </Col>
    //             // </Row>
    //
    //         )
    //     }
    // }


    const selectBoard = () => {
        if((localStorage.getItem("mySet")) === "CUBES"){
            return (
                <GridBoard itemlist={itemList}></GridBoard>
            );
        } else {
            return (
                <FreeBoard itemlist={itemList} ></FreeBoard>
            );
        }
    };

    const getPictureForUser = async () =>{
        try {
            const response = await api.get('/picture/'+localStorage.getItem("id"));
            const picture = new PicturesModel(response.data)
            return picture
        }
        catch (error) {
            alert(`Something went wrong while getting picture: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        //setPictureURL(getPictureForUser())
        setPictureURL(localStorage.getItem("myPicURL"))

        // const response = async () =>{ await api.get('/picture/'+localStorage.getItem(id));}

        // try {
        //     const response = api.get('/users/'+localStorage.getItem("currentUsername"));
        //
        //     const requestBody = JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password
        //     });
        //
        //     const picture = api.get('/picture', requestBody)
        //
        // } catch (error) {
        //     alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        // }


        if((localStorage.getItem("mySet")) === "CUBES"){
            setItemList(ItemsSet1)
        } else if ((localStorage.getItem("mySet")) === "BLOCKS"){
            setItemList(ItemsSet2)
        }else if ((localStorage.getItem("mySet")) === "STICKS"){
            setItemList(ItemsSet3)
        }else if ((localStorage.getItem("mySet")) === "ICONS"){
            setItemList(ItemsSet4)
        }else {
            setItemList(ItemsSet5)
        }
    }, [])


    function toLeft(){
        setCurrentLeftIndex(currentLeftIndex -1);
        setCurrentRightIndex(currentRightIndex - 1)
    }
    function toRight(){
        setCurrentLeftIndex(currentLeftIndex +1);
        setCurrentRightIndex(currentRightIndex + 1)
    }


    const selectItems = () => {
        if((localStorage.getItem("mySet")) === "CUBES"){
            return (
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
            );
        } else if ((localStorage.getItem("mySet")) === "STRINGS") {
            return null
        }else if ((localStorage.getItem("mySet") === "ICONS")){
        return (
            <Inventory>

                <Button

                    disabled={currentLeftIndex <= 0}
                    hidden = {currentLeftIndex === 0 || itemList.filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0).length <= 6}
                    style={{position: "absolute", left: "3.5%"}}
                    onClick={() =>{
                        if (currentLeftIndex <= 0){setCurrentLeftIndex(0)
                        }else{
                            setCurrentLeftIndex(currentLeftIndex  - 1);
                            setCurrentRightIndex(currentRightIndex - 1)}}}

                >
                    ◀
                </Button>

                {itemList
                    .filter((task, i) => task.location === 'inventory')
                    .filter((task, i) => task.amount > 0)
                    .slice(currentLeftIndex, currentRightIndex)
                    .map((task, i) => (

                        <ItemContainer>
                            <Item
                                key={task._id.toString()}
                                _id={task._id}
                                location={task.location}
                                color={task.color}
                                amount={task.amount}
                                style={task.style}
                                background={task.background}
                            />
                        </ItemContainer>
                    ))}

                <Button

                    disabled={(currentRightIndex) >= itemList
                        .filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0).length}
                    display ={(itemList
                        .filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0).length <= 6)}
                    onClick={() => {if (currentRightIndex >= itemList.filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0).length){setCurrentRightIndex( itemList.filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0).length)}else{
                        setCurrentLeftIndex(currentLeftIndex  + 1);
                        setCurrentRightIndex(currentRightIndex + 1)}}
                    }
                    style={{position: "absolute", left: "90%"}}
                >
                    ▶
                </Button>

            </Inventory>

        )

        }else {
            return (
                <Inventory>
                    {itemList
                        .filter((task, i) => task.location === 'inventory')
                        .filter((task, i) => task.amount > 0)
                        .map((task, i) => (
                            <ItemContainer>
                                <Item
                                    key={task._id.toString()}
                                    _id={task._id}
                                    location={task.location}
                                    color={task.color}
                                    amount={task.amount}
                                    style={task.style}
                                    background={task.background}
                                />
                            </ItemContainer>
                        ))}
                </Inventory>
            );
        }
    }

    const Rotate = (direction) => {
        const selectedItem = itemList.filter((item) => item.selected === true);

        if(selectedItem.length > 0){
            if(direction === "Clockwise"){

                selectedItem[0].rotation = (parseInt(selectedItem[0].rotation)+10).toString();
            } else {
                selectedItem[0].rotation = (parseInt(selectedItem[0].rotation)-10).toString();
            }
            setItemList(itemList.filter((item) => item.selected !== true).concat(selectedItem[0]));
        }
    }

    const moveItem = (id, left, top) => {

        const updatedItem = itemList.filter((item, i) => item._id === id);

        const lastSelectedItem = itemList.filter((item) => item.selected === true);

        const newItem = {
            _id: id+10*id*updatedItem[0].amount, //TODO fix random id (issue with items when adding two returning first and adding another)
            location: 'board',
            top: 150,
            left: 150,
            color: updatedItem[0].color,
            amount: updatedItem[0].amount-1,
            hideSourceOnDrag: true,
            style:updatedItem[0].style,

            background:updatedItem[0].background,
            selected: true,
            rotation: '0',
        };

        if(lastSelectedItem.length > 0){
            lastSelectedItem[0].selected = false;
            setItemList(itemList.filter((item) => item._id !== lastSelectedItem[0]._id).concat(lastSelectedItem[0]));
        }

        if(updatedItem[0].location !== 'inventory'){
            updatedItem[0].left = left;
            updatedItem[0].top = top;
            // if(left < 0){
            //     updatedItem[0].left = 0;
            // }
            // if(left > ((window.innerHeight/100)*50)){
            //     updatedItem[0].left = ((window.innerHeight/100)*50);
            // }
            // if(top < 0){
            //     updatedItem[0].top = 0;
            // }
            // if(top > ((window.innerHeight/100)*50)){
            //     updatedItem[0].top = ((window.innerHeight/100)*50);
            // }
            updatedItem[0].selected = true;
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
        const inventoryItem = (itemList.filter((item, i) => item.color === movedItem[0].color).filter((item, i) => item._id <= 20));

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
        const selectedItem = itemList.filter((item, i) => item._id === square._id);

        //creates a new item
        const newSquare = {
            _id: square._id+10*square._id*square.amount,
            location: 'squarefield'+x,
            color: selectedItem[0].color,
            amount: selectedItem[0].amount-1,
        };

        //only applies changes if item moved to a empty square or the inventory
        if(itemList.filter((item, i) => item.location === 'squarefield'+x).length === 0){
            if(square.location !== 'inventory'){
                selectedItem[0].location = 'squarefield'+x;
                setItemList(itemList.filter((item, i) => item._id !== square._id).concat(selectedItem[0]));
            } else {
                selectedItem[0].amount = selectedItem[0].amount-1;
                setItemList(((itemList.filter((item, i) => item._id < square._id).concat(selectedItem[0])).concat(itemList.filter((item, i) => item._id > square._id))).concat(newSquare));
            }
        }
    };

    const history = useHistory();



    const removeSelected = () => {
        const SelectedItem = itemList.filter((item) => item.selected === true);

        if(SelectedItem.length > 0){
            SelectedItem[0].selected = false;
            setItemList(itemList.filter((item) => item._id !== SelectedItem[0]._id).concat(SelectedItem[0]));
        }
    }


    const ref = createRef()
    const [screenshot, takeScreenshot] = useScreenshot()
    const GetImage = () =>{
        takeScreenshot(ref.current)}
        console.log(screenshot)
        localStorage.setItem("screenshot",screenshot)




    // localStorage.setItem("screenshot",screenshot)

    // neu hinzugefügt, da jetzt nur noch grüner SUBMIT button benutzt wird
    const putscreenshot = async () => {

        // TODO screenshot function too slow, is null
        // try {
        //     const requestBody = JSON.stringify({
        //         URL: localStorage.getItem("screenshot")
        //     })
        //
        //     console.log("REQUEST BODY: ", localStorage.getItem("screenshot"));
        //
        //
        //    await api.put("/screenshot/" + localStorage.getItem("currentUsername"), requestBody);
        //
        //     //
        //
        // } catch (error) {
        //     alert(`Something went wrong while uploading the screenshot URL \n${handleError(error)}`);
        // }

        /** change to next screen*/
        history.push(`/GuessingScreen`)
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <ItemContext.Provider value={{ markAsInventory, moveItem, markAsSquareField }}>
                <BaseContainer>
                    <TopContainer>
                        <div  >
                            <BorderContainer ref={ref}>
                                <BoardContainer >
                                    {selectBoard()}
                                    <CustomDragLayer/>
                                </BoardContainer>
                            </BorderContainer>
                        </div>
                        <div style={{padding: '5%', margin: '5%',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <ImageBorderContainer>
                                <ImageContainer src={pictureURL} className="img-fluid" alt=""/>
                            </ImageBorderContainer>
                            {showArrows()}
                            <ButtonContainer>
                                <Button onClick={() => {
                                    removeSelected();
                                    GetImage();
                                    setTimeout(function(){ putscreenshot(); }, 200);

                                }}>Submit</Button>
                            </ButtonContainer>
                        </div>
                    </TopContainer>
                    <BottomContainer>
                        {selectItems()}
                    </BottomContainer>
                </BaseContainer>
            </ItemContext.Provider>
        </DndProvider>
    );
};

export default withRouter(SetTemplate);
