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
Requires you to run ```yarn install``` inside ```rps-app``` when first installing the application. Then run ```yarn start``` to start the application on ```localhost:3000``` (default).

An accompanying backend and backend setup instructions can be found [here](https://github.com/elksy/Rock-Paper-Scissors-Back-End).

## Browser Compatibility and Settings
This web application is currently only compable with Safari (tested on Safari Version 15.2 and macOS Monterey Version 12.1).

Users must also turn prevent 'Website tracking' on Safari Privacy settings.

Instructions to do so:

<img width="1440" alt="Screenshot 2022-03-04 at 11 48 18" src="https://user-images.githubusercontent.com/94632221/156759782-1072e9f9-d5d4-42b1-8ce4-e3c1fe586916.png">
Click on **Safari** on the Mac Toolbar and click on **Preferences...**

<img width="1440" alt="Screenshot 2022-03-04 at 11 48 33" src="https://user-images.githubusercontent.com/94632221/156759803-abe7c48b-9b94-45b4-9e39-641e19100297.png">
Toggle the tab to **Privacy** and make sure **Website tracking:** is unticked.

