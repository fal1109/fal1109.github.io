const query = `
query Query($userId: Int, $sort: [ActivitySort], $type: ActivityType) {
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
}
`

const stuff = {
  "userId": 5994992,
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
    })
    .catch(console.error);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}