# Rock, Paper, Scissors Tournament Front End

![enter image description here](https://img.shields.io/netlify/fa480741-a833-4a17-8409-ff892fe661b5)![enter image description here](https://img.shields.io/badge/react-17.0.2-blue)![enter image description here](https://img.shields.io/badge/RPS-Tournament-orange)

## Table of Contents
 - Introduction
 - Technologies
 - Setup
	 - Browser Compatibility
	 - Accompanying Backend

## Introduction
Welcome to RPS Tournament!

A multiplayer rock, paper, scissors tournament application hosting up to 16 players.

Our project aims to give the user the ability to:
- Play a knock-out style tournament with up to 16 players.
- Create a tournament with a unique tournament code.
- Distribute the code to allow up to 16 players to play in one lobby.
- Host a lobby with exclusive permissions:
	- e.g. kick player / start game.
- Live chat with players in the same lobby.
- Spectate games after being knocked out.

This web application can also host multiple lobbies.

## Set-up
To run locally using yarn:

    $ cd ../rps-app
    $ yarn install
    $ yarn start

An accompanying backend and backend setup instructions can be found [here](https://github.com/elksy/Rock-Paper-Scissors-Back-End).

## Browser Compatibility and Settings
This web application is currently only compatible with Safari (tested on Safari Version 15.2 and macOS Monterey Version 12.1).

Users must also turn prevent 'Website tracking' on Safari Privacy settings.

Instructions to do so:

<img width="1440" alt="Screenshot 2022-03-04 at 11 48 18" src="https://user-images.githubusercontent.com/94632221/156760457-dbb885ae-7ba0-4c1d-add6-d061a67392a5.png">
Click on **Safari** on the Mac Toolbar and click on **Preferences...**

<img width="1440" alt="Screenshot 2022-03-04 at 11 48 33" src="https://user-images.githubusercontent.com/94632221/156760480-a67fbae2-999e-4238-9cc9-aeacdbe1824c.png">
Toggle the tab to **Privacy** and make sure **Website tracking:** is unticked.

## Technologies
This project has been created with:
- react-bootstrap version: 2.1.2
- react-brackets version: 0.4.6
- react-color version: 2.19.3
- react-cookie version: 4.1.1
- react-dom version: 17.0.2
- react-router-dom version: 5.2.0
- react-router version: 5.2.0
- react version: 17.0.2
- yarn version: 1.22.17

### For testing:
- testing-library/jest-dom version: 5.16.2
- testing-library/react: 12.1.3
- testing-library/user-event: 13.5.0
- react-aria version: 3.1.2
