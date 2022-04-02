import StyledLoadingIndicator from "../style/components/LoadingIndicator.styled";

const LoadingIndicator = () => (
  <StyledLoadingIndicator>
    <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
    </div>
  </StyledLoadingIndicator>
);

export default LoadingIndicator;
