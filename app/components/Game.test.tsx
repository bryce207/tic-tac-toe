import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';

describe('Game', () => {
  
  it("starts in the mode selection screen", () => {
    render(<Game />);
    const humanVsHumanButton = screen.getByRole("button", {
      name: "Human vs Human",
    });
    const humanVsComputerButton = screen.getByRole("button", {
      name: "Human vs Computer",
    });

    expect(humanVsHumanButton).toBeInTheDocument();
    expect(humanVsComputerButton).toBeInTheDocument();
    expect(screen.queryByTestId("cell")).not.toBeInTheDocument();
  });

  it("starts the game in human vs human mode", () => {
    render(<Game />);
    const startButton = screen.getByRole("button", { name: "Human vs Human" });
    fireEvent.click(startButton);

    expect(screen.getAllByTestId("cell")).toHaveLength(9);
    expect(screen.getByText("Next player: X")).toBeInTheDocument();
  });

  it("starts the game in human vs computer mode", () => {
    render(<Game />);
    const startButton = screen.getByRole("button", {
      name: "Human vs Computer",
    });
    fireEvent.click(startButton);

    expect(screen.getAllByTestId("cell")).toHaveLength(9);
    expect(screen.getByText("Next player: X")).toBeInTheDocument();
  });

  it('makes a computer move after a delay in human vs computer mode', async () => {
    render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Computer' });
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.queryByText('Computer is thinking...')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('Computer is thinking...')).not.toBeInTheDocument();
      expect(screen.getByText('Next player: O')).toBeInTheDocument();
    });
  });

  it('renders the Tic Tac Toe board', () => {
    render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Human' });
    fireEvent.click(startButton);

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(9);
  });

  it('marks cells with X and O on click', () => {
    render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Human' });
    fireEvent.click(startButton);
    const cells = screen.getAllByTestId('cell');

    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');

    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
  });

  it('detects a win condition and displays the winner', () => {
    const { rerender } = render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Human' });
    fireEvent.click(startButton);
    const cells = screen.getAllByTestId('cell');

    // Simulate X winning horizontally in the top row
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[2]); // X

    rerender(<Game />);
    expect(screen.getByText('Winner: X')).toBeInTheDocument();
  });

  it('detects a draw and displays the appropriate message', () => {
    const { rerender } = render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Human' });
    fireEvent.click(startButton);
    const cells = screen.getAllByTestId('cell');

    // Simulate a full board without a winner
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[8]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[7]); // X
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[3]); // X

    rerender(<Game />);
    expect(screen.getByText(`It's a draw!`)).toBeInTheDocument();
  });

  it('resets the game when the button is clicked', () => {
    const { rerender } = render(<Game />);
    const startButton = screen.getByRole('button', { name: 'Human vs Human' });
    fireEvent.click(startButton);
    const cells = screen.getAllByTestId('cell');
    const resetButton = screen.getByRole('button', { name: 'Reset Game' });

    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O

    fireEvent.click(resetButton);
    rerender(<Game />);

    cells.forEach(cell => expect(cell).toHaveTextContent('')); 
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });
});