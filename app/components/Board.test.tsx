import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './Board'; 

describe('Board', () => {
  const mockBoard = Array(9).fill('');
  const mockOnCellClick = jest.fn();

  it('renders 9 cells', () => {
    render(<Board board={mockBoard} onCellClick={mockOnCellClick} />);
    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(9);
  });

  it('calls onCellClick when a cell is clicked', () => {
    render(<Board board={mockBoard} onCellClick={mockOnCellClick} />);
    const cell = screen.getAllByTestId('cell')[0];
    fireEvent.click(cell);
    expect(mockOnCellClick).toHaveBeenCalledTimes(1);
    expect(mockOnCellClick).toHaveBeenCalledWith(0);
  });

  it('displays the correct value in each cell', () => {
    const boardWithValues = ['X', 'O', '', 'X', 'O', '', '', '', ''];
    render(<Board board={boardWithValues} onCellClick={mockOnCellClick} />);

    boardWithValues.forEach((value, index) => {
      const cell = screen.getAllByTestId('cell')[index];
      expect(cell).toHaveTextContent(value);
    });
  });
});
