import React, { Component } from "react";
import { default as styled, withTheme, css } from "styled-components";
import { ColouringStyle, FontSizeStyle } from "../../styles/";

import TableHead from "./tableHead";
import TableHeadCell from "./tableHeadCell";
import TableHeadRow from "./tableHeadRow";
import TableRow from "./tableRow";
import TableCell from "./tableCell";
import TableBody from "./tableBody";
import TableMobileIcons from "./tableMobileIcons";
import { Icon } from "~components/atoms/";
import { withTranslation } from "react-i18next";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null
    };

    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    if (!this.state.tableRef) {
      this.setState({ tableRef: el });
    }
  }

  filterIcons(icon, item) {
    if (!item.blockedIcons) {
      return true;
    }
    return !item.blockedIcons.find(id => id === icon.id);
  }

  renderIcons({ item, index }) {
    const { icons, iconProps } = this.props;

    if (icons && icons.length > 0) {
      const filteredIcons = icons.filter(x => this.filterIcons(x, item));

      return (
        <React.Fragment>
          <TableCell className="table__icons">
            {icons.map((icon, iconIdx) => {
              return (
                <Icon
                  {...iconProps}
                  key={iconIdx}
                  icon={icon["icon"]}
                  title={icon.label}
                  color={
                    typeof icon.color == "function" ? icon.color(item) : null
                  }
                  isDisabled={
                    filteredIcons.length === 0 ||
                    !filteredIcons.find(item => item.id === icon.id)
                  }
                  onClick={() => {
                    icon.onClick(item);
                  }}
                />
              );
            })}
          </TableCell>
          {filteredIcons && filteredIcons.length ? (
            <TableCell className="table__more">
              <TableMobileIcons
                tableRef={this.state.tableRef}
                icons={filteredIcons}
                item={item}
                postfix={item[Object.keys(item)[0]]}
                icon="moreVert"
                dataReference={index}
              />
            </TableCell>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
  }

  render() {
    const {
      headers,
      isLoading,
      title,
      data,
      excludedProps,
      mobileCellIndex,
      icons,
      noResultLabel,
      theme,
      urlConstructor,
      onCellClick,
      cellTemplate,
      isMobile,
      mobileHeaders,
      t
    } = this.props;

    const noResultFound = !isLoading && (!data || !data.length);
    let headersData = icons && icons.length ? [...headers, ""] : headers;
    headersData = isMobile ? mobileHeaders : headersData;
    const { tableTheme = {} } = theme;
    const { rootTheme = {} } = tableTheme;

    const tableExcludeProp = [
      ...(excludedProps || []),
      "isTableRowHighlighted",
      "isTableRowSeparator"
    ];

    return (
      <TableStyle
        {...rootTheme}
        cellSpacing="0"
        cellPadding="0"
        ref={this.setRef}
        isLoading={isLoading}
        noResultFound={noResultFound}
      >
        <TableHead title={!mobileHeaders ? title : ""}>
          <TableHeadRow>
            {headersData.map((header, index) => {
              return (
                <TableHeadCell key={index} hasMobileHeaders={!!mobileHeaders}>
                  {t(header)}
                </TableHeadCell>
              );
            })}
          </TableHeadRow>
        </TableHead>
        <TableBody
          isLoading={isLoading}
          noResultFound={noResultFound}
          noResultLabel={noResultLabel}
        >
          {data.map((item, index) => {
            return (
              <TableRow
                key={index}
                disabled={item.isDisabled}
                hasMobileHeaders={!!mobileHeaders}
                hasSeparator={item.isTableRowSeparator}
              >
                {Object.keys(item).map((itemKey, itemIdx) => {
                  if (tableExcludeProp.includes(itemKey)) {
                    return;
                  }

                  return (
                    <TableCell
                      hasMobileHeaders={!!mobileHeaders}
                      mobileCellIndex={mobileCellIndex}
                      url={urlConstructor && urlConstructor(item)}
                      isHighlighted={item.isTableRowHighlighted}
                      key={itemIdx}
                      onClick={() => {
                        onCellClick && onCellClick(item);
                      }}
                    >
                      {cellTemplate
                        ? cellTemplate({ item, itemKey })
                        : item[itemKey]}
                    </TableCell>
                  );
                })}

                {this.renderIcons({ item, index })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableStyle>
    );
  }
}

export default withTheme(withTranslation()(Table));

const TableStyle = styled.table`
  ${ColouringStyle};
  ${FontSizeStyle};
  overflow: hidden;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  ${props => {
    const { isLoading, noResultFound } = props;
    if (isLoading || noResultFound) {
      return css`
        opacity: 0.33;
        pointer-events: none;
        font-style: italic;
        text-align: left;
      `;
    }
  }};
`;
