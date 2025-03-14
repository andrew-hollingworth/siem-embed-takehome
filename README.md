# Cloud SIEM Frontend Embed - Take-home Exercise

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Suggested Application Improvements](#suggested-application-improvements)
- [Tech Stack](#tech-stack)

## Overview
 A simple application designed to visualize the average CPU for the host. It logs any time the CPU averages a value higher than 1 over the last two minutes, and when it recovers. This was a take-home assignment for an embed with the Cloud SIEM frontend team. 

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/andrew-hollingworth/siem-embed-takehome.git
   cd siem-embed-takehome
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Running the Project

1. **Run the Project:**

   ```bash
   npm run dev
   ```

2. **View it in action in the browser:** 
[localhost:5173](http://localhost:5173/)

3. **Run the Tests**

   ```bash
   npm run test
   ```

## Suggested Application Improvements
- My main focus for improving the application would be resilience. I did not incorporate a lot of error handling, so when the application fails, it doesn't do so gracefully--it does so spectacularly. This project was also my first real foray into writing unit tests. I tried to simulate the real behavior of the application, but I'm not confident that I am well covered for edge cases that could occur, and I am sure that the tests would be easily broken. I am also certain that there are better and more elegant ways to implement the tests I wrote, but I struggled with mocking functions for quite awhile before electing to brute-force it with dummy data.

- Too much of my code lives in React. In this project, I particularly struggled with structuring an app that is adding and managing more and more data as time passes. As a result, I found it easier to handle the logic in one place. But as I was finishing up and rereading the rubric, I realized I'd gone down the wrong path. Pulling logic outside of react makes a lot of sense from a reusability perspective, of course. But I had also noticed issues with my code embedded in React while I was struggling to write my tests. It would have been really helpful to have the functions pulled out in order to be tested more directly (and I am kicking myself for not doing it when it occurred to me at the time). 

- Building this little graphing application really gave me an appreciation for our Dataviz teams. I built the application using separate arrays for tracking time and CPU. I'm not certain that it was a better way of handling the data than as an array of objects. It seems more likely to lead to incorrect data, since each CPU value is linked to its timestamp by the index of the array, but keeping them together could similarly lead to complications reconciling and graphing an object with one value or the other, but not both.
    - One direct result of handling the data this way is that my evaluation of the Average CPU over the last 2 minutes is done by leveraging the length of the array, rather than by measuring the actual time passed. This leads to issues if there's a drop in data for some period, and I have seen it in action when leaving the application running while my computer goes to sleep for a bit and coming back to it later--the application doesn't adjust well (see: resilience above).

- Lastly, I encountered a few minor bugs that I didn't prioritize given time constraints, but did note for future improvement:
    - If the user is viewing the application and there are timeline events triggered at a single-digit hour (say, 9:58) and then there are additional events at a double-digit hour (say, 10:01), the timeline's alignment is off.
    - My available memory calculation doesn't always normalize to 2 decimal places. I'm not sure why this is--my best guess is that it's related to the order of operations. 
    - Sometimes, but not always, I get the error `"Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."` I wasn't able to track this to a particular function, but I certainly have a number of functions that do update on every render. However, given this didn't appear to impact the performance (or at least the functionality) of the application and didn't get logged every time I ran the application for a while, I didn't prioritize fixing this one.

## Tech Stack

- [React](https://react.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [MUI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [nodejs](https://nodejs.org/en)
