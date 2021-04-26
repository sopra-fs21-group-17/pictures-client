import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from '../utils/Items';

const StickContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;

const style = {
    position: 'absolute',
    width: '1vw',
    height: '5vw',
    transform: 'rotate(20deg)',
    border: '2px solid black',
    backgroundColor: 'beige',
    cursor: 'move',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}

export const Stick = ({ _id, location, left, top, color, amount, hideSourceOnDrag, }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ITEM,
        item: { _id, location, left, top, color, amount },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [_id, location, left, top, color, amount]);

    function showAmount(){
        if(location === 'inventory'){
            return amount+'X';
        }
    }

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag}/>;
    }

    return (
        <StickContainer>
            <div ref={drag} style={{ ...style, location, left, top, amount }} role="Box">
                {showAmount()}
            </div>
        </StickContainer>
    );
}