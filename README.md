# Tic Tac Toe Application

This is a Tic Tac Toe application built using Next.js. It allows players to play the classic game of Tic Tac Toe on a 3x3 grid. The application is fully functional and includes unit tests to ensure the correctness of the game logic.

## Functional Requirements

- The game has a 3x3 grid. ✅
- Players can click on a cell to mark it with "X" or "O". ✅
- Turns alternate between the two players. ✅
- The game detects a win or a draw and displays an appropriate message. ✅
- There is a "Reset" button to start a new game. ✅

## Technical Requirements

- Next.js is used as the application framework. ✅
- React is used for the frontend components. ✅
- State management is handled using React's useState or useReducer. ✅
- Styling is done using CSS modules or styled-components. ✅
- Unit tests are implemented using Jest with React Testing Library. ✅

## Unit Testing Requirements

The following aspects are covered by unit tests:

- Rendering of the Tic Tac Toe grid. ✅
- Functionality of marking cells with "X" and "O". ✅
- Win conditions (rows, columns, and diagonals). ✅
- Draw condition. ✅
- "Reset" button functionality. ✅

## Bonus Points

The following additional features are implemented:

- TypeScript is used for type safety. ✅
- A simple AI is implemented to play against the user. ✅
- Animations are added for a better user experience. ✅

## Submission

To submit your solution, please provide the following:

- Source code in a GitHub repository.
- A package.json file listing all dependencies.
- A README file with instructions on how to run the application and tests.
- A brief explanation of your approach and any design decisions you made.

## Evaluation Criteria

Your solution will be evaluated based on the following criteria:

- Code quality and organization.
- Correctness and completeness of the functionality.
- Coverage and quality of unit tests.
- Adherence to Next.js and React best practices.
- Clarity and completeness of the README file.

## Installation
To install and run the Tic Tac Toe application, follow these steps:

1. Clone the GitHub repository to your local machine:
    ```
    git clone https://github.com/your-username/tic-tac-toe.git
    ```

2. Navigate to the project directory:
    ```
    cd tic-tac-toe
    ```

3. Install the dependencies using npm or yarn:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```

## Running the Application
To run the Tic Tac Toe application, use the following command:

```
npm run dev
```
or
```
yarn dev
```

This will start the application on a local development server. Open your web browser and visit `http://localhost:3000` to access the application.

## Running Unit Tests
To run the unit tests for the Tic Tac Toe application, use the following command:

```
npm run test
```
or
```
yarn test
```

This will execute the test suite and display the results in the console.

## Coverage Report
To generate a coverage report for the unit tests, use the following command:

```
npm run test:coverage
```
or
```
yarn test:coverage
```

This will generate a detailed coverage report in the `coverage` directory.
