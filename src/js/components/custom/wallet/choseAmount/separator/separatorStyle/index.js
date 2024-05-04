import { styled, media } from "~theme";

export const SeparatorStyle = styled("div")`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.small};
  font-weight: ${({ theme }) => theme.fonts.semiBold};
  text-transform: uppercase;
  padding: 0.5em 0;

  &:before {
    position: relative;
    display: inline-block;
    width: calc(50% - 1.5em);
    height: 1px;
    background-color: ${({ theme }) => theme.colors.greyLight};
    content: "";
    vertical-align: middle;
    margin-left: 1em;
    right: 1em;

    ${media.md`
    margin-left: 1.5em;
    width: calc(50% - 2.5em);
  `};
  }

  &:after {
    position: relative;
    display: inline-block;
    width: calc(50% - 1.75em);
    height: 1px;
    background-color: ${({ theme }) => theme.colors.greyLight};
    content: "";
    vertical-align: middle;
    left: 1em;
    margin-right: -50%;
    clear: both;

    ${media.md`
    width: calc(50% - 2em);
  `};
  }
`;
