import { styled, keyframes } from "~theme";

const marqueeAnimation = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
`;

const Marquee = styled.div`
  display: inline-block;
  padding-left: 100%;
  animation: ${marqueeAnimation} 30s linear infinite;
`;

export default Marquee;
