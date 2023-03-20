let text_font;
const choice_width = 200;
const choice_height = 150;
const monapple_width = 400;
const monapple_height = 200;
let choice_index = 0;
let zoom_scale = 2;
const PI = 3.14159265;
const TWO_PI = 2 * PI;
let thetaY, thetaZ;
let sketch_maker = function (p) {
    p.preload = function () {
        text_font = p.loadFont("../rockfont.ttf");
    }
    p.setup = function () {
        document.getElementById("div_monapple").appendChild(p.createCanvas(monapple_width, monapple_height, p.WEBGL).addClass("monapple").elt);
        p.pixelDensity(1);
        p.fill(255, 0, 69);
        p.stroke(255, 0, 69);
        p.textSize(20);
        p.textFont(text_font);
    }
    p.draw = function () {
        // p.background(30);
        p.clear();
        display_wire(p);
    }
}
let choice_sketch_maker = function (p) {
    p.setup = function () {
        document.getElementById("div_choice" + (choice_index++ < 2 ? "12" : "34")).appendChild(p.createCanvas(choice_width, choice_height, p.WEBGL).addClass("quiz_choice").elt);
        p.pixelDensity(1);
        p.textFont(text_font);
        p.fill(255, 0, 69);
        // p.stroke(255, 0, 69);
        p.textSize(20);
        p.textAlign(p.CENTER, p.CENTER);
        p.choice_selected = false;
    }
    p.draw = function () {
        // p.background(40);
        p.clear();
        display_field(p);
        if (p.choice_selected) {
            // p.text(Math.floor(p.frameRate()), 0,0) ;
            p.alpa = p.lerp(p.alpa, 255, 0.1);
            p.fill(p.choice_correct ? 0 : 255, p.choice_correct ? 255 : 0, 69, p.alpa);
            p.text(p.choice_correct ? "CORRECT!" : "INCORRECT", 0, p.height / 3);
        }
    }
    p.mousePressed = function () {
        if (p.mouseX < p.width * zoom_scale && p.mouseX > 0 && p.mouseY > 0 && p.mouseY < p.height * zoom_scale) {
            p.choice_selected = true;
            if (p.choice_correct) {
                quiz_text.innerHTML = "Great!";
            }
            else {
                if (quiz_text.innerHTML === "Great!" || quiz_text.innerHTML === "You already were correct, click reset to retry!")
                    quiz_text.innerHTML = "You already were correct, click reset to retry!";
                else quiz_text.innerHTML = "Try again, that is wrong!";
            }
        }
    }
}
const monapple = new p5(sketch_maker);
const quiz_one = new p5(choice_sketch_maker);
const quiz_two = new p5(choice_sketch_maker);
const quiz_three = new p5(choice_sketch_maker);
const quiz_four = new p5(choice_sketch_maker);
const quiz_choice_array = [quiz_one, quiz_two, quiz_three, quiz_four];
const quiz_text = document.getElementById("quiz_text");

function setup_quiz() {
    for (let i = 0; i < quiz_choice_array.length; i++) {
        quiz_choice_array[i].choice_correct = false;
        quiz_choice_array[i].choice_selected = false;
        quiz_choice_array[i].alpa = 0;
        quiz_choice_array[i].offy = Math.random() * TWO_PI;
        quiz_choice_array[i].offz = Math.random() * TWO_PI;
        quiz_choice_array[i].offx = Math.random() > 0.5 ? 1 : -1;

    }
    thetaY = Math.random() * TWO_PI;
    thetaZ = Math.random() * TWO_PI;
    let correct_choice = Math.floor(Math.random() * 4);
    quiz_choice_array[correct_choice].choice_correct = true;
    quiz_choice_array[correct_choice].offy = 0;
    quiz_choice_array[correct_choice].offz = 0;
    quiz_choice_array[correct_choice].offx = 1;
    quiz_text.innerHTML = "Which direction will the current flow in?";
}
setup_quiz();
// setTimeout(setup_quiz,100);