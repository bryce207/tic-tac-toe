import React from "react";
import styled, {css} from "styled-components";

const CellButton = styled.button<{ disabled: boolean }>`
  background-color: #000; // Dark background
  color: #fff; // White text
  border: 2px solid #fff;
  font-size: 72px;
  line-height: 1;
  cursor: pointer;
  border-radius: 10px;
  height: 100px;

  ${(props) =>
    !props.disabled &&
    css`
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
      }
    `}

  &:disabled {
    cursor: default;
  }
`;

interface CellProps {
  value: string;
  onClick: () => void;
  disabled?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, disabled = false }) => {
  return (
    <CellButton onClick={onClick} data-testid="cell" disabled={value !== "" || disabled}>
      {value}
    </CellButton>
  );
};

export default Cell;
