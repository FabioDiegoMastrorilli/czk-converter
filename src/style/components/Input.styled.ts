import styled from "styled-components";

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.text[2]};
  font-size: ${({ theme }) => theme.fonts.size[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  transition: background-color 0.1s ease-in;
  outline-color: ${({ theme }) => theme.colors.highlight};

  &:focus {
    background-color: ${({ theme }) => theme.colors.backgroundFocus};
  }

  ${({ theme }) =>
    theme.dark &&
    `::-webkit-calendar-picker-indicator {
        filter: invert(.8);
    }`};
`;

export default Input;
