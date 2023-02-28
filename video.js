import { navbar } from "./componants/navbar.js";

document.getElementById('nav').innerHTML=navbar();

const showClickedVideo = () => {

    let data = localStorage.getItem("clicked_video");
    let {videoId,snippet}= JSON.parse(data);
    
// Embeding a video using iframe HTML element 

let iframe = document.createElement("iframe");

iframe.src= `https://www.youtube.com/embed/${videoId}?autoplay=1` //&mute=1

iframe.width='100%';
iframe.height= '80%';
iframe.setAttribute("allowfullscreen", true)
// iframe.setAttribute("autoplay", true)



let video_name= document.createElement("h3");
 video_name.innerText= snippet.title

 let channel_name= document.createElement("p");
 channel_name.innerText=snippet.channelTitle;

 let desc= document.createElement("p");
 desc.innerText=snippet.description;

 let video_div = document.getElementById('video_details');
video_div.append(iframe,video_name,desc,channel_name);
};


let body = document.getElementById('body');

body.onload = () => {
    showClickedVideo();
    movies();
}

const movies = async () => {
    let regionCode =  "ISO 3166-1 alpha-2 91+"  
  
    try {
      let response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&key=${'AIzaSyCACH1cPbeM6QMGSdx4Nynw0oOUc5mbcVk'}`,
      )
      let data = await response.json()
  
      let actual_data = data.items
      console.log('actual_data:', actual_data) 
      appendVideos(actual_data)
    } catch (err) {
      console.log('err:', err)
    }
  }

  const appendVideos = function (data) {
    // document.getElementById('recommendations').innerHTML=null;
    data.forEach(({snippet}) => {
    
        let div = document.createElement('div');
     div.setAttribute("class",'recommend_movies');
      
     let img= document.createElement('img');
     img.src= snippet.thumbnails.default.url;

     let div2 = document.createElement('div');
     div2.setAttribute("class","textin");


     let title= document.createElement('p');
     title.innerText= snippet.title

     let channel= document.createElement('h3');
     channel.innerText=snippet.channelTitle;

     div2.append(title,channel);

     div.append(img,div2);

     document.getElementById('recommendations').append(div);


    });
   
     

     
    
  } 