import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "~theme";

export const ErrorInfo = ({ children }) => {
  const absolute = new RegExp("^(?:[a-z]+:)?//", "i");

  const history = useHistory();
  const handleClick = useCallback(
    e => {
      const targetLink = e.target.closest("a");
      if (!targetLink || !targetLink.href || targetLink.href.test(absolute))
        return;
      e.preventDefault();
      let link = targetLink.href && targetLink.href.replace(/^.*\/\/[^/]+/, "");
      history.push(link);
    },
    [history]
  );

  return <ErrorInfoStyled onClick={handleClick}>{children}</ErrorInfoStyled>;
};

export const ErrorInfoStyled = styled.span`
  display: block;
  padding: 0.25em 0.5em;
  border-left: 3px solid ${({ theme }) => theme.colors.errorColor};
  margin: 0.5em;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.errorBackgroundColor};
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.8em;
  font-weight: 500;
`;
