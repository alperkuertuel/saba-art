import styled, {keyframes} from "styled-components";

export default function LoadingDots() {
    return <><LoadingDot1>.</LoadingDot1>
    <LoadingDot2>.</LoadingDot2>
    <LoadingDot3>.</LoadingDot3></>;
  }
  
  const rotate1 = keyframes`
    from {
      transform: rotate(40deg);
    }
    to {
      transform: translate(120deg);
    }
  `
  
  const rotate2 = keyframes`
    from {
      transform: rotate(120deg);
    }
    to {
      transform: translate(240deg);
    }
  `
  
  const rotate3 = keyframes`
    from {
      transform: rotate(240deg);
    }
    to {
      transform: translate(360deg);
    }
  `
  
  
  const LoadingDot1 = styled.span`
    display: inline-block;
    margin: 1px;
    animation: ${rotate1} 1.5s ease-out infinite;

  `
  
  const LoadingDot2 = styled.span`
    display: inline-block;
    margin: 2px;
    animation: ${rotate2} 1.5s ease-out infinite;
  `
  
  const LoadingDot3 = styled.span`
    display: inline-block;
    margin: 2px;
    animation: ${rotate3} 1.5s ease-out infinite;
`