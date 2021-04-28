import styled from "styled-components";
import img from ".././wood_texture_background2.jpg"

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
    width: 5vw;
    height: 5vw;
    /* The points are: centered top, left bottom, right bottom */
    clip-path: polygon( 50% 10%, 0 100%, 100% 100%);
    background-image: url(${img});
    cursor:move;
    margin: 10px;
    
    `;
export const Dice = styled.div`
    width: 5vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
    margin: 10px;

    `;

export const Circle = styled.div`
    height: 5vw;
    width: 5vw ;
    border-radius: 50%;
    background-image: url(${img});
    margin: 10px;
    
    cursor:move;
    

    `;
export const Rectangle = styled.div`
    width: 10vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
    
    `;
export const ThinRectangle = styled.div`
    width: 10vw;
    height: 2.5vw;
    cursor:move;
    background-image: url(${img});
    margin: 10px;

    `;

export const Bridgecontainer = styled.div`
    width: 10vw;
    height: 5vw;      
    background-color: inherit;
    

    
    `;

export const BridgeRectangle = styled.div`
    width: 10vw;
    height: 5vw;            
    position: relative;
    z-index: 1;
    background-image: url(${img});
    `;
export const Halfcircle = styled.div`
    height:45px;
    width:90px;
    border-radius: 90px 90px 0 0;
    background:green;
    position:absolute;
    z-index: 2;
    `;

export const Bridge = styled.div`
    width: 5vw;
    height: 5vw;
    cursor:move;
    clip-path: polygon(100% 0%, 59% 51%, 100% 100%, 25% 100%, 25% 51%, 25% 0%);
    background-image: url(${img});
    border-radius: %;    
    `;

