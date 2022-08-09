# The Mile High Hotel
## Turing M2 final solo project - Overlook

- [Tom Fettig](https://github.com/tfettig22)

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Features](#features)
- [Future Additions](#future-additions)
- [Technologies](#technologies)

## Introduction
The Mile High Hotel is a website that allows the user to log in as one of 50 preset customers that can view and add hotel bookings for their upcoming travel plans. The website is themed as 'The Home of the Denver Broncos', and features a color scheme and images that are based on Denver's NFL team. The user can see a list of available rooms for upcoming date, and can filter these results by one of four room types. The hotel has 25 rooms, each one with a slightly different configuration of room type, bed size, number of beds, and bidets. The price per night of each room is shown, and the user can decide at will to book a room to add it to the current customer's bookings.

This app was written following the principles of TDD and the repo includes a very thorough test suite that checks all the logic of the data model.

## Setup
1. This project fetches data from an API so you will need to begin by cloning down the API and running it.
Clone the API by running `git@github.com:turingschool-examples/overlook-api.git`
2. CD into that directory, run npm install and then npm start. You should see “Overlook API is now running on http://localhost:3001 !”
Open a NEW terminal tab and cd somewhere outside of the API repo you just cloned. Do not close the tab that is running the API.
3. Clone a copy of this repo to your machine. Add an optional argument after the repo url when cloning. The command should look like this: git clone [remote-address] [what you want to name the repo]. (no brackets)
4. Once you have cloned the repo, change into that directory, run `npm install` and then `npm start`. You should see “Project is running at http://localhost:8080/"
5. A link will appear in the terminal similar to http://localhost:8080/ (you might see 8081). Open that link in your browser. `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.
6. Enjoy!

## Features

At the main page, the user will be asked to log in as a customer. The username must be customer[number] where number is anything from 01-50 (no brackets). The password is overlook2021 for all customers. Once logged in, the user is brought to the dashboard for the specific customer that is logged in. This will show a personalized message, the upcoming bookings (sorted by date ascending), past bookings (sorted by date descending), and the total amount spent for that customer. If the user clicks on the 'book a room' button in the top right, the page will change to a list of available rooms, and a section to filter the list of rooms by date and room type. The user can search through the rooms, filter the results as desired, and book a room of their choice. After booking, a page will display showing a success message and then automatically redirect back to the dashboard, where the user can now see the most recent booking they just made in their 'upcoming bookings' section. The user will not be able to pick a date in the past, and therefore cannot book a room for a past date.

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/101140241/183770726-80bdcdf4-36c1-42a4-80a1-a99d9f521198.gif)

## Future Additions
- Add manager login that can view the total rooms available, the total revenue, and the percentage of rooms occupied for today's date. The manager will also be able to search for a specific user by name see all of thier bookings and the total amount they have spent. As a manager, they will be able to add a booking for a specific room for a user of their choosing, or delete any upcoming booking.

## Technologies
- JavaScript
- HTML
- CSS
- Webpack
- API
- TDD - Testing using Mocha and Chai
