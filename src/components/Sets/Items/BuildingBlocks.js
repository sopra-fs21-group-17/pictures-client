import styled from "styled-components";
import img from ".././wood_texture_background2.jpg"
import stoneimg from ".././stone_background.jpg"

export const ThickRectangle = styled.div`
  position: absolute;
  width: 1vw;
  height: 5vw;
  background: beige;
  border: 2px solid black;
  cursor:move;
`;
export const Formcontainer = styled.div`
    content:"";
    display:block;
    width:70%;
    height:70%;
    background-image: url(/*Path to your image*/);
    transform: rotate(-45deg);
    transform-origin:0 0;
    -ms-transform: rotate(-45deg);
    -ms-transform-origin:0 0;
    -webkit-transform: rotate(-45deg);
    -webkit-transform-origin:0 0;
    `;
export const Triangle = styled.div`
    z-index: 3;
    position: absolute;
    width: 5vw;
    height: 5vw;
    /* The points are: centered top, left bottom, right bottom */
    clip-path: polygon( 50% 10%, 0 100%, 100% 100%);
    background-image: url(${img});
    cursor:move;
 
    
    `;
export const Dice = styled.div`
    z-index: 3;
    position: absolute;
    width: 5vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
    margin: 10px;

    `;

export const Circle = styled.div`
    z-index: 3;
    position: absolute;
    height: 5vw;
    width: 5vw ;
    border-radius: 50%;
    background-image: url(${img});
    margin: 10px;
    cursor:move;
    

    `;
export const Rectangle = styled.div`
    z-index: 3;
    position: absolute;
    width: 10vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
    
    `;
export const ThinRectangle = styled.div`
    z-index: 3;
    position: absolute;
    width: 10vw;
    height: 2.5vw;
    cursor:move;
    background-image: url(${img});
    margin: 10px;

    `;

export const Bridgecontainer = styled.div`
    position: absolute;
    width: 10vw;
    height: 5vw;      
    background: inherit;
    margin: 10px;
    position:relative;
    cursor:move;

    
    `;

export const BridgeRectangle = styled.div`
    width: 10vw;
    height: 5vw;            
    position: relative;
    z-index: 1;
    background:inherit;
    background-image: url(${img});
    
    `;
export const Halfcircle = styled.div`
    position: absolute;
    height: 3vw;
    width:4.3vw;
    border-radius: 90px 90px 0 0;
    background: inherit;
    position:absolute;
    z-index: 2;
    bottom: 0;
    left: 28%;
    `;

export const Bridge = styled.div`
    width: 5vw;
    height: 5vw;
    cursor:move;
    clip-path: polygon(100% 0%, 59% 51%, 100% 100%, 25% 100%, 25% 51%, 25% 0%);
    background-image: url(${img});
    border-radius: %;    
    `;

export const Stone =styled.div`
    position: absolute;
    transform: rotate(30deg);
    
    width: 5vw;
    height: 2.7vw;
    background: red;
    border-radius: 100px / 50px;
    cursor:move;
    border: 2px solid black;
    background-image: url(${stoneimg});
`;
export  const Stick =styled.div`
    position: absolute;
    width: 1.3vw;
    height: 9vw;
    transform: rotate(30deg);
    border: 2px solid black;
    cursor: move;
    display: flex;
    flexDirection: column;
    justifyContent: center;
    background-image: url(${img});



`;

