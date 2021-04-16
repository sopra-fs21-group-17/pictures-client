import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from '../utils/Items';

const SquareContainer = styled.div`
  width: 5vw;
  height: 5vw;
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
  cursor:move;
`;

export const Square = props => {

    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.SQUARE,
        item: {
        type: ItemTypes.SQUARE,
        id: props._id},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <SquareContainer
            style={{background: props.color}}
            ref={drag}
            opacity={isDragging ? '0.5' : '1'}>
            {props.amount}X
        </SquareContainer>
    )
}