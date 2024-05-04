import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Button, FlexBox, Span } from "~components/atoms";
import { withTheme } from "~theme";
import DynamicForm from "../dynamicForm";
import Separator from "../separator";
import { FIELD_TYPES } from "../dynamicForm/constants";

const getTabListDropDown = ({ tabItems, history, selectedLanguage, t }) => {
  return [
    {
      id: 1,
      name: "type",
      componentType: FIELD_TYPES.DROP_DOWN,
      fieldProps: {
        label: "TabListDropDown",
        type: "text",
        autoComplete: "type",
        material: true,
        onChange: value => {
          let selectedTab = tabItems[value];
          history.push(`/${selectedLanguage}${selectedTab.to}`);
        }
      },
      options:
        tabItems &&
        tabItems.length > 0 &&
        tabItems.map((i, k) => ({
          id: k,
          title: t(i.title).toUpperCase()
        }))
    }
  ];
};

const getInitialTabListValue = ({ tabItems, match, selectedLanguage }) => {
  let activeTab =
    tabItems &&
    tabItems.length > 0 &&
    tabItems.findIndex(x => `/${selectedLanguage}${x.path}` === match.path);

  if (activeTab === -1) {
    return { type: "" };
  }

  return { type: activeTab + "" };
};

const TabMenu = ({ selectedLanguage, tabs, match = {}, theme, history }) => {
  let { params = {} } = match;
  const { t } = useTranslation();

  let tabItems =
    tabs &&
    tabs.length > 0 &&
    tabs.map(i => {
      let path = i.path;
      for (let param in params) {
        path = path.replace(`:${param}`, params[param]);
      }
      i.to = path;
      return i;
    });
  return (
    <>
      <FlexBox
        display={{ base: "none", md: "flex" }}
        padding=".5em"
        gap="1em"
        width="100%"
        alignItems={{ base: "center", md: "unset" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {tabItems &&
          tabItems.length > 0 &&
          tabItems.map((tab, i) => (
            <Button
              key={i}
              backgroundColor={
                `/${selectedLanguage}${tab.path}` === match.path
                  ? theme.colors.secondary
                  : theme.colors.primary
              }
              hoverBackgroundColor={theme.colors.secondary}
              to={`/${selectedLanguage}${tab.to}`}
            >
              <Span textTransform="uppercase" textAlign="center">
                {t(tab.title)}
              </Span>
            </Button>
          ))}
      </FlexBox>
      <FlexBox
        display={{ base: "flex", md: "none" }}
        flexDirection="column"
        padding="1em"
      >
        <DynamicForm
          formFields={getTabListDropDown({
            history,
            tabItems,
            selectedLanguage,
            t
          })}
          displayButtons={false}
          initialValues={getInitialTabListValue({
            tabItems,
            match,
            selectedLanguage
          })}
        />
      </FlexBox>
      <Separator />
    </>
  );
};

export default withRouter(withTheme(TabMenu));
