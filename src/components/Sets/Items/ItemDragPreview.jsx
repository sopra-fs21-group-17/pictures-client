import { memo } from "react";
import { Item } from "./Item"

export const ItemDragPreview = memo(function ItemDragPreview({ rotation, top, left, style, background }) {

    //the style of the drag preview is defined here
    //it currently takes the style of the currently dragged item and applies the same rotation to it

    return (
        <div style={{display: "inline-block", transform: "rotate("+rotation+"deg)", top: top, left: left, WebkitTransform: "rotate("+rotation+"deg)"}}>
            <Item preview style={style} background={background}/>
        </div>
    );
});
