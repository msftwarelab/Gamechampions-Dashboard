import { styled, media } from "~theme";

export const NotificationsSnackBar = styled("div")`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: 4.8em;
  background-color: ${({ theme }) => theme.colors.snackBarBackgroundColor};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 16px;
  position: fixed;
  z-index: 998;

  animation: fadein 0.5s, fadeout 0.5s 5.6s;
  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 4.8em;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      top: 4.8em;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }
  ${media.md`
  width:330px;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  @keyframes fadein {
    from {
      top: -56px;
      opacity: 0;
    }
    to {
      top: 1em;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      top: 1em;
      opacity: 1;
    }
    to {
      top: -56px;
      opacity: 0;
    }
  }
`};
`;
