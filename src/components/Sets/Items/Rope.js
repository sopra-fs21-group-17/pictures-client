export const Rope = () => {

    //change these values to change the behaviour of the rope
    let GRAVITY = 0.0;
    let BOUNCE = 0.9;
    let FRICTION = 0.5;
    let canvas = document.getElementById("canvas");
    console.log(canvas);
    let mouseControl = false;

    let points = [],
        sticks = [];

    let oldpoint = null;

    //creating all the points of the rope and setting their initial position
    //changing the max value of i in the for loop changes the length of the rope
    for (let i = 0; i < 70; i++) {
        let point = {
            x: 100 + 10 * i,
            y: 100 + 10 * i,
            oldx: 100 + 10 * i,
            oldy: 100 + 10 * i
        };
        points.push(point);
        points[0].static = false;
        if (oldpoint) {
            let stick = {
                p0: oldpoint,
                p1: point,
                length: distance(oldpoint, point)
            };
            sticks.push(stick);
        }
        oldpoint = point;
    }

    let mousePos;
    let point;

    canvas.addEventListener('mousemove', function (evt) {

        //gets the mouse position
        function getMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
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
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //updates the position of the lines when the rope is dragged
    function updateSticks() {
        for (let i = 0; i < sticks.length; i++) {
            let s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                distance = Math.sqrt(dx * dx + dy * dy),
                difference = s.length - distance,
                percent = difference / distance;

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
    function movePoint(point) {
        let vx = point.x - point.oldx;
        let vy = point.y - point.oldy;

        point.oldx = point.x;
        point.oldy = point.y;
        point.x = point.oldx + vx * FRICTION;
        point.y = point.oldy + vy * FRICTION;
    }

    //adds gravitational force
    function gravitatePoint(point) {
        point.y = point.y + GRAVITY;
    }

    //moves all nonfixed points when the rope is dragged
    function animatePoints(points) {
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (!point.static) {
                movePoint(point);
                gravitatePoint(point);
                correctPoint(point);
            }
        }
    }

    //moves points when rope is dragged
    function correctPoint(point) {
        let diffX = (point.x - point.oldx);
        let diffY = (point.y - point.oldy);
        if (point.x < 0) {
            point.oldx = -point.x + diffX * BOUNCE;
            point.x = -point.x;
        }
        if (point.x > canvas.width) {
            point.oldx = canvas.width - (point.x - canvas.width) + diffX * BOUNCE;
            point.x = canvas.width - (point.x - canvas.width);
        }

        if (point.y < 0) {
            point.oldy = -point.y + diffY * BOUNCE;
            point.y = -point.y;
        }
        if (point.y > canvas.height) {
            point.oldy = canvas.height - (point.y - canvas.height) + diffY * BOUNCE;
            point.y = canvas.height - (point.y - canvas.height);
        }
    }

    //draws the rope on the canvas
    function drawPoints(context, points) {
        let i;
        context.beginPath();

        for (i = 1; i < points.length; i++) {
            context.beginPath();
            context.strokeStyle = "#000000";
            context.moveTo(points[i - 1].x, points[i - 1].y);
            context.lineWidth = 5;
            context.lineTo(points[i].x, points[i].y);
            context.stroke();
        }
     for (i=0; i<points.length; i++) {
       context.fillStyle="#898989";
       context.beginPath();
       context.arc(points[i].x,points[i].y, 2, 0, Math.PI*2);
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
