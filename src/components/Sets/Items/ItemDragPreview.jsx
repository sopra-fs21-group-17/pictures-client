import { memo } from "react";
import { Item } from "./Item"

export const ItemDragPreview = memo(function ItemDragPreview({ rotation, top, left, style, background }) {
    return (
        <div style={{display: "inline-block", transform: "rotate("+rotation+"deg)", top: top, left: left, WebkitTransform: "rotate("+rotation+"deg)"}}>
            <Item preview style={style} background={background}/>
        </div>
    );
});
