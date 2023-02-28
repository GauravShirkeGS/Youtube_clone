//'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]'

// AIzaSyAWAwuTmxLs_0vuarvI1d0F8mTLDowEKjY

import {navbar} from "./componants/navbar.js"


let nav_div = document.getElementById('nav');
nav_div.innerHTML= navbar ();

const search_videos = async () => {
  const API_KEY = 'AIzaSyCACH1cPbeM6QMGSdx4Nynw0oOUc5mbcVk'

  let search_items = document.getElementById('search_items').value
  

  try {
    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=surfing&q=${search_items}&key=${API_KEY}`,
    )
    let data = await response.json()

    let actual_data = data.items
    appendVideos(actual_data)
  } catch (err) {
    console.log('err:', err)
  }
}

const movies = async () => {
  let regionCode =  "ISO 3166-1 alpha-2 91+"  

  try {
    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=indian&key=${'AIzaSyCACH1cPbeM6QMGSdx4Nynw0oOUc5mbcVk'}`,
    )
    let data = await response.json()

    let actual_data = data.items
    console.log('actual_data:', actual_data) 
    appendVideos(actual_data)
  } catch (err) {
    console.log('err:', err)
  }
}


movies()

const appendVideos = (data) => {
  document.getElementById('videos').innerHTML = null
  data.forEach(({ snippet , id:{videoId}}) => {
    let div = document.createElement('div')

    let v_title = document.createElement('h3')
    v_title.innerText = snippet.title

    let chanel_name = document.createElement('p')
    chanel_name.innerText = snippet.channelTitle

    let thumbnail = document.createElement('img')
    thumbnail.src = snippet.thumbnails.high.url

    // let time= document.createElement("p");
    // time.innerText=snippet.publishTime

    div.append(thumbnail, v_title, chanel_name)

    div.onclick = () => {
      
     let data= {
      snippet,
      videoId
     };
    //  console.log(data);
     data= JSON.stringify(data);
     localStorage.setItem("clicked_video",data);

     window.location.href="./video.html"
    }

    document.getElementById('videos').append(div)
  })
}

 let search = document.getElementById('search_btn');

 search.onclick = function (){
  search_videos();
 }

 const sortbydate = async () => {

  try{
let date = 2022;
    let res= await fetch (`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=surfing&key=${'AIzaSyAWAwuTmxLs_0vuarvI1d0F8mTLDowEKjY'}&order=${date}`);

      let data= await res.json()
console.log('data:', data)
  }
catch (error){
  console.log('error:', error)
}
 }

 let views = document.getElementById('views');
 views.onclick = () => {
  sortbydate();
 }

 let user_data= JSON.parse(localStorage.getItem('user_info'));