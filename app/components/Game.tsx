import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import Board from "./Board";
import { calculateWinner, checkDraw } from "../utils/gameLogic";
import Spinner from "./Spinner";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  padding: 20px;
  font-family: "Roboto Mono", monospace;
  color: #f0f0f0;
  background: linear-gradient(
    45deg,
    #4158d0,
    #c850c0
  );
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const GameInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  animation: ${slideUp} 0.5s ease-in-out;
`;

const StatusMessage = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Button = styled.button`
  background: #f0f0f0;
  color: #4158d0;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;
const ThinkingMessage = styled.div`
position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Game: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState<string | null>("Next player: X");
  const [gameMode, setGameMode] = useState<"human" | "computer" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [thinking, setThinking] = useState(false);
  const COMPUTER_THINKING_TIME = 1000;

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameStatus(`Winner: ${winner}`);
    } else if (checkDraw(board)) {
      setGameStatus("It's a draw!");
    } else {
      setGameStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [board, xIsNext]);

  useEffect(() => {
    if (
      gameStarted &&
      gameMode === "computer" &&
      xIsNext &&
      !calculateWinner(board)
    ) {
      setThinking(true);
      setTimeout(() => {
        computerMove();
        setThinking(false);
      }, COMPUTER_THINKING_TIME);
    }
  }, [gameStarted, gameMode, xIsNext]);

  const handleClick = (index: number) => {
    if (
      !gameStarted ||
      board[index] ||
      calculateWinner(board) ||
      (gameMode === "computer" && xIsNext)
    )
      return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleStartGame = (mode: "human" | "computer") => {
    setGameMode(mode);
    setGameStarted(true);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
    setGameStatus(null);
    setGameStatus("Next player: X");
  };

  const computerMove = () => {
    const emptyCells = board.reduce<number[]>((acc, cell, index) => {
      if (cell === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const newBoard = [...board];
    newBoard[emptyCells[randomIndex]] = "X";
    setBoard(newBoard);
    setXIsNext(false);
  };

  const handleBack = () => {
    setGameStarted(false);
    setGameMode(null);
    setGameStatus(null);
    setBoard(Array(9).fill(""));
    setXIsNext(true);
  }

  return (
    <GameContainer>
      {gameStarted && gameMode === "computer" && thinking && (
        <ThinkingMessage>
          <Spinner />
          <StatusMessage>Computer is thinking...</StatusMessage>
        </ThinkingMessage>
      )}
      {!gameStarted ? (
        <GameInfo>
          <h2>Choose Game Mode:</h2>
          <div>
            <Button onClick={() => handleStartGame("human")}>
              Human vs Human
            </Button>
            <Button onClick={() => handleStartGame("computer")}>
              Human vs Computer
            </Button>
          </div>
        </GameInfo>
      ) : (
        <>
          <Board board={board} onCellClick={handleClick} />
          <GameInfo>
            <StatusMessage>
              {gameStatus || `Next player: ${xIsNext ? "X" : "O"}`}
            </StatusMessage>
            <Button onClick={handleReset}>Reset Game</Button>
            <Button onClick={handleBack}>Back to select game mode</Button>
          </GameInfo>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
