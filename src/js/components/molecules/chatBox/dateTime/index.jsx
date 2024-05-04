import { styled } from "~theme";

const DateTime = styled.div`
  padding: 1em 0.5em 0;
  font-size: 0.8em;
  font-style: italic;
  ${({ isFromSender }) =>
    isFromSender
      ? `
      text-align: left;
  `
      : `
      text-align: right;
  `}
`;

export default DateTime;
