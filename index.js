var userClickedPattern=[];  //dont make it const as we are reassigning or updating it in nextsequence
const colors=["red","blue","green","yellow"];
var pattern=[];     //not const as it is being updated afterwards
let level=0;

let first=true;
    $(document).keydown(function(){
        if(first){
            first=false;
            nextSequence();
        }
    });

//creating a sequence that the user has to follow
function nextSequence(){
     userClickedPattern=[]; 
     
     level++;
     $("h1").text("Level "+level);

     let num= Math.floor(Math.random()*4);
     pattern.push(colors[num]);
     $("#" + colors[num]).fadeIn(100).fadeOut(100).fadeIn(100);  //adding flash to the button
     
     playSound(colors[num]);

    }


//detecting what pattern user makes

$(".btn").click(function(){

    let chosenColor= $(this).attr("id");
    userClickedPattern.push(chosenColor);
    playSound(chosenColor);
    animateClick(chosenColor);
    
    checkAns(userClickedPattern.length-1);         //take example
});


// adding sound to all the buttons
function playSound(name){

    let voice=new Audio('sounds/'+name+'.mp3');
    voice.play();
}

//animating what button user clicks
function animateClick(currentKey){
   
    $("#"+currentKey).addClass("pressed");

    setTimeout(function(){
        $("#"+currentKey).removeClass("pressed");
        } , 100);
}

//checking if the pattern is correct
function checkAns(currentIndex){
     if(userClickedPattern[currentIndex]===pattern[currentIndex]){    //if the current button pressed is correct
        if(userClickedPattern.length===pattern.length){    //checking if the user has completed the full pattern
               
            setTimeout(function(){
                nextSequence();                       //calling nextsequence after a 1000 msec delay
                },1000);
        }
     }
     else{
        level=0;
        first=true;
        pattern=[];
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

     }
}




