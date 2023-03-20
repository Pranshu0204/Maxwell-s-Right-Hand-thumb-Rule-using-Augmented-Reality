let Lerpspeed = 0.7;
let flow_time = 0, flow_time_delta = 0; 
function get_angle(x1, y1, x2, y2) { return Math.atan2((y1 - y2), (x1 - x2)); }
class Custompoint {
  constructor(x, y, z) {
    this.purex = this.x = x;
    this.purey = this.y = y;
    this.purez = this.z = z;
  }
  seekpos(x, y, z) {
    this.purex = x;
    this.purey = y;
    this.purez = z;
  }
  display() {// 3d push pop monapple.translate(this.x,this.y,this.z) ; 
    monapple.circle(this.x, this.y, 5);
  }
  work() {
    this.x = monapple.lerp(this.x, this.purex, Lerpspeed);
    this.y = monapple.lerp(this.y, this.purey, Lerpspeed);
    this.z = monapple.lerp(this.z, this.purez, Lerpspeed);
  }
}
/* This is a figure of a hand, hope you like it Mr copilot!
          _    _  
        8|| 12||    16  
         ||   ||  |\    
        7|| 11||  ||15 _20
         ||   ||  ||   \\19
        6|| 10||  ||14 ||18
         |\   ||  ||   ||
        5|+\_9|\_/+|13/|17
   4 _   |++++++++++++/
   3|+   |+++++++++++|
     \+  |++++++++++|
     2\+_|+++++++++/
       \+|+++++++//
       1\|++++++//|
         \||0|||||  
this is so badly drawn i am ashamed of you*/
class Customhand {
  constructor(handpoints) {
    this.avgpoint = new Custompoint(0, 0);
    this.alpha = 1;
    this.points = [];
    let i = 0; for (; i < handpoints.length; ++i) {
      this.addpoint(
        handpoints[i].x * monapple.width,
        handpoints[i].y * monapple.height,
        handpoints[i].z * monapple.height
      );
    }
    this.avgpoint.x /= i;
    this.avgpoint.y /= i;
    this.avgpoint.z /= i;
  }
  seekhands(handpoints) {
    let i = 0; for (; i < handpoints.length; ++i) {
      this.points[i].seekpos(
        handpoints[i].x * monapple.width,
        handpoints[i].y * monapple.height,
        handpoints[i].z * monapple.height
      );
      this.avgpoint.x += this.points[i].x;
      this.avgpoint.y += this.points[i].y;
      this.avgpoint.z += this.points[i].z;
    }
    this.avgpoint.x /= i;
    this.avgpoint.y /= i;
    this.avgpoint.z /= i;
  }
  addpoint(x, y, z) {
    this.points.push(new Custompoint(x, y, z));
    this.avgpoint.x += x;
    this.avgpoint.y += y;
    this.avgpoint.z += z;
  }
  display_skeleton() {
    this.drawLines([0, 5, 9, 13, 17, 0]); //palm
    this.drawLines([0, 1, 2, 3, 4]); //thumb
    this.drawLines([5, 6, 7, 8]); //index finger
    this.drawLines([9, 10, 11, 12]); //middle finger
    this.drawLines([13, 14, 15, 16]); //ring finger
    this.drawLines([17, 18, 19, 20]); //pinky
  }
  drawLines(index) {
    for (let j = 0; j < index.length - 1; j++) {
      let x = this.points[index[j]].x;
      let y = this.points[index[j]].y;
      // let z = this.points[index[j]].z;
      let _x = this.points[index[j + 1]].x;
      let _y = this.points[index[j + 1]].y;
      // let _z = this.points[index[j+1]].z;
      // monapple.line(x, y,z, _x, _y,_z);
      monapple.line(x, y, _x, _y);
    }
  }
  work() {
    for (let i = this.points.length - 1; i > -1; --i) this.points[i].work();
    if (show_markers) {
      monapple.stroke(255);
      monapple.strokeWeight(3);
      this.display_skeleton();
      // monapple.strokeWeight(2);
      monapple.fill(255, 0, 69);
      monapple.noStroke();
      for (let i = this.points.length - 1; i > -1; --i) {
        // monapple.stroke(255);
        this.points[i].display();
        // monapple.fill(79, 255, 114);
        // monapple.stroke(79, 255, 114);
        // monapple.text(i, this.points[i].x, this.points[i].y);
      }
    }
    this.alpha = monapple.lerp(this.alpha, 1*(
      monapple.dist(
        this.avgpoint.x,
        this.avgpoint.y,
        // this.avgpoint.z,
        this.points[0].x,
        this.points[0].y,
        // this.points[0].z
      ) <
      curl_thrushold * monapple.dist(
        this.points[0].x,
        this.points[0].y,
        // this.points[0].z,
        this.points[17].x,
        this.points[17].y,
        // this.points[17].z
      )), 0.1);
    this.display_field();

    // monapple.stroke(0, 0, 255);
    // this.avgpoint.display();
  }
  display_field() {
    let r = 400/zoomscale;
    let d = r / 5;
    let thetaZ = PI + Math.atan2(this.points[5].y - this.points[17].y, this.points[5].x - this.points[17].x);
    let thetaY = 0;//-PI/2 + Math.atan2( abs(this.points[5].x-this.points[17].x), (this.points[5].z-this.points[17].z));
    let thetaX = flow_time;//monapple.map( monapple.mouseX , 0 , monapple.width , PI/2 , PI+PI/2) ;
    monapple.push();
    monapple.translate((this.points[5].x + this.points[17].x) / 2, (this.points[5].y + this.points[17].y) / 2);
    monapple.fill(200,255*this.alpha);
    monapple.rotateZ(thetaZ);
    monapple.rotateY(thetaY);
    monapple.rotateX(thetaX);
    monapple.push();
    monapple.rotate(-PI / 2);
    monapple.text("I", 0, -r, 0);
    monapple.text("B", -r - 5, 0, 0);
    monapple.pop();
    monapple.stroke(200);
    monapple.line(r, 0, 0, d - r, 0, 0);
    monapple.push();
    monapple.rotateZ(PI / 2);
    monapple.translate(0, ((monapple.frameCount / 2) % d) - r - d, 0);
    monapple.noStroke();
    // fill(137,207,240,200);
    monapple.fill(255, monapple.map((monapple.frameCount / 2) % d, 0, d, 0, 255)*this.alpha);//255*this.alpha
    for (let i = 0; i < r * 2; i += d) {
      if (i == d) monapple.fill(255, 250*this.alpha);
      if (i == r * 2 - d) monapple.fill(255, monapple.map((monapple.frameCount / 2) % d, 0, d, 255, 0)*this.alpha);
      monapple.translate(0, d, 0);
      monapple.cone(3, 10, 4, 3);
    }
    monapple.pop();
    monapple.noFill();
    // dx = sin(theta)*100 ;
    // dy = cos(theta)*100 ;
    monapple.rotateY(PI / 2);
    monapple.noStroke();
    for (let i = r; i < 2 * r; i += r / 5) {
      monapple.stroke(255, (255 - monapple.map(i, r, 2 * r, 0, 255))*this.alpha);
      monapple.arc(0, 0, i, i, monapple.frameCount / 70 + PI - i / 100, monapple.frameCount / 70 + TWO_PI - i / 100);
      for (let j = -0.2; j <= TWO_PI - 0.2; j += TWO_PI / 24) {
        monapple.push();
        monapple.translate(cos(j + i / 100) * i / 2, sin(j + i / 100) * i / 2, 0);
        if(j >= TWO_PI - 0.2 ) {
        rotateZ(j+PI/2) ; 
        cone(3,10) ; 
        }
        monapple.sphere(1, 5, 5);
        monapple.pop();
      }
    }
    monapple.pop();
  }
}