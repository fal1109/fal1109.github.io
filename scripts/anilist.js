const query = `
query Query($userId: Int, $sort: [ActivitySort], $type: ActivityType, $name: String) {
  Page {
    activities(userId: $userId, sort: $sort, type: $type) {
      ... on ListActivity {
        id
        progress
        status
        media {
          title {
            romaji
            english
            userPreferred
          }
          coverImage {
            large
          }
        }
      }
    }
  }
  User(name: $name) {
    statistics {
      anime {
        genres {
          genre
          count
        }
      }
      manga {
        genres {
          genre
          count
        }
        count       
        chaptersRead 
      }
    }
  }
}
`

const stuff = {
  "userId": 5994992,
  "name" : "fal",
  "sort": "ID_DESC",
  "type": "MEDIA_LIST"
}

const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: stuff
        })
    };

fetch(url, options).then(handleResponse)
    .then(data => {
        const title = data.data.Page.activities[0].media.title.english || data.data.Page.activities[0].media.title.romaji;
        const cover = data.data.Page.activities[0].media.coverImage.large;
        const progress = data.data.Page.activities[0].progress;
        const status = data.data.Page.activities[0].status;

        const titleElement = document.getElementById("mediaTitle");
        const imgElement = document.getElementById("cover");
        const progressElement = document.getElementById("mediaProgress");
        const statusElement = document.getElementById("mediaStatus");

        titleElement.innerHTML = title;
        imgElement.src = cover;
        progressElement.innerHTML = progress;
        statusElement.innerHTML = status;

        const mangaGenres = data.data.User.statistics.manga.genres;

        const mangaGenresElement = document.getElementById("mangaGenres");

        mangaGenres
    
            .forEach(genre => {
          const genreElement = document.createElement("div");
          genreElement.className = "genre";
            genreElement.innerHTML = `${genre.genre} : ${genre.count}`;
            const bar = document.createElement("div");
            bar.className = "genre-bar";
            bar.style.display = "inline-block";
            bar.style.height = "10px";
            
            const containerWidth = mangaGenresElement.offsetWidth || 600;
            const maxCount = Math.max(...mangaGenres.map(g => g.count));
            const barMaxWidth = containerWidth * 0.5; 
            const width = (genre.count / maxCount) * barMaxWidth;
            bar.style.width = `${width}px`;
            
            const index = mangaGenres.indexOf(genre);
            const saturation = 60 + (index * 10) % 40;
            const lightness = 45 + (index * 7) % 20;  
            bar.style.background = `hsl(0, ${saturation}%, ${lightness}%)`;
            bar.style.marginLeft = "10px";
            bar.style.borderRadius = "5px";
            bar.style.height = "8px"; 
            genreElement.appendChild(bar);
          mangaGenresElement.appendChild(genreElement);
            });

        const mangaCount = data.data.User.statistics.manga.count;
        const mangaCountElement = document.getElementById("mangaCount");
        mangaCountElement.innerHTML = `${mangaCount}`;
        const chaptersRead = data.data.User.statistics.manga.chaptersRead;
        const chaptersReadElement = document.getElementById("chaptersRead");
        chaptersReadElement.innerHTML = `${chaptersRead}`;

    })
    .catch(console.error);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}