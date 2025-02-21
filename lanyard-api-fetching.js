async function avatar(){

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