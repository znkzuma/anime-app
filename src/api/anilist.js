const URL = "https://graphql.anilist.co";

async function request(query, variables = {}) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

const MEDIA_FIELDS = `
  id
  title { romaji english }
  coverImage { large }
  averageScore
  episodes
  seasonYear
  genres
`;

export async function searchAnime(search) {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 20) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;
  const data = await request(query, { search });
  return data.Page.media;
}

export async function getTrending() {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: TRENDING_DESC) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;
  const data = await request(query);
  return data.Page.media;
}