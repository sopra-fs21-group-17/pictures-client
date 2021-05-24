import React, {createContext, createRef, useEffect, useState} from "react";
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
import img from "./utils/wood_texture_background.jpg"
import { api, handleError } from "../../helpers/api";
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

const ButtonScroll = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 4px;
  padding-left:2px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 65px;
  text-align: center;
  color: white;
  width: 70px;
  height: 65px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: #303036;;
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


export const ItemContext = createContext({
    moveItem: null,
    markAsInventory: null,
    markAsSquareField: null,
    removeSelected: null,
    setSelected: null,
})

let maxamount;
let currentamount=0;

export const SetTemplate = () => {

    const [itemList, setItemList] = useState([    ]);
    const [pictureURL, setPictureURL] = useState("")
    const [currentRightIndex, setCurrentRightIndex] = useState(5)
    const [currentLeftIndex, setCurrentLeftIndex] = useState(0)

    //renders the arrows for rotation only for sticks&stones and buildingblocks
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

    //shows the reset board button but not to the strings set
    const showReset = () => {
        if((localStorage.getItem("mySet")) !== "STRINGS"){
            return (
                <Button onClick={() => {
                    fetchItems();
                }}>reset Board
                </Button>
            )
        }
    }

    //checks which board has to be displayed
    const selectBoard = () => {
        if((localStorage.getItem("mySet")) === "CUBES"){
            return (
                <GridBoard itemlist={itemList}></GridBoard>
            );
        } else {
            return (
                <FreeBoard itemlist={itemList}></FreeBoard>
            );
        }
    };

    const getPictureForUser = async () =>{
        try {
            const response = await api.get('/picture/'+localStorage.getItem("id"));
            //console.log(response.data.pictureLink);
            return response.data.pictureLink;

        }
        catch (error) {
            alert(`Something went wrong while getting picture: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        
        // let pic = getPictureForUser()
        // console.log(pic);
        // setPictureURL(pic);
        //console.log(getPictureForUser());

        setPictureURL(localStorage.getItem("myPicURL"))
        fetchItems();
    }, [])

    //copies the item list which is needed for the current set
    function fetchItems() {
        if((localStorage.getItem("mySet")) === "CUBES"){
            setItemList(JSON.parse(JSON.stringify(ItemsSet1)));
        } else if ((localStorage.getItem("mySet")) === "BLOCKS"){
            setItemList(JSON.parse(JSON.stringify(ItemsSet2)));
        }else if ((localStorage.getItem("mySet")) === "STICKS"){
            setItemList(JSON.parse(JSON.stringify(ItemsSet3)));
        }else if ((localStorage.getItem("mySet")) === "ICONS"){
            setItemList(JSON.parse(JSON.stringify(ItemsSet4)));
            currentamount=0;
            maxamount=5;
        }else {
            setItemList(JSON.parse(JSON.stringify(ItemsSet5)));
        }
    };

    //displays the icon cards
    function showIcons(){
        setCurrentLeftIndex(currentLeftIndex -1);
        {itemList
            .filter(item => item.location === 'inventory')
            .filter(item => item.amount > 0)
            .slice(currentLeftIndex, currentRightIndex)
            .map(item => (
                <ItemContainer>
                    <Item
                        key={item._id.toString()}
                        _id={item._id}
                        location={item.location}
                        color={item.color}
                        amount={item.amount}
                        style={item.style}
                        background={item.background}
                    />
                </ItemContainer>
            ))}
    }

    //decides which item to render based on given itemset
    const selectItems = () => {
        if((localStorage.getItem("mySet")) === "CUBES"){
            return (
                <Inventory>
                    {itemList
                        .filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0)
                        .map(item => (
                            <ItemContainer>
                                <Square
                                    key={item._id.toString()}
                                    _id={item._id}
                                    location={item.location}
                                    color={item.color}
                                    amount={item.amount}
                                />
                            </ItemContainer>
                        ))}
                </Inventory>
            );
        } else if ((localStorage.getItem("mySet")) === "STRINGS") {
            return null
        }else if ((localStorage.getItem("mySet")) === "ICONS"){
        return (
            <Inventory>
                <ButtonScroll
                    disabled={currentLeftIndex <= 0}
                    hidden = {currentLeftIndex === 0 || itemList.filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0).length <= 6}
                    style={{position: "absolute", left: "3.5%"}}
                    onClick={() =>{
                        if (currentLeftIndex <= 0){setCurrentLeftIndex(0)
                        }else{
                            setCurrentLeftIndex(currentLeftIndex  - 1);
                            setCurrentRightIndex(currentRightIndex - 1)}}}
                >
                    ◀
                </ButtonScroll>
                {itemList
                    .filter(item => item.location === 'inventory')
                    .filter(item => item.amount > 0)
                    .slice(currentLeftIndex, currentRightIndex)
                    .length < 5 && currentLeftIndex !== 0 ? (showIcons()):(
                        itemList
                            .filter(item => item.location === 'inventory')
                            .filter(item => item.amount > 0)
                            .slice(currentLeftIndex, currentRightIndex)
                            .map(item => (
                                <ItemContainer>
                                    <Item
                                      key={item._id.toString()}
                                      _id={item._id}
                                      location={item.location}
                                      color={item.color}
                                      amount={item.amount}
                                      style={item.style}
                                      background={item.background}
                                    />
                                </ItemContainer>
                        )))}
                <ButtonScroll
                    disabled={(currentRightIndex) >= itemList
                        .filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0).length}
                    display ={(itemList
                        .filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0).length <= 6)}
                    onClick={() => {if (currentRightIndex >= itemList.filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0).length){setCurrentRightIndex( itemList.filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0).length)}else{
                        setCurrentLeftIndex(currentLeftIndex  + 1);
                        setCurrentRightIndex(currentRightIndex + 1)}}
                    }
                    style={{position: "absolute", left: "90%"}}
                >
                    ▶
                </ButtonScroll>
            </Inventory>
        )
        }else {
            return (
                <Inventory>
                    {itemList
                        .filter(item => item.location === 'inventory')
                        .filter(item => item.amount > 0)
                        .map(item => (
                            <ItemContainer>
                                <Item
                                    key={item._id.toString()}
                                    _id={item._id}
                                    location={item.location}
                                    color={item.color}
                                    amount={item.amount}
                                    style={item.style}
                                    background={item.background}
                                />
                            </ItemContainer>
                        ))}
                </Inventory>
            );
        }
    }

    //rotates the items when the arrows are clicked
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

    //moves the item on the board
    const moveItem = (id, left, top) => {

        //gets the item from the itemlist
        const updatedItem = itemList.filter(item => item._id === id);

        //checks how many icons are on the board
        if(updatedItem[0].location==='inventory'&& maxamount!=null){
            currentamount=currentamount+1;
            if (currentamount>maxamount){

                // e.message  'zuviele Icons benutzt'
                alert("Only a maximum of 5 iconcards are allowed!");
                currentamount=currentamount-1;
                return;
        }}

        //marks the last moved item as selected
        const lastSelectedItem = itemList.filter((item) => item.selected === true);

        //creates a new item to add to the itemlist
        const newItem = {
            _id: setId(id),
            location: 'board',
            top: top,
            left: left,
            color: updatedItem[0].color,
            amount: updatedItem[0].amount-1,
            hideSourceOnDrag: true,
            style:updatedItem[0].style,
            background:updatedItem[0].background,
            selected: true,
            rotation: '0',
        };

        //updates which item is currently selected
        if(lastSelectedItem.length > 0){
            lastSelectedItem[0].selected = false;
            setItemList(itemList.filter((item) => item._id !== lastSelectedItem[0]._id).concat(lastSelectedItem[0]));
        }

        //updates the top and left of the icons whe moved
        if(updatedItem[0].location !== 'inventory'){
            updatedItem[0].left = left;
            updatedItem[0].top = top;
            updatedItem[0].selected = true;
            setItemList(itemList.filter((item) => item._id !== id).concat(updatedItem[0]));
        } else {
            updatedItem[0].amount = updatedItem[0].amount-1;
            setItemList(((itemList.filter(item => item._id < id).concat(updatedItem[0])).concat(itemList.filter(item => item._id > id))).concat(newItem));
        }
    };

    //creates a new id for the items and checks that its not used
    const setId = newId => {
        let i = newId
        while(itemList.filter(item => item._id === i).length > 0){
            i++;
        }
        return i;
    };

    const markAsInventory = _id => {
        currentamount=currentamount-1;
        //gets the item which was moved
        const movedItem = itemList.filter(item => item._id === _id);

        //gets the corresponding item in the inventory
        const inventoryItem = (itemList.filter(item => item.color === movedItem[0].color).filter(item => item._id <= 20));

        //creates new list without the item which was moved
        const newList = itemList.filter(item => item._id !== _id)

        //only apply changes when item is moved from board to inventory
        if(movedItem[0].location !== 'inventory'){
            inventoryItem[0].amount += 1;
            setItemList((newList.filter(item => item._id < inventoryItem[0]._id).concat(inventoryItem[0])).concat(newList.filter(item => item._id > inventoryItem[0]._id)));
        }
    };

    const markAsSquareField = (square,x) => {
        //gets the item that was moved
        const selectedItem = itemList.filter(item => item._id === square._id);

        //creates a new item
        const newSquare = {
            _id: setId(square._id),
            location: 'squarefield'+x,
            color: selectedItem[0].color,
            amount: selectedItem[0].amount-1,
        };

        //only applies changes if item moved to a empty square or the inventory
        if(itemList.filter(item => item.location === 'squarefield'+x).length === 0){
            if(square.location !== 'inventory'){
                selectedItem[0].location = 'squarefield'+x;
                setItemList(itemList.filter(item => item._id !== square._id).concat(selectedItem[0]));
            } else {
                selectedItem[0].amount = selectedItem[0].amount-1;
                setItemList(((itemList.filter(item => item._id < square._id).concat(selectedItem[0])).concat(itemList.filter(item => item._id > square._id))).concat(newSquare));
            }
        }
    };

    const history = useHistory();

    //sets the last moved item to not selected
    const removeSelected = () => {
        const SelectedItem = itemList.filter(item => item.selected === true);

        if(SelectedItem.length > 0){
            SelectedItem[0].selected = false;
            setItemList(itemList.filter((item) => item._id !== SelectedItem[0]._id).concat(SelectedItem[0]));
        };
    };

//hook for creating screenshot from html node
    const ref = createRef()
    const [screenshot, takeScreenshot] = useScreenshot()
    const GetImage = () =>{
        takeScreenshot(ref.current)}
    localStorage.setItem("screenshot",screenshot)

// create a screenshot,send it to the backend and switch to the GuessingScreen
    const putscreenshot = async () => {
        try {
            const requestBody = JSON.stringify(
                localStorage.getItem("screenshot")
            )
            // send it to the backend
            await api.put("/screenshot/" + localStorage.getItem("currentUsername"), requestBody);
        } catch (error) {
            alert(`Something went wrong while uploading the screenshot URL \n${handleError(error)}`);
        }
        localStorage.removeItem("isbuilding");
        // change to next screen
        history.push(`/GuessingScreen`)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <ItemContext.Provider value={{ markAsInventory, moveItem, markAsSquareField}}>
                <BaseContainer>
                    <TopContainer>
                        <div  style={{display: "flex", flexDirection: "column",  alignItems: "center"}}>
                            <BorderContainer ref={ref}>
                                <BoardContainer id="BoardContainer">
                                    {selectBoard()}
                                    <CustomDragLayer/>
                                </BoardContainer>
                            </BorderContainer>
                            {showReset()}
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
                                    fetchItems();
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
