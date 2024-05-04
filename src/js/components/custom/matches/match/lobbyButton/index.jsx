import { styled, media } from "~theme";
import Button from "~components/atoms/button";

const LobbyButton = styled(Button)`
  padding: 12px 24px;
  width: 100%;
  margin: 0.5em;
  min-width: 11em;
  ${media.md`
    width: auto;
`};
`;

export default LobbyButton;
