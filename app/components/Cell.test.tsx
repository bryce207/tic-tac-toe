import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cell from './Cell';

describe('Cell', () => {
  it('renders with the correct value', () => {
    render(<Cell value="X" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('X');
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Cell value="" onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
