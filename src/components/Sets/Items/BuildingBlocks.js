import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from '../../utils/Items';

const ThickRectangle = styled.div`
  position: absolute;
  width: 1vw;
  height: 5vw;
  background: beige;
  border: 2px solid black;
  cursor:move;
`;