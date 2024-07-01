import React from 'react';
import Cell from './Cell';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  margin: 0 auto;
  margin-top: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px; 
  width: 450px; 

  @media (max-width: 768px) {
    width: 90%; 
  }
`;

interface BoardProps {
  board: string[];
  onCellClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <BoardContainer>
      {board.map((value, index) => (
        <Cell key={index} value={value} onClick={() => onCellClick(index)} />
      ))}
    </BoardContainer>
  );
};

export default Board;
