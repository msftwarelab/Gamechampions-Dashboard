import React from "react";
import { FlexBox, Wrapper } from "~components/atoms";
import { STORAGE_URL } from "~service/constants";
import { useTranslation } from "react-i18next";
import { ListItem } from "./listItem";
import { ListItemImage } from "./listItemImage";
import { DropDownHeader } from "./dropDownHeader";
import { DropDownHeaderImage } from "./dropDownHeaderImage";
import { DropDownList } from "./dropDownList";
import { ChampionText } from "./championText";
import SelectorWrapper from "./selectorWrapper";
import ChampionChevronDown from "./championChevronDown";

const ChampionSelectorDropdown = ({
  openDropdown,
  options,
  currentChampion,
  changeChampion,
  toggling,
  authentication,
  showOnMobile,
  isDirectionTop = false
}) => {
  const { t } = useTranslation();
  const currentChamp =
    currentChampion === "default"
      ? currentChampion
      : options.toJS().find(option => option.championName == currentChampion);
  return (
    <SelectorWrapper
      isAuthenticated={authentication.get("token")}
      showOnMobile={showOnMobile}
    >
      <DropDownHeader
        onClick={toggling}
        style={{
          borderBottomLeftRadius: openDropdown ? "0px" : "100px"
        }}
      >
        <FlexBox alignItems="center" position="relative" width="100%" gap="6px">
          <>
            {currentChamp == "default" ? (
              <>
                <DropDownHeaderImage
                  src="/img/undefined_champion_icon.png"
                  title="Undefined champion"
                  alt="Undefined champion"
                  className="game-thumb__img"
                />
                <ChampionText>{t("SelectChampion")}</ChampionText>
              </>
            ) : (
              <>
                <DropDownHeaderImage
                  src={`${STORAGE_URL}${currentChamp?.logo.imageUrl.slice(1)}`}
                  title={`${currentChamp?.displayName} thumbnail`}
                  alt={`${currentChamp?.displayName} thumbnail`}
                  className="game-thumb__img"
                />
                <ChampionText>{currentChamp?.displayName}</ChampionText>
              </>
            )}
            <ChampionChevronDown />
          </>
        </FlexBox>
      </DropDownHeader>
      {openDropdown && (
        <Wrapper>
          <DropDownList isDirectionTop={isDirectionTop}>
            {options.map((option, index) => (
              <FlexBox
                key={index}
                alignItems="center"
                padding="18px 0 0 27px"
                gap="6px"
              >
                <ListItemImage
                  src={`${STORAGE_URL}${option
                    .get("logo")
                    .get("imageUrl")
                    .slice(1)}`}
                  title={`${option.get("logo").get("title")} icon`}
                  alt={"Champion"}
                />
                <ListItem
                  onClick={() => {
                    changeChampion(option.toJS());
                  }}
                  key={index}
                >
                  {t(option.get("displayName"))}
                </ListItem>
              </FlexBox>
            ))}
          </DropDownList>
        </Wrapper>
      )}
    </SelectorWrapper>
  );
};

export default ChampionSelectorDropdown;
