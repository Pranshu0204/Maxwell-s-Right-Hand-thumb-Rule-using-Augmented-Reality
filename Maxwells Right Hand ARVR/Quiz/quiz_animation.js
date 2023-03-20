function display_field(p) {
    // let v0 = p.createVector(this.points[5].x, this.points[5].y,0);
    // let v1 = p.createVector(this.points[17].x, this.points[17].y,0);
    let r = 80;
    let d = r / 5;
    let thetaX = p.frameCount / 100; //map( mouseX , 0 , width , PI/2 , PI+PI/2) ;
    // let dx = cos(theta)*r ;
    // let dy = sin(theta)*r ;
    p.push();
    p.translate(0, 0);
    p.rotateZ(thetaZ + p.offz);
    p.rotateY(thetaY + p.offy);
    p.rotateX(thetaX * p.offx);
    if (p.choice_selected) {
        p.stroke(200);
        p.line(r, 0, 0, d - r, 0, 0);
        p.push();
        p.rotateZ(PI / 2);
        p.translate(0, ((p.frameCount / 2) % d) - r - d, 0);
        p.noStroke();
        // fill(137,207,240,200);
        p.fill(255, p.map((p.frameCount / 2) % d, 0, d, 0, 255));
        for (let i = 0; i < r * 2; i += d) {
            if (i == d) p.fill(255, 250);
            if (i == r * 2 - d) p.fill(p.map((p.frameCount / 2) % d, 0, d, 255, 0));
            p.translate(0, d, 0);
            p.cone(3, 10, 4, 3);
        }
        p.pop();
    }
    p.noFill();
    // dx = sin(theta)*100 ;
    // dy = cos(theta)*100 ;
    p.rotateY(PI / 2);
    p.noStroke();
    for (let i = r; i < 2 * r; i += r / 5) {
        p.stroke(255, 255 - p.map(i, r, 2 * r, 0, 255));
        p.arc(0, 0, i, i, (p.frameCount / 70 + PI - i / 100)* p.offx, (p.frameCount / 70 + TWO_PI - i / 100)* p.offx);
        for (let j = -0.2; j <= TWO_PI - 0.2; j += TWO_PI / 24) {
            p.push();
            p.translate(cos(j + i / 100) * i / 2, sin(j + i / 100) * i / 2, 0);
            // if(j >= TWO_PI - 0.2 ) {
            // rotateZ(j+PI/2) ; 
            // cone(3,10) ; 
            // }
            p.sphere(1, 5, 5);
            p.pop();
        }
    }
    p.pop();
}

function cos(x) {
    return Math.cos(x);
}
function sin(x) {
    return Math.sin(x);
}


function display_wire(p) {
    let r = 130;
    let d = r / 5;
    let thetaX = p.frameCount / 100; //map( mouseX , 0 , width , PI/2 , PI+PI/2) ;
    p.push();
    p.rotateZ(thetaZ);
    p.rotateY(thetaY);
    p.rotateX(thetaX);
    p.stroke(200);
    p.line(r, 0, 0, d - r, 0, 0);
    p.push();
    p.rotateZ(PI / 2);
    p.translate(0, ((p.frameCount / 2) % d) - r - d, 0);
    p.noStroke();
    // fill(137,207,240,200);
    p.fill(255, p.map((p.frameCount / 2) % d, 0, d, 0, 255));
    for (let i = 0; i < r * 2; i += d) {
        if (i == d) p.fill(255, 250);
        if (i == r * 2 - d) p.fill(p.map((p.frameCount / 2) % d, 0, d, 255, 0));
        p.translate(0, d, 0);
        p.cone(3, 10, 4, 3);
    }
    p.pop();
}