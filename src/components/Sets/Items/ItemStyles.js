import styled from "styled-components";
import img from ".././wood_texture_background2.jpg"
import stoneimg from ".././stone_background.jpg"

export const Triangle = styled.div`
    border:2px solid black;
    top: 52%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
`;

export const Trianglecontainer = styled.div`
    position:relative;
    // z-index: 2;
    width: 5.7vw;
    height: 5.7vw;
    background:black;
    clip-path: polygon( 50% 10%, 0 100%, 100% 100%);
`;

export const Dice = styled.div`
    border:2px solid black;
    z-index: 3;
    position: absolute;
    width: 5vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
    margin: 10px;
`;

export const Circle = styled.div`
    border: 2px solid black;
    z-index: 3;
    position: absolute;
    height: 5vw;
    width: 5vw ;
    border-radius: 50%;
    background-image: url(${img});
    margin: 10px;
    cursor:move;
`;

export const ThickRectangle = styled.div`
    border: 2px solid black;
    z-index: 3;
    position: absolute;
    width: 10vw;
    height: 5vw;
    cursor:move;
    background-image: url(${img});
`;

export const ThinRectangle = styled.div`
    border: 2px solid black;
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
    border: 2px solid black;
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
    border-top: 2px solid black;
    border-right: 2px solid black;
    border-left: 2px solid black;
    z-index: 2;
    bottom: 0;
    left: 28%;
`;

export const Stone =styled.div`
    position: absolute;
    //transform: rotate(30deg);
    justifyContent: center;
    align-items: center;
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
    min-width: 15px;
    min-height: 50px;
    width: 1.3vw;
    height: 9vw;
    //transform: rotate(30deg);
    border: 2px solid black;
    cursor: move;
    display: flex;
    flexDirection: column;
    justifyContent: center;
    align-items: center;
    background-image: url(${img});
`;
