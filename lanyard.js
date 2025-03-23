document.addEventListener("DOMContentLoaded", () => {
    discord()
    spotify()
    
    
})

async function discord(){

    try{

        const response = await fetch(`https://api.lanyard.rest/v1/users/719202528130236436`);

        console.log(response)

        const data = await response.json();
        const avatarUrl = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}.png`;
        const imgElement = document.getElementById("pfp");

        imgElement.src = avatarUrl;
        imgElement.style.display = "block";
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
        const imgElement = document.getElementById("s_album");

        imgElement.src = albumUrl;
        imgElement.style.display = 'block';


        const title = `${data.data.spotify.song}`;
        const titleElement = document.getElementById("s_title");

        titleElement.innerHTML = title;

        const album = `${data.data.spotify.album}`;
        const albumElement = document.getElementById("s_albumName");

        albumElement.innerHTML = album;

        const artist = `${data.data.spotify.artist}`;
        const artistElement = document.getElementById("s_artist");

        artistElement.innerHTML = artist;
    }
    catch(error){
        console.error(error);
    }
}
