import styled from "styled-components";

const Select = styled.select`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.text[2]};
  font-size: ${({ theme }) => theme.fonts.size[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  appearance: none;
  position: relative;
`;

export default Select;
