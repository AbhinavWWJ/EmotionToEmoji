prediction_1="";
prediction_2="";
Webcam.set({
    width:300,
    height:300,
    image_format: 'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_Snapshot(){
    Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML= '<img src="'+data_uri+'" id="captured_image">';
    });
}
console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pF22UtFuY/model.json', modelLoaded);

function modelLoaded(){
    console.log('model Loaded');
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data_1="The first prediction is" + prediction_1;
    speak_data_2="The second prediction is" + prediction_2;
    var utterthis= new SpeechSynthesisUtterance(speak_data_1+ speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label== "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128515;";
        }
        if(results[0].label== "Sad"){
            document.getElementById("update_emoji").innerHTML="&#x1F614;";
        }
        if(results[0].label== "Angry"){
            document.getElementById("update_emoji").innerHTML="&#x1F621;";
        }
        if(results[1].label== "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128515;";
        }
        if(results[1].label== "Sad"){
            document.getElementById("update_emoji2").innerHTML="&#x1F614;";
        }
        if(results[1].label== "Angry"){
            document.getElementById("update_emoji2").innerHTML="&#x1F621;";
        }
    }

}