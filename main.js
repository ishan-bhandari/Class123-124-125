function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(700, 650);
    canvas.position(550, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nosex=" + noseX + " nosey=" + noseY);
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristx=" + leftWristX + " rightWristx=" + rightWristX + " difference" + difference);


    }
}

function modelLoaded() {
    console.log('Posenet is initialized');
}

function draw() {
    background('#f2ff00');
    document.getElementById("square_sides").innerHTML = "width and height of a square is " + difference + "px";
    fill('#110dff');
    stroke('#110dff');
    square(noseX, noseY, difference);

}