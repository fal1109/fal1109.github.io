document.addEventListener("DOMContentLoaded", () => {
  discord()
  spotify()
})

async function discord(){

  try{

      const response = await fetch(`https://api.lanyard.rest/v1/users/719202528130236436`);

      console.log(response)

      const data = await response.json();

      for (const activity of data.data.activities) {
          if (activity.name === "Spotify" || activity.name === "Youtube Music") {
              continue;
          }
      }

      
      let currentActivity = null;
      for (const activity of data.data.activities) {
          if (activity.name !== "Spotify" && activity.name !== "Youtube Music") {
              currentActivity = activity;
              break;
          }
      }

      
      
      
      const activity = currentActivity.name;
      const activityElement = document.getElementById("activityName");

      activityElement.innerHTML = activity;

      const type = currentActivity.type;

      function stateConvert(type) {
          switch (type) {
            case 0:
              return "Playing";
            case 1:
              return "Streaming";
            case 2:
              return "Listening to";
            case 3:
              return "Watching";
            case 4:
              break;
            default:
              return "";
          }
        }

      
      const typeElement = document.getElementById("activityType");

      typeElement.innerHTML = stateConvert(type);
      
      const state = currentActivity.state;
      const stateElement = document.getElementById("activityState");
      
      if (state == null) {
          stateElement.style.display = "none";
      }

      stateElement.innerHTML = state;

      const details = currentActivity.details;
      const detailsElement = document.getElementById("activityDetails");

      if (details == null) {
          detailsElement.style.display = "none";
      }

      detailsElement.innerHTML = details;

      const appID = currentActivity.application_id;

      const activityImage = currentActivity.assets.large_image;
      const activityImageElement = document.getElementById("largeImage");
      

      
      function imgConvert(activityImage) {
        if (activityImage.includes("mp:")) {
          return `https://media.discordapp.net/${activityImage.replace("mp:", "")}`;
        } else {
          return `https://cdn.discordapp.com/app-assets/${appID}/${activityImage}.png`;
        }
      }
      
      activityImageElement.src = `${imgConvert(activityImage)}`;
      activityImageElement.style.display = "block";


      const activityImageSmall = currentActivity.assets.small_image;
      const activityImageSmallElement = document.getElementById("smallImage");

      
      function imgConvertSmall(activityImageSmall) {
        if (activityImageSmall.includes("mp:")) {
          return `https://media.discordapp.net/${activityImageSmall.replace("mp:", "")}`;
        } else {
          return `https://cdn.discordapp.com/app-assets/${appID}/${activityImageSmall}.png`;
        }
      }
      
      activityImageSmallElement.src = `${imgConvertSmall(activityImageSmall)}`;
      activityImageSmallElement.style.display = "block";
      
      
  }
   catch(error){
      console.error(error);
  }
}

async function spotify(){

  try{

      const response = await fetch(`https://api.lanyard.rest/v1/users/719202528130236436`);

      console.log(response)

      const data = await response.json();
      
      const albumUrl = `${data.data.spotify.album_art_url}`;
      const imgElement = document.getElementById("album");

      imgElement.src = albumUrl;
      imgElement.style.display = 'block';


      const title = `${data.data.spotify.song}`;
      const titleElement = document.getElementById("title");
      const titleImage = document.getElementById("titleIcon");

      titleElement.innerHTML = title;
      titleImage.src = 'images/icons/song.svg';
      titleImage.style.display = 'block';

      const album = `${data.data.spotify.album}`;
      const albumElement = document.getElementById("albumName");
      const albumIcon = document.getElementById("albumIcon");

      albumIcon.src = 'images/icons/album.svg';
      albumIcon.style.display = 'block';
      albumElement.innerHTML = album;

      const artist = `${data.data.spotify.artist}`;
      const artistElement = document.getElementById("artist");
      const artistImage = document.getElementById("artistIcon");

      artistImage.src = 'images/icons/artist.svg';
      artistImage.style.display = 'block';
      artistElement.innerHTML = artist;
      
      function formatTimestamp(timestamp) {
          const date = new Date(timestamp);
          const minutes = date.getUTCMinutes();
          const seconds = date.getUTCSeconds();
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      const startTimestamp = data.data.spotify.timestamps.start;
      const endTimestamp = data.data.spotify.timestamps.end;

      const startElement = document.getElementById("start");
      const endElement = document.getElementById("end");

      const songDuration = endTimestamp - startTimestamp;

      endElement.innerHTML = formatTimestamp(songDuration);

      setInterval(() => {
          const currentTimestamp = Date.now();
          const elapsedTime = currentTimestamp - startTimestamp;
          const currentTime = Math.min(elapsedTime, songDuration);
          startElement.innerHTML = formatTimestamp(currentTime);
      }, 1000);

      


  }
  catch(error){
      console.error(error);
  }
}

async function aoiPfp() {
  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/518795791318384647');
    const data = await response.json();
    const user = data.data.discord_user;
    let avatarUrl;
    if (user.avatar && user.id) {
      const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
      avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=256`;
    } else {
    
      const discrim = parseInt(user.discriminator) % 5;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${discrim}.png`;
    }
    const aoiElement = document.getElementById('aoi');
    if (aoiElement) {
      aoiElement.src = avatarUrl;
      aoiElement.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}

aoiPfp();

async function khgbPfp() {
  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/790136805324226570');
    const data = await response.json();
    const user = data.data.discord_user;
    let avatarUrl;
    if (user.avatar && user.id) {
      const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
      avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=256`;
    } else {
    
      const discrim = parseInt(user.discriminator) % 5;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${discrim}.png`;
    }
    const aoiElement = document.getElementById('khgb');
    if (aoiElement) {
      aoiElement.src = avatarUrl;
      aoiElement.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}

khgbPfp();

  async function filyPfp() {

  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/831530536781873163');
    const data = await response.json();
    const user = data.data.discord_user;
    let avatarUrl;
    if (user.avatar && user.id) {
      const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
      avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=256`;
    } else {
    
      const discrim = parseInt(user.discriminator) % 5;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${discrim}.png`;
    }
    const filyElement = document.getElementById('fily');
    if (filyElement) {
      filyElement.src = avatarUrl;
      filyElement.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}

filyPfp();