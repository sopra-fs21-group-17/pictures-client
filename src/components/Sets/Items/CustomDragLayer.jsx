import {useDragLayer} from "react-dnd";
import {ItemDragPreview} from "./ItemDragPreview";
import {ItemTypes} from "../utils/Items";

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

//translates the dragpreview based on the mouseposition
function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }

    let { x, y } = currentOffset;
    const transform = `translate(${x-(window.outerWidth/20)}px, ${y+(window.outerHeight/20)}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

export const CustomDragLayer = (props) => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    //renders the dragpreview
    function renderItem() {
        switch (itemType) {
            case ItemTypes.ITEM:
                return <ItemDragPreview rotation={item.rotation} style={item.style} background={item.background}/>;
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div>
    );
};