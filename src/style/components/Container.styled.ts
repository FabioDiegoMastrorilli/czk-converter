import styled from "styled-components";

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
`;

export default Container;
