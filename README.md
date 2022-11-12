<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<br />
<div align="center">

  <h3 align="center">Shared-Note-App</h3>

  <p align="center">
    This a simple app written in react and node.js (in typescript), using postgresql as data store.
    It allow to create/get/delete/share notes with other users.
  </p>
  
  <img width="854" alt="Screenshot 2022-11-12 at 19 31 06" src="https://user-images.githubusercontent.com/12540508/201491542-2e9a3e32-eecc-4408-94d8-2578ae4d1f3f.png">
  <img width="850" alt="Screenshot 2022-11-12 at 19 31 16" src="https://user-images.githubusercontent.com/12540508/201491530-42ec795e-4bea-44a0-b930-a06e17baa42b.png">
  <img width="848" alt="Screenshot 2022-11-12 at 19 31 32" src="https://user-images.githubusercontent.com/12540508/201491529-6c0c7bb6-8b89-46ef-a4bf-332b31613490.png">


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

<img width="1435" alt="Screenshot 2022-11-12 at 19 15 36" src="https://user-images.githubusercontent.com/12540508/201492436-1c58f2aa-0b06-4b14-96fd-b88b39b72f04.png">

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
npm install --legacy-peer-deps
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
