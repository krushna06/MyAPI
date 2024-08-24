# MyAPI

This is a RESTful API built with Node.js and Express that provides various endpoints for retrieving information such as weather data, my discord profile, my Spotify activity, and blog details.

## Used for

- Spotify History and Now Playing API / Provides realtime queue for [portfolio](https://n0step.xyz/presence).
- Blog System for [portfolio](https://n0step.xyz/blogs).
- Local weather

## API Endpoints

### Weather

**Endpoint:** `/api/v1/weather`

**Method:** `GET`

**Description:** Retrieves the current weather information of Mumbai.

### DProfile

**Endpoint:** `/api/v1/dprofile`

**Method:** `GET`

**Description:** Retrieves profile information from two sources: `dcdn.n0step.xyz` and [`external`](https://api.lanyard.rest/v1/users/853620650592567304).

### Spotify

**Endpoint:** `/api/v1/spotify`

**Method:** `GET`

**Description:** Retrieves the last song played on Spotify.

### Blogs

**Endpoint:** `/api/v1/blogs`

**Method:** `GET`

**Description:** Retrieves a list of blogs, including titles, descriptions, and publication dates.

### Projects

**Endpoint:** `/api/v1/projects`

**Method:** `GET`

**Description:** Retrieves a list of projects, including titles, descriptions, and creation/development dates.