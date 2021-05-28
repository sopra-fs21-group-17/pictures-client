import {useEffect} from "react";
import { ItemsSet5 } from "../SetItemLists/ItemsSet5";

export const Rope = () => {

    //change these values to change the behaviour of the rope
    let GRAVITY = 0.0;
    let BOUNCE = 0.9;
    let FRICTION = 0.5;
    let canvas = document.getElementById("canvas");
    let mouseControl = false;

    let points = ItemsSet5[0].points,
        sticks = ItemsSet5[0].sticks;

    let oldpoint = null;

    useEffect(() => {
        createPoints();
    }, [])

    function createPoints() {
        //creating all the points of the rope and setting their initial position
        //changing the max value of i in the for loop changes the length of the rope
        for (let i = 0; i < 70; i++) {
            let newPoint = {
                x: canvas.width/2 + 10 * i,
                y: 10 + 10 * i,
                oldx: canvas.width/2 + 10 * i,
                oldy: 10 + 10 * i
            };
            points.push(newPoint);
            points[0].static = false;
            if (oldpoint) {
                let stick = {
                    p0: oldpoint,
                    p1: newPoint,
                    length: distance(oldpoint, newPoint)
                };
                sticks.push(stick);
            }
            oldpoint = newPoint;
        }
    }


    let mousePos;
    let point;

    canvas.addEventListener('mousemove', function (evt) {

        //gets the mouse position
        function getMousePos(board, event) {
            let rect = board.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        //sets the mouse position
        mousePos = getMousePos(canvas, evt);

        //moves the position of the point selected when mousecontrol is true
        if (mouseControl) {
            point.x = mousePos.x;
            point.y = mousePos.y;
        }
    });

    canvas.addEventListener('click', function (evt) {
        if(mouseControl){
            mouseControl = !mouseControl;
        } else {
            //selects the point closest to the mouse position
            let shortestDistance = 1000;
            for(let i = 0; i < points.length; i++){
                if(distance(points[i], mousePos) < shortestDistance){
                    shortestDistance = distance(points[i], mousePos);
                    point = points[i];
                }
            }
            //enables mousecontrol only if the mouse position is close enough to the point
            if(shortestDistance < 20){
                mouseControl = !mouseControl;
            }
        }
    });

    //calculates the distance between two points
    function distance(a, b) {
        try {
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        } catch (error){
            return 1000
        }

    }

    //updates the position of the lines when the rope is dragged
    function updateSticks() {
        for (let i = 0; i < sticks.length; i++) {
            let s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                movedDistance = Math.sqrt(dx * dx + dy * dy),
                difference = s.length - movedDistance,
                percent = difference / movedDistance;

            if (!s.p0.static && !s.p1.static) {
                percent /= 2;
            }

            let offsetX = dx * percent,
                offsetY = dy * percent;

            if (!s.p0.static || !s.p1.static) {
                if (!s.p0.static) {
                    s.p0.x -= offsetX;
                    s.p0.y -= offsetY;
                }
                if (!s.p1.static) {
                    s.p1.x += offsetX;
                    s.p1.y += offsetY;
                }
            }
        }
    }

    //updates the positions of the points when the rope is draqgged
    function movePoint(updatedPoint) {
        let vx = updatedPoint.x - updatedPoint.oldx;
        let vy = updatedPoint.y - updatedPoint.oldy;

        updatedPoint.oldx = updatedPoint.x;
        updatedPoint.oldy = updatedPoint.y;
        updatedPoint.x = updatedPoint.oldx + vx * FRICTION;
        updatedPoint.y = updatedPoint.oldy + vy * FRICTION;
    }

    //adds gravitational force
    function gravitatePoint(updatedPoint) {
        updatedPoint.y = updatedPoint.y + GRAVITY;
    }

    //moves all nonfixed points when the rope is dragged
    function animatePoints(newPoints) {
        for (let i = 0; i < newPoints.length; i++) {
            let movedPoint = newPoints[i];
            if (!movedPoint.static) {
                movePoint(movedPoint);
                gravitatePoint(movedPoint);
                correctPoint(movedPoint);
            }
        }
    }

    //moves points when rope is dragged
    function correctPoint(correctedPoint) {
        let diffX = (correctedPoint.x - correctedPoint.oldx);
        let diffY = (correctedPoint.y - correctedPoint.oldy);
        if (correctedPoint.x < 0) {
            correctedPoint.oldx = -correctedPoint.x + diffX * BOUNCE;
            correctedPoint.x = -correctedPoint.x;
        }
        if (correctedPoint.x > canvas.width) {
            correctedPoint.oldx = canvas.width - (correctedPoint.x - canvas.width) + diffX * BOUNCE;
            correctedPoint.x = canvas.width - (correctedPoint.x - canvas.width);
        }

        if (correctedPoint.y < 0) {
            correctedPoint.oldy = -correctedPoint.y + diffY * BOUNCE;
            correctedPoint.y = -correctedPoint.y;
        }
        if (correctedPoint.y > canvas.height) {
            correctedPoint.oldy = canvas.height - (correctedPoint.y - canvas.height) + diffY * BOUNCE;
            correctedPoint.y = canvas.height - (correctedPoint.y - canvas.height);
        }
    }

    //draws the rope on the canvas
    function drawPoints(context, finalPoints) {
        let i;
        context.beginPath();

        for (i = 1; i < finalPoints.length; i++) {
            context.beginPath();
            context.strokeStyle = "#000000";
            context.moveTo(finalPoints[i - 1].x, finalPoints[i - 1].y);
            context.lineWidth = 5;
            context.lineTo(finalPoints[i].x, finalPoints[i].y);
            context.stroke();
        }
     for (i=0; i<finalPoints.length; i++) {
       context.fillStyle="#898989";
       context.beginPath();
       context.arc(finalPoints[i].x,finalPoints[i].y, 2, 0, Math.PI*2);
       context.fill();
     }
    }

    //draws the rope on the canvas
    function update() {
        animatePoints(points);
        for (let i = 0; i < 50; i++) {
            updateSticks();
        }

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawPoints(canvas.getContext('2d'), points);
        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);

    return(null);
}
