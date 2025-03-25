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
            if (activity.name === "Spotify") {
                continue;
            }
        }

        const avatarUrl = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}.png`;
        const pfp = document.getElementById("pfp");

        pfp.src = avatarUrl;
        pfp.style.display = "block";

        
        let currentActivity = null;
        for (const activity of data.data.activities) {
            if (activity.name !== "Spotify") {
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
              case 3:
                return "Listening to";
              case 4:
                return "Watching";
              default:
                return "Custom Status";
            }
          }

        
        const typeElement = document.getElementById("activityType");

        typeElement.innerHTML = stateConvert(type);

        const state = currentActivity.state;
        const stateElement = document.getElementById("activityState");

        stateElement.innerHTML = state;

        

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

        titleElement.innerHTML = title;

        const album = `${data.data.spotify.album}`;
        const albumElement = document.getElementById("albumName");

        albumElement.innerHTML = album;

        const artist = `${data.data.spotify.artist}`;
        const artistElement = document.getElementById("artist");

        artistElement.innerHTML = artist;
    }
    catch(error){
        console.error(error);
    }
}
