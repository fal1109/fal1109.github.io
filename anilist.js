var query  = `
query ($userId: Int!) {
    Page {
      activities(userId: $userId, sort: ID_DESC, type: MEDIA_LIST) {
        ... on ListActivity {
          id
          progress
          status
          media {
            title {
              english
              romaji
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
    `;


var variables = {
        userID: '5994992' 
};

var url = 'https://graphql.anilist.co',
    options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: variables
    })
};

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}