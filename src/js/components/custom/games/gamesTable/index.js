import React from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "./tableWrapper";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { getFormFields } from "~containers/games/constants";
import { Button, Section, Span } from "~components/atoms";

const GamesTable = ({
  games,
  isLoading,
  pagination,
  onChangePageClick,
  onSearchChange,
  isMobile,
  selectedLanguage,
  onSubmitGameDelete,
  theme
}) => {
  const { t } = useTranslation();

  const icons = [
    {
      label: "Delete", // TODO: add to translation once you implement the actions
      icon: "delete",
      onClick: data => {
        if (confirm(`Are you sure you want to delete ${data.title}?`)) {
          return onSubmitGameDelete(data);
        }
      }
    }
  ];
  const tableHeaders = [
    t("GamesTableSecondColumn"),
    t("GamesTableFirstColumn")
  ];

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            minWidth="6rem"
          >
            {header}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("GamesTableFirstColumn"))}
            <Span>{item.title}</Span>
          </Section>
          <Section>
            {renderHeader(t("GamesTableSecondColumn"))}
            <Span>{item.platform}</Span>
          </Section>
        </>
      );
    }

    return <Span>{item[itemKey]}</Span>;
  };

  return (
    <MainWrapper>
      <GamesTableStyle>
        <FlexBox
          flexDirection={{ md: "row-reverse", base: "column" }}
          alignItems="center"
          padding="1em 0"
        >
          <Button
            to={`/${selectedLanguage}/admin-games/new/create`}
            width={{ base: "15.5em", md: "auto" }}
            padding="0.5em 2.5em"
          >
            {t("CreateGame")}
          </Button>
          <DynamicForm
            formFields={getFormFields({
              onSearchChange: onSearchChange
            })}
            displayButtons={false}
            className="games-search__form"
          />
        </FlexBox>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={games.toJS()}
            excludedProps={[
              "id",
              "bannerImageUrl",
              "banners",
              "rules",
              "summary",
              "thumbnailUrl"
            ]}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("GamesTableTitle")}
            mobileCellIndex={1}
            urlConstructor={() => {}}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
          />
        </TableWrapper>
        <Pagination
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </GamesTableStyle>
    </MainWrapper>
  );
};

const GamesTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(GamesTable);
