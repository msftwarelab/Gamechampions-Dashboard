import React from "react";
import { default as styled, withTheme } from "styled-components";

const SlotContainer = React.forwardRef((props, ref) => {
  const { children, className, transitionTime } = props;

  return (
    <SlotContainerStyle
      className={className}
      ref={ref}
      transitionTime={transitionTime}
    >
      {children}
    </SlotContainerStyle>
  );
});

SlotContainer.displayName = "SlotContainer";

const SlotContainerStyle = styled.div`
  position: absolute;
  top: -5px;
  left: 5px;
  width: 100%;
  text-align: center;
  transition: top ease ${({ transitionTime }) => transitionTime}s;
`;

export default withTheme(SlotContainer);
