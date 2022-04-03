import styled from "styled-components";

export const H1 = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text[1]};
  font-size: ${({ theme }) => theme.fonts.size[4]};
  font-weight: 500;

  .highlight {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: calc(100% + ${({ theme }) => theme.spacing[1]});
      left: 0;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;
