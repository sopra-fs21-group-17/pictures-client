import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from '../../utils/Items';

const StickContainer = styled.div`
  position: absolute;
  width: 1vw;
  height: 5vw;
  transform: rotate(20deg);
  background: beige;
  font-size: 26px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  cursor:move;
  text-align: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;

export const Stick = ({ id, left, top, hideSourceOnDrag, children, }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.STICK,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    if (isDragging && hideSourceOnDrag) {
        return <StickContainer ref={drag}/>;
    }

    return (<StickContainer ref={drag} style={{  left, top }} role="Box">
        {children}
    </StickContainer>);
}