import React from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { FlexBox } from "~components/atoms";
import { Section, Span, Icon } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";

const DuplicateIpsTable = ({
  duplicateIpPlayers,
  formFields,
  initialValues,
  isLoading,
  onChangePageClick,
  isMobile,
  theme,
  pagination,
  selectedLanguage
}) => {
  const { t } = useTranslation();

  const icons = [];

  const tableHeaders = [
    t("DuplicateIpsTableFirstColumn"),
    t("DuplicateIpsTableSecondColumn"),
    t("DuplicateIpsTableThirdColumn"),
    t("DuplicateIpsTableFourthColumn")
  ];

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            margin="0 5px 0 0"
          >
            {header}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("DuplicateIpsTableFirstColumn"))}
            <Span>{item.ipAddress}</Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsTableSecondColumn"))}
            <Span>{item.numberOfPlayers}</Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsTableThirdColumn"))}
            <Span>
              {item.emails.map(({ value, isBlocked }, index) => {
                return (
                  <FlexBox
                    key={index}
                    color={isBlocked ? theme.colors.tertiaryLight : undefined}
                    flexDirection="row"
                    alignItems="center"
                  >
                    {value}
                    {isBlocked && (
                      <Icon
                        scale="1"
                        icon="block"
                        color={theme.colors.errorColor}
                        margin="0 0 0 .5rem"
                      />
                    )}
                  </FlexBox>
                );
              })}
            </Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsTableFourthColumn"))}
            <Span>
              {item.userNames.map(({ value, isBlocked }, index) => {
                return (
                  <FlexBox
                    key={index}
                    color={isBlocked ? theme.colors.tertiaryLight : undefined}
                    flexDirection="row"
                    alignItems="center"
                  >
                    {value}
                    {isBlocked && (
                      <Icon
                        scale="1"
                        icon="block"
                        color={theme.colors.errorColor}
                        margin="0 0 0 .5rem"
                      />
                    )}
                  </FlexBox>
                );
              })}
            </Span>
          </Section>
        </>
      );
    }

    return Array.isArray(item[itemKey]) ? (
      <FlexBox flexDirection="column">
        {Array.from(item[itemKey]).map(({ value, isBlocked }, index) => (
          <FlexBox
            key={index}
            color={isBlocked ? theme.colors.tertiaryLight : undefined}
            flexDirection="row"
            alignItems="center"
          >
            {value}
            {isBlocked && (
              <Icon
                scale="1"
                icon="block"
                color={theme.colors.errorColor}
                margin="0 0 0 .5rem"
              />
            )}
          </FlexBox>
        ))}
      </FlexBox>
    ) : (
      <Span overflowWrap="anywhere">{item[itemKey]}</Span>
    );
  };

  let data = (duplicateIpPlayers && duplicateIpPlayers.toJS()) || [];
  return (
    <MainWrapper height="unset">
      <FlexBox flex="1 1 100%">
        {initialValues.from && initialValues.to && (
          <DynamicForm
            formWrapperProps={{
              width: {
                base: "100%",
                md: "70%"
              },
              margin: {
                base: "1rem",
                md: "0 auto"
              }
            }}
            formFields={formFields}
            initialValues={initialValues}
            displayButtons={false}
            className="admin-filter__form"
          />
        )}
      </FlexBox>
      <DuplicateIpsTableStyle>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={data}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("IpsDuplicateReport")}
            mobileCellIndex={1}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            excludedProps={["isBlocked"]}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
            urlConstructor={item => {
              return `/${selectedLanguage}/ips-report/detail?ipaddress=${item.ipAddress}&from=${initialValues.from}&to=${initialValues.to}`;
            }}
          />
        </TableWrapper>
        <Pagination
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </DuplicateIpsTableStyle>
    </MainWrapper>
  );
};

const DuplicateIpsTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(DuplicateIpsTable);
