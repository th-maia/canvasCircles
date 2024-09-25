const canvas = document.querySelector("canvas");

console.log(canvas);

canvas.width = innerWidth - 3; // or window.innerWidth  this is the width of the screen
canvas.height = innerHeight - 3; // or window.innerheight this is the height of the screen

const c = canvas.getContext("2d");

//random hexdecimal color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// create a circle
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = getRandomColor()
  
  // draw the circle on the screen
  this.draw = function () { //
    c.beginPath(); //needed to draw
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //draw circle form
    c.strokeStyle = this.color;
    c.stroke();// put on the screen the round lined circle.
    //c.fillStyle = this.color; if you wanna do circles filled with color.
    //c.fill()
  };
  
  // move the x and y positions of the circles and redraw.
  this.update = function () {
    // when touch on the end of screen change direction
    if(this.x + this.radius > innerWidth -3 || this.x - this.radius < 0) { 
      this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight -3 || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
  
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
};

let numberOfCircles = 200;
let circleArray = [];

// number of circles
for(let i = 0; i < numberOfCircles; i += 1) {
  
  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;
  let radius = 30;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;

  circleArray.push(new Circle(x, y, dx, dy, radius));
};

console.log(circleArray);

//do the animation clear the screen, doing update position
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight); //clear the screen
  for(let i = 0; i < circleArray.length; i += 1) {
    circleArray[i].update();
  }
}

animate();