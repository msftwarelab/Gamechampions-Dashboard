import { styled } from "~theme";

const ChatText = styled.div`
  display: block;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 1.5em;
  line-height: 1.7;
  word-break: break-word;
  ${({ isFromSender, theme }) =>
    isFromSender
      ? `
    margin-left: auto;
    background-color: ${theme.colors.tertiary};
    color: ${theme.colors.white};
  `
      : `
    background-color: ${theme.colors.whiteDark};
    color: ${theme.colors.black};
  `}
`;

export default ChatText;
