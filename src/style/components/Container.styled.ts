import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[5]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 100%;
    max-width: calc(100vw - ${({ theme }) => theme.spacing[3]} * 2);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    grid-template-areas:
      "grid-header grid-header"
      "grid-form grid-chart";

    grid-template-columns: 1fr minmax(300px, 2fr);
  }

  .grid-header {
    grid-area: grid-header;
  }

  .grid-form {
    grid-area: grid-form;
  }

  .grid-chart {
    grid-area: grid-chart;
    width: 100%;
    height: 300px;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 100%;
      width: 100%;
    }
  }
`;

export default Container;
