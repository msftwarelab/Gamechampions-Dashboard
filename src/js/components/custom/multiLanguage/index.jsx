import React from "react";
import { FlexBox, Wrapper } from "~components/atoms";
import { useTranslation } from "react-i18next";
import { ListItem } from "./listItem";
import { ListItemImage } from "./listItemImage";
import { DropDownHeader } from "./dropDownHeader";
import { DropDownHeaderImage } from "./dropDownHeaderImage";
import { DropDownList } from "./dropDownList";
import { LanguageText } from "./lenguageText";
import SelectorWrapper from "./selectorWrapper";

const LanguageSelectorDropdown = ({
  currentLanguage,
  openDropdown,
  options,
  changeLanguage,
  toggling,
  currentFlag,
  authentication,
  showOnMobile,
  isDirectionTop = false
}) => {
  const { t } = useTranslation();
  return (
    <SelectorWrapper
      isAuthenticated={authentication.get("token")}
      showOnMobile={showOnMobile}
    >
      <DropDownHeader onClick={toggling}>
        <FlexBox alignItems="center" justifyContent="center" gap="6px">
          <DropDownHeaderImage
            src={currentFlag}
            title={`${currentLanguage} thumbnail`}
            alt={`${currentLanguage} thumbnail`}
            className="game-thumb__img"
          />
          <LanguageText>{t(currentLanguage)}</LanguageText>
        </FlexBox>
      </DropDownHeader>
      {openDropdown && (
        <Wrapper>
          <DropDownList isDirectionTop={isDirectionTop}>
            {options.map((option, index) => (
              <FlexBox key={index} alignItems="center" padding="5px 0 0 5px">
                <ListItemImage
                  src={option.get("flagPath")}
                  title={`${option.get("title")} icon`}
                  alt={"Flag"}
                />
                <ListItem
                  onClick={() => {
                    changeLanguage(option.toJS());
                  }}
                  key={index}
                >
                  {t(option.get("title"))}
                </ListItem>
              </FlexBox>
            ))}
          </DropDownList>
        </Wrapper>
      )}
    </SelectorWrapper>
  );
};

export default LanguageSelectorDropdown;
