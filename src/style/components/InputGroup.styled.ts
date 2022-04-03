import styled from "styled-components";

type InputGroupProps = {
  bottomSpace?: boolean;
};

const InputGroup = styled.div<InputGroupProps>`
  margin-bottom: ${({ bottomSpace, theme }) =>
    bottomSpace ? theme.spacing[3] : 0};
  display: flex;
  flex-direction: column;
`;

export default InputGroup;
