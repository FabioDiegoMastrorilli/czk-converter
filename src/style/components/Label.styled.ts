import styled from "styled-components";

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text[2]};
  font-size: ${({ theme }) => theme.fonts.size[2]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

export default Label;
