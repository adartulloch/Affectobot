var JSSDK = JSSDK || {};
JSSDK.Assets = {
  wasm: {
    "affdex-native-bindings.wasm":
      "https://download.affectiva.com/js/wasm/affdex-native-bindings.wasm",
    "affdex-native-bindings.js":
      "https://download.affectiva.com/js/wasm/affdex-native-bindings.js",
    "affdex-native-bindings.data":
      "https://download.affectiva.com/js/wasm/affdex-native-bindings.data",
    "affdex-worker.js":
      "https://download.affectiva.com/js/wasm/affdex-worker.js",
  },
};

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var divRoot = document.querySelector("#affdex_elements");
var width = 640;
var height = 480;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();

// //Add a callback to notify when the detector is initialized and ready for runing.
// detector.addEventListener("onInitializeSuccess", function() {
//   log('#logs', "The detector reports initialized");
//   //Display canvas instead of video feed because we want to draw the feature points on it
//   document.querySelector("#face_video_canvas").style.display = "block";
//   document.querySelector("#face_video").style.display = "none";
// });

function log(node_name, msg) {
  console.log(msg);
}
onStart();


function onStart() {
  if (detector && !detector.isRunning) {
    detector.start(JSSDK.Assets.wasm);
  }
  log("#logs", "Clicked the start button");
}

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function () {
  log("#logs", "Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function () {
  log("#logs", "webcam denied");
  console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function () {
  log("#logs", "The detector reports stopped");
});

const mostFrequent = givenArray => {
  let counts = {};
  let maxValue = -1;
  let maxItem = null;
  for (const num of givenArray) {
    if (!(num in counts)) {
      counts[num] = 1;
    } else {
      counts[num] = counts[num] + 1;
    }
    if (counts[num] > maxValue) {
      maxValue = counts[num];
      maxItem = num;
    }
  }
  return maxItem;
};

var emojiArray = [];
var attentionArray = [];
var lastTimestamp = 0;
var lastCalloutTimestamp = 0;
var lastCalloutCheckTimestamp = 0;
var queueAverageLength = 15;
var noFaceArray = []

detector.addEventListener("onImageResultsSuccess", function (
  faces,
  image,
  timestamp
) {

  if (faces.length > 0) {
    $("#emotionDisplay").html(faces[0].emojis.dominantEmoji)

    attentionArray.push(faces[0].expressions.attention);
    if(attentionArray.length > queueAverageLength){
      attentionArray.shift()
      let attentionAverage = attentionArray.reduce((a, b) => a + b) / attentionArray.length;
      if(attentionAverage <= 75){
        lastCalloutTimestamp = timestamp
        $("#lookAtCamera").css("display", "block");
      } else {
        $("#lookAtCamera").css("display", "none");
      }
    }
    

    emojiArray.push(faces[0].emojis.dominantEmoji);
    if(emojiArray.length >= 5){
      emojiArray.shift()
      let averageEmoji = mostFrequent(emojiArray)
      $("#emotionDisplay").html(averageEmoji)
    } else{

      if(faces.length===0){
        noFaceArray.push(0)
      } else{
        noFaceArray.push(1)
      }
    }

    //   if(noFaceArray.length > queueAverageLength){
    //     let noFaceAve = noFaceArray.reduce((a, b) => a + b) / attentionArray.length;
    //     if(noFaceAve > 0.5){
    //       $("#lookAtCamera").css("display", "none");
    //     } else {
    //       $("#lookAtCamera").css("display", "block");
    //     }
    
    //   }
    // }

    //DEPRECATED - CALLOUT ROLLING AVERAGE
    //emojiArray.push(faces[0].emojis.dominantEmoji);
    // if(timestamp - lastCalloutCheckTimestamp >= 5){
    //   lastCalloutCheckTimestamp = timestamp;
    //   let average = attentionArray.reduce((a, b) => a + b) / attentionArray.length;
    //   console.log(attentionArray.length)
    //   if(average <= 65){
    //     lastCalloutTimestamp = timestamp
    //     $("#lookAtCamera").css("display", "block");
    //   }
    //   attentionArray = []
    // }
    // if(faces[0].expressions.attention <= 65 && timestamp - lastCalloutTimestamp >= 10){
    //   lastCalloutTimestamp = timestamp
    //   $("#lookAtCamera").css("display", "block");
    // }
    // if(timestamp - lastCalloutTimestamp >=5){
    //   $("#lookAtCamera").css("display", "none");
    // }

    // if(faces[0].expressions.attention <= 65 && timestamp - lastCalloutTimestamp >= 10){
    //   lastCalloutTimestamp = timestamp
    //   $("#lookAtCamera").css("display", "block");
    // }


    //EMOJI ROLLING AVERAGE CODE
    // if (timestamp - lastTimestamp >= 1) {
    //   lastTimestamp = timestamp;
    //   // const datapoints = emojiArray.length;
    //   // const summedEmojis = emojiArray.reduce((acc, emoji) => {
    //   //   console.log(emoji)
    //   //   Object.keys(emoji).map((attribute)=>{
    //   //     if(!isNaN(emoji[attribute])){
    //   //       acc[attribute] += emoji[attribute]
    //   //     }
    //   //   })
    //   //   return acc
    //   // }, {
    //   //   disappointed: 0,
    //   //   flushed: 0,
    //   //   kissing: 0,
    //   //   laughing: 0,
    //   //   rage: 0,
    //   //   relaxed: 0,
    //   //   scream: 0,
    //   //   smiley: 0,
    //   //   smirk: 0,
    //   //   stuckOutTongue: 0,
    //   //   stuckOutTongueWinkingEye: 0,
    //   //   wink: 0,
    //   // });
    //   // console.log(summedEmojis)
    //   //$("#emotionDisplay").html(mostFrequent(emojiArray));
    //   $("#emotionDisplay").html(faces[0].emojis.dominantEmoji)
    //   emojiArray = []
    // }
  }
  setTimeout(detector.captureNextImage, 150);
});
