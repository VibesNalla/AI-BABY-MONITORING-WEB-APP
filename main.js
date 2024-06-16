vid = "";
objects = [];
status = "";
function setup()
{
canvas = createCanvas(480, 380);
canvas.center();
}

function draw()
    {
image(vid,0,0,480,380);
if (status != "") {
    objectDetector.detect(vid, gotResult);
    for(i = 0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "status: Objects Detected"; 
        document.getElementById("number_of_objects").innerHTML = "number_of_objects: "+ objects.length;
        fill("red");
        percent = Math.floor(objects[i].confidence*100);
        text(objects[i].label + " "+percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
    }

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

    function preload()
    {
        vid = createVideo('video.mp4');
        vid.hide();
    }

    function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "status: Detecting Objects"
    }

    function modelLoaded() {
        console.log("Model is loaded");
        status = true;
        vid.loop();
        vid.speed(1);
        vid.volume(1);
    }
