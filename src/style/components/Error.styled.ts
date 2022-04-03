import styled from "styled-components";

const Error = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fonts.size[2]};
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.backgroundFocus};
`;

export default Error;
