import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
import { FlexBox, Paragraph, Button } from "~components/atoms";

const PwaItem = ({
  theme,
  selectedLanguage,
  history,
  isIos,
  deferredPrompt,
  t
}) => {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setPromptInstall(e);
      return false;
    };
    window.addEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = evt => {
    if (isIos) {
      history.replace(`/${selectedLanguage}/ios-a2hs`);
    } else if (deferredPrompt !== null) {
      evt.preventDefault();
      deferredPrompt.prompt();
    } else if (promptInstall !== null) {
      evt.preventDefault();
      promptInstall.prompt();
    }
  };

  return (
    <FlexBox
      flexDirection="column"
      width="100%"
      padding="0.625em 1em 0.875em"
      gap="4px"
      backgroundColor={theme.colors.mistyGrey}
      hoverBackgroundColor={theme.colors.linenGrey}
      borderRadius="1.25em"
      margin="0 0 0.5em"
      onClick={onClick}
    >
      <FlexBox justifyContent="center">
        <img
          src="/img/manifest/manifest-logo-192.png"
          title="gc-logo"
          alt="gc-logo"
          width="44px"
          style={{
            borderRadius: "0.75em"
          }}
        />
      </FlexBox>
      <FlexBox>
        <Paragraph
          textAlign="center"
          fontSize={theme.fonts.small}
          color={theme.colors.pewterGrey}
        >
          {t("PWAItemTitle")}
        </Paragraph>
      </FlexBox>
      <FlexBox width="100%">
        <Button
          to="#"
          width="100%"
          backgroundColor={theme.colors.tealBlue}
          hoverBackgroundColor={theme.colors.tealBlue}
          color={theme.colors.white}
          fontSize={theme.fonts.small}
          padding="6px"
          aria-label="Get App"
        >
          {t("PWAItemButton")}
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(PwaItem);
