// Start button and music setup
var backgroundMusic = document.getElementById("backgroundMusic");
var startScreen = document.getElementById("startScreen");
var startButton = document.getElementById("startButton");
var hasStarted = false;

console.log("Start button element:", startButton);
console.log("Start screen element:", startScreen);

startButton.addEventListener("click", function(e) {
    console.log("Heart button clicked!");
    e.preventDefault();
    e.stopPropagation();
    
    if (!hasStarted) {
        hasStarted = true;
        console.log("Starting sequence...");
        
        // Fade out start screen
        startScreen.style.opacity = "0";
        startScreen.style.pointerEvents = "none";
        
        setTimeout(function() {
            startScreen.style.display = "none";
            console.log("Start screen hidden");
        }, 500);
        
        // Start the music
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.muted = false;
            var playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    console.log("Music started");
                }).catch(function(error) {
                    console.log("Error playing music:", error);
                });
            }
        }
        
        // Start the animation loop
        console.log("Starting animation loop");
        window.requestAnimationFrame(draw);
    }
});

var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    // Simulate a successful action with a delay
    setTimeout(function() {
      button.textContent = "� Thank You! �";
    }, 1500);
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(50, window.innerWidth / 16); // Increased from 30 to 50 - larger text
    var lineHeight = 15; // Increased from 8 to 15 for better spacing

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Fast fades: 80 frames fade in, long display time, 80 frames fade out
    // Opacity increment for fast fades: 1/80 = 0.0125
    
    // Text 1: 3 lines, display 120 frames (total 280)
    if(frameNumber < 80){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["ყოველ დილით ვიღვიძებ", "და ვერ ვიჯერებ,", "თუ რამდენად იღბლიანი ვარ"], canvas.width/2, canvas.height/2 - 40, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 80 && frameNumber < 200){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["ყოველ დილით ვიღვიძებ", "და ვერ ვიჯერებ,", "თუ რამდენად იღბლიანი ვარ"], canvas.width/2, canvas.height/2 - 40, fontSize, lineHeight);
    }
    if(frameNumber >= 200 && frameNumber < 280){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["ყოველ დილით ვიღვიძებ", "და ვერ ვიჯერებ,", "თუ რამდენად იღბლიანი ვარ"], canvas.width/2, canvas.height/2 - 40, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 280){
        opacity = 0;
    }
    
    // Text 2: 3 lines, display 120 frames (total 280)
    if(frameNumber > 280 && frameNumber < 360){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მილიონობით", "ვარსკვლავებსა", "და გალაქტიკებს შორის"], canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 360 && frameNumber < 480){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მილიონობით", "ვარსკვლავებსა", "და გალაქტიკებს შორის"], canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
    }
    if(frameNumber >= 480 && frameNumber < 560){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მილიონობით", "ვარსკვლავებსა", "და გალაქტიკებს შორის"], canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 560){
        opacity = 0;
    }
    
    // Text 3: 4 lines, display 170 frames (total 330)
    if(frameNumber > 560 && frameNumber < 640){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["რომ ვარ ცოცხალი", "და მეძლევა შანსი", "ამ სიცოცხლის შენთან", "გატარებისა"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 640 && frameNumber < 810){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["რომ ვარ ცოცხალი", "და მეძლევა შანსი", "ამ სიცოცხლის შენთან", "გატარებისა"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
    }
    if(frameNumber >= 810 && frameNumber < 890){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["რომ ვარ ცოცხალი", "და მეძლევა შანსი", "ამ სიცოცხლის შენთან", "გატარებისა"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 890){
        opacity = 0;
    }
    
    // Text 4: 4 lines, display 170 frames (total 330)
    if(frameNumber > 890 && frameNumber < 970){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["იმდენად", "დაუჯერებელ და", "წარმოუდგენელ", "სიზმარს გავს"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 970 && frameNumber < 1140){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["იმდენად", "დაუჯერებელ და", "წარმოუდგენელ", "სიზმარს გავს"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
    }
    if(frameNumber >= 1140 && frameNumber < 1220){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["იმდენად", "დაუჯერებელ და", "წარმოუდგენელ", "სიზმარს გავს"], canvas.width/2, canvas.height/2 - 50, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 1220){
        opacity = 0;
    }
    
    // Text 5: 4 lines, display 170 frames (total 330)
    if(frameNumber > 1220 && frameNumber < 1300){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და მაინც, აქ ვარ", "და მიხარია რომ მაქვს", "შესაძლებლობა", "წამის შენთან გატარებისა"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 1300 && frameNumber < 1470){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და მაინც, აქ ვარ", "და მიხარია რომ მაქვს", "შესაძლებლობა", "წამის შენთან გატარებისა"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
    }
    if(frameNumber >= 1470 && frameNumber < 1550){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და მაინც, აქ ვარ", "და მიხარია რომ მაქვს", "შესაძლებლობა", "წამის შენთან გატარებისა"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 1550){
        opacity = 0;
    }
    
    // Text 6: 4 lines, display 170 frames (total 330)
    if(frameNumber > 1550 && frameNumber < 1630){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მიყვარხარ ანი,", "იმაზე მეტად ვიდრე", "დროისა და სივრცის", "დატევა შეუძლია ამ სამყაროს"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 1630 && frameNumber < 1800){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მიყვარხარ ანი,", "იმაზე მეტად ვიდრე", "დროისა და სივრცის", "დატევა შეუძლია ამ სამყაროს"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
    }
    if(frameNumber >= 1800 && frameNumber < 1880){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["მიყვარხარ ანი,", "იმაზე მეტად ვიდრე", "დროისა და სივრცის", "დატევა შეუძლია ამ სამყაროს"], canvas.width / 2, canvas.height / 2 - 50, fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }
    
    if(frameNumber == 1880){
        opacity = 0;
    }
    
    // Text 7: 6 lines, display 220 frames (total 380)
    if(frameNumber > 1880 && frameNumber < 1960){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და ერთი სული მაქვს", "როდის გავატარებ ჩემს", "მთელ დროს იმ სივრცესა", "და სამყაროში,", "რომელიც სავსე იქნება", "შენით"], canvas.width / 2, (canvas.height/2 - 60), fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 1960 && frameNumber < 2180){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და ერთი სული მაქვს", "როდის გავატარებ ჩემს", "მთელ დროს იმ სივრცესა", "და სამყაროში,", "რომელიც სავსე იქნება", "შენით"], canvas.width / 2, (canvas.height/2 - 60), fontSize, lineHeight);
    }
    if(frameNumber >= 2180 && frameNumber < 2260){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["და ერთი სული მაქვს", "როდის გავატარებ ჩემს", "მთელ დროს იმ სივრცესა", "და სამყაროში,", "რომელიც სავსე იქნება", "შენით"], canvas.width / 2, (canvas.height/2 - 60), fontSize, lineHeight);
        opacity = opacity - 0.0125;
    }

    if(frameNumber == 2260){
        opacity = 0;
    }
    
    // Text 8: 2 lines, STAYS ON SCREEN (never fades out)
    if(frameNumber > 2260 && frameNumber < 2340){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(["შენ ჩემი", "ყველაფერი ხარ <3"], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity = opacity + 0.0125;
    }
    if(frameNumber >= 2340){
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        drawTextWithLineBreaks(["შენ ჩემი", "ყველაფერი ხარ <3"], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    // Show the valentine scene after text stays for a bit
    if(frameNumber >= 2940){
        if (currentScene === 'intro') {
            showValentineScene();
        }
    }

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    // Clear the canvas with dark background
    context.fillStyle = "#111";
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
