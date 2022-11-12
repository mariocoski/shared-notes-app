<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<br />
<div align="center">

  <h3 align="center">Shared-Note-App</h3>

  <p align="center">
    This a simple app written in react and node.js (in typescript), using postgresql as data store.
    It allow to create/get/delete/share notes with other users.
      
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol> 
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li> 
    <li><a href="#license">License</a></li> 
  </ol>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [nx nrwl monorepo](https://nx.dev/)
- [typescript](https://www.typescriptlang.org/)
- [node.js](https://nodejs.org/en/)
- [react.js](https://reactjs.org)
- [postgresql](https://www.postgresql.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Api explorer

In root directory you will find:

- shared_notes.postman_globals.json (contains environment var for postman)
- shared-notes-app.postman_collection.json (postman collection)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have installed:

- docker
- docker-compose
- node.js
- npm

### Installation

1. Clone the repo
```sh
git clone https://github.com/mariocoski/shared-notes-app
```
2. Install NPM packages
```sh
npm install
```

### Usage

1. Start database:
```sh
docker-compose up -d
```
2. Migrate the database:
```sh
npm run migrate:up
```
3. Start the app:

```sh
npm run start:app
```

4. To revert migration run:

```sh
  npm run migrate:down
```

5. To stop database:

```sh
  docker-compose down
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] A user can login
- [x] A user can register
- [x] A user can create a note with title and body
- [x] A user can save a note
- [x] A user can see all note
- [x] A user can delete note
- [x] A user can share a note by adding an approved email address/username that has access to the note
- [x] A user can see shared notes and open them in read only mode
- [ ] Error handling in react app
- [ ] Better form validation - formik
- [ ] Better error handling in node.js api
- [ ] Email verification

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.
