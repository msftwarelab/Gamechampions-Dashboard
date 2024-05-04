import { styled, media } from "~theme";

export const ProfileDiv = styled("div")`
  display: flex;
`;

export const ProfileName = styled("div")`
  display: none;
  color: ${({ theme }) => theme.colors.white};
  ${media.md`
    display: block;
    padding: 8%;
    `};
`;
