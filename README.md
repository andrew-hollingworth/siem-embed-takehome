# Cloud SIEM Frontend Embed - Take-home Exercise

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Suggested Application Improvements](#suggested-application-improvements)
- [Tech Stack](#tech-stack)

## Overview

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/andrew-hollingworth/siem-embed-takehome.git
   cd siem-embed-takehome
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

## Running the Project

1. **Run Project:**

   Using npm:

   ```bash
   npm run dev
   ```

2. **View in browser:**

   [localhost:5173](http://localhost:5173/)

3. **Run the Tests**

   ```bash
   npm run test
   ```

## Suggested Application Improvements

    - My main focus for improvement on the application is resilience. There is not a lot of error handling incorporated, and so the application does not elegantly fail--it mostly fails spectacularly. This is also my first real foray into writing unit tests. I tried to simulate user behavior, but I'm not very confident that I am well covered for edge cases that could occur. I am also sure there are better and more elegant ways to replicate the behavior of the application--I struggled with mocking functions for quite awhile before brute forcing it with dummy data.

    - Building this little graphing application really gave me an appreciation for our Dataviz teams, and our data collection methods. I built the application using separate arrays for tracking time and CPU. I'm still not sure if that is a better way of handling it than as an array of objects. It certainly is more likely to lead to incorrect data, since each CPU value is linked to its timestamp by the index of the array, but keeping them together could similarly lead to issues reconciling an object with one value or the other, but not both.
        - One direct result of handling the data this way is that my evaluation of the Average CPU over the last 2 minutes is done by leveraging the array items, rather than by measuring the time. This could certainly lead to issues if there's a drop in data for some time, and I have sometimes seen it in action when leaving my computer for a bit and coming back to it later--the application doesn't adjust well (see: resilience above).

    - There are a few minor bugs I encountered that were not a priority in the limited time to put this together I noted, for future improvement:
        - If the user is viewing the application and there are timeline events triggered at a single-digit hour (say, 9:58) and then there are additional events at a double-digit hour (say, 10:01), the timeline's alignment is off.
        - My Memory calculation doesn't always normalize to 2 decimal places.
        - Sometimes, but not always, I get the error `"Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."` I wasn't able to track this to a particular function, but I certainly have a number of functions that do update on every render. However, given this didn't appear to impact the performance (or at least the functionality) of the application and didn't get logged every time I ran the application for awhile, I didn't prioritize fixing this one.

## Tech Stack

- [React](https://react.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [nodejs](https://nodejs.org/en)
