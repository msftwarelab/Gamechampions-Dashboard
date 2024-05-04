import React, { Component, Fragment } from "react";
import { styled, withTheme } from "~theme";
import { Icon, Section } from "~components/atoms";
import { isElementInViewport } from "../../../../util/util";
import { ColouringStyle } from "../../../styles";

class TableMobileIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      top: null,
      bottom: null
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    if (!this.mobileIconsRef) {
      this.mobileIconsRef = el;
    }
  }

  handleCloseEvent(e) {
    const { dataReference } = this.props;
    if (e.target && e.target.id !== `more-${dataReference}`) {
      this.setState({
        visible: false
      });
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleCloseEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleCloseEvent);
  }

  handleMoreClick() {
    const { tableRef } = this.props;

    this.setState(
      prevState => {
        return {
          visible: !prevState.visible
        };
      },
      () => {
        const overflowTable = tableRef.scrollHeight > tableRef.clientHeight;
        const isInViewport = isElementInViewport(this.mobileIconsRef);

        if (overflowTable || !isInViewport) {
          this.setState({
            top: null,
            bottom: "1rem"
          });
        }
      }
    );
  }

  render() {
    const { dataReference, icons, postfix, theme, item } = this.props;
    const { visible, top, bottom } = this.state;
    const { tableTheme } = theme;
    const { mobileIconsTheme } = tableTheme;

    return (
      <Fragment>
        <Icon
          id={`more-${dataReference}`}
          icon="moreVert"
          onClick={this.handleMoreClick}
        />
        <TableMobileIconsStyle
          {...mobileIconsTheme}
          ref={this.setRef}
          top={top}
          bottom={bottom}
          visible={visible}
        >
          {icons.map((icon, iconIdx) => {
            return (
              <Section
                margin="1rem"
                key={iconIdx}
                onClick={() => {
                  icon.onClick(item);
                }}
              >{`${icon.label} ${postfix}`}</Section>
            );
          })}
        </TableMobileIconsStyle>
      </Fragment>
    );
  }
}

export default withTheme(TableMobileIcons);

const TableMobileIconsStyle = styled.div`
  ${ColouringStyle};
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  top: ${({ top }) => top && top};
  bottom: ${({ bottom }) => bottom && bottom};
  right: 3rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2), 0 0 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  z-index: 2;
`;
