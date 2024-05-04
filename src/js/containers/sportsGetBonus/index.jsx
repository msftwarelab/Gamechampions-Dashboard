import React from "react";
import { withTranslation } from "react-i18next";
import { withPage } from "~hocs";
import { withTheme } from "~theme";
import hoistStatics from "hoist-non-react-statics";
import {
  FlexBox,
  Image,
  Paragraph,
  Loader,
  Button,
  Icon
} from "~components/atoms";
import ConfirmBox from "~components/molecules/confirmBox";
import Card from "~components/card/card";
import Modal from "~components/modal/modal";
import DynamicForm from "~components/molecules/dynamicForm";
import { clearBoyOutcomes } from "~containers/boyGameLobby/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { REDUCER_NAME } from "~containers/boyGameLobby/constants";
import { GAMES, getBonusFields } from "./constants";
import { getPage } from "~containers/page/actions";
import { connect } from "react-redux";
import {
  assignDefaultGame,
  assignDefaultGameUsername,
  claimWelcomeBonus
} from "~containers/myaccount/actions";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { toast } from "react-toastify";
import { selectHasPlayerReceivedWelcomeBonus } from "~containers/boyGameLobby/reducer";

class GetBonus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selectGame = this.selectGame.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.claimBonus = this.claimBonus.bind(this);
    this.state = {
      currentStep: 1,
      urlSportsPage: null,
      isConfirmVisible: false,
      selectedGame: 1,
      gameUsername: ""
    };
  }

  componentDidMount() {
    const { selectedLanguage, profile } = this.props;

    // if (profile.get("defaultGameType") != 0) {
    //   this.setState({
    //     currentStep: 3
    //   });
    // }

    this.setState({
      urlSportsPage: `/${selectedLanguage}/arena`
    });
  }

  componentDidUpdate(prev) {
    const { error, t } = this.props;
    if (prev.error === null && error !== null) {
      toast(<ErrorToastNotification message={t(error)} />, {
        className: "toast-custom",
        hideProgressBar: true,
        closeButton: false
      });
    }
  }

  selectGame(value) {
    this.setState({
      selectedGame: value
    });
  }

  stepForward() {
    const { currentStep, selectedGame, gameUsername } = this.state;
    const {
      profile,
      onAssignDefaultGame,
      onAssignDefaultGameUsername,
      t
    } = this.props;
    if (currentStep < 4) {
      if (currentStep == 1) {
        if (selectedGame > 0) {
          onAssignDefaultGame({
            playerId: profile.get("id"),
            defaultGameType: selectedGame
          });
          this.setState({
            currentStep: currentStep + 1
          });
        } else {
          toast(
            <ErrorToastNotification message={t("SelectGameErrorMessage")} />,
            {
              className: "toast-custom",
              hideProgressBar: true,
              closeButton: false
            }
          );
        }
      } else if (currentStep == 2) {
        if (gameUsername != "") {
          onAssignDefaultGameUsername({
            playerId: profile.get("id"),
            defaultGameType: selectedGame,
            PSNId: profile.get("psnId"),
            XBOXLive: profile.get("xboxLive"),
            FortniteGamertag: profile.get("fortniteGamertag"),
            EAAccount: selectedGame != 3 ? gameUsername : "",
            Nba2KAccount: selectedGame == 3 ? gameUsername : ""
          });

          this.setState({
            currentStep: currentStep + 1
          });
        } else {
          toast(
            <ErrorToastNotification
              message={t("InputEAUsernameErrorMessage")}
            />,
            {
              className: "toast-custom",
              hideProgressBar: true,
              closeButton: false
            }
          );
        }
      }
    }
  }

  onChangeUsername(value) {
    this.setState({
      gameUsername: value
    });
  }

  claimBonus() {
    const { onClaimWelcomeBonus, profile, history } = this.props;
    const { urlSportsPage } = this.state;
    onClaimWelcomeBonus({ playerId: profile.get("id") });
    history.push(urlSportsPage);
  }

  render() {
    const { theme, profile, t, history, selectedLanguage } = this.props;
    const {
      currentStep,
      urlSportsPage,
      isConfirmVisible,
      selectedGame,
      gameUsername
    } = this.state;
    const userId = profile.get("id");

    return (
      <>
        <Modal modalClassName="bonus-modal">
          <Card
            className="create-challenge-form"
            closeUrl={urlSportsPage}
            isFooterNoPadding={true}
          >
            {!userId ? (
              <FlexBox justifyContent="center" padding="1rem 0">
                <Loader
                  isLoading={true}
                  height="4em"
                  alignItems="center"
                  scale="6rem"
                />
              </FlexBox>
            ) : (
              <>
                {currentStep === 1 && (
                  <FlexBox width="100%" flexDirection="column">
                    <FlexBox
                      padding="1rem 0"
                      gap="0.4rem"
                      flexDirection="column"
                    >
                      <h1>{t("WelcomeBonusTitle")}</h1>
                      <Paragraph fontSize="1rem">
                        {t("WelcomeBonusTitle2")}
                      </Paragraph>
                    </FlexBox>
                    <FlexBox
                      justifyContent="center"
                      flexDirection={{ base: "column", md: "row" }}
                      alignItems="center"
                      gap="2rem"
                      margin="3rem 0 0 0"
                    >
                      <FlexBox
                        justifyContent="center"
                        flexDirection="row"
                        alignItems="center"
                        gap="2rem"
                      >
                        <FlexBox
                          flexDirection="column"
                          position="relative"
                          onClick={() => this.selectGame(GAMES.FIFA)}
                        >
                          <Image
                            src="/img/FIFA.png"
                            className={
                              selectedGame === GAMES.FIFA
                                ? "games-selected-border"
                                : ""
                            }
                            width={{ base: "8rem", md: "9.375rem" }}
                          />
                          <FlexBox
                            className={
                              selectedGame === GAMES.FIFA
                                ? "games-selected"
                                : ""
                            }
                          />
                          <Paragraph
                            textTransform="uppercase"
                            color={
                              selectedGame === GAMES.FIFA
                                ? theme.colors.kiwigreen
                                : "black"
                            }
                          >
                            {t("WelcomeBonusFIFA")}
                          </Paragraph>
                        </FlexBox>
                        <FlexBox
                          flexDirection="column"
                          onClick={() => this.selectGame(GAMES.WARZONE)}
                          position="relative"
                        >
                          <Image
                            src="/img/Warzone 2.png"
                            className={
                              selectedGame === GAMES.WARZONE
                                ? "games-selected-border"
                                : ""
                            }
                            width={{ base: "8rem", md: "9.375rem" }}
                          />
                          <FlexBox
                            className={
                              selectedGame === GAMES.WARZONE
                                ? "games-selected"
                                : ""
                            }
                          />
                          <Paragraph
                            textTransform="uppercase"
                            color={
                              selectedGame === GAMES.WARZONE
                                ? theme.colors.kiwigreen
                                : "black"
                            }
                          >
                            {t("WelcomeBonusWarzone")}
                          </Paragraph>
                        </FlexBox>
                      </FlexBox>
                      <FlexBox
                        justifyContent="center"
                        flexDirection="row"
                        alignItems="center"
                        gap="2rem"
                      >
                        <FlexBox
                          flexDirection="column"
                          position="relative"
                          onClick={() => this.selectGame(GAMES.NBA)}
                        >
                          <Image
                            src="/img/NBA 2K.png"
                            className={
                              selectedGame === GAMES.NBA
                                ? "games-selected-border"
                                : ""
                            }
                            width={{ base: "8rem", md: "9.375rem" }}
                          />
                          <FlexBox
                            className={
                              selectedGame === GAMES.NBA ? "games-selected" : ""
                            }
                          />
                          <Paragraph
                            textTransform="uppercase"
                            color={
                              selectedGame === GAMES.NBA
                                ? theme.colors.kiwigreen
                                : "black"
                            }
                          >
                            {t("WelcomeBonusNBA")}
                          </Paragraph>
                        </FlexBox>
                        <FlexBox
                          flexDirection="column"
                          position="relative"
                          onClick={() => this.selectGame(GAMES.MADDEN)}
                        >
                          <Image
                            src="/img/Madden.png"
                            className={
                              selectedGame === GAMES.MADDEN
                                ? "games-selected-border"
                                : ""
                            }
                            width={{ base: "8rem", md: "9.375rem" }}
                          />
                          <FlexBox
                            className={
                              selectedGame === GAMES.MADDEN
                                ? "games-selected"
                                : ""
                            }
                          />
                          <Paragraph
                            textTransform="uppercase"
                            color={
                              selectedGame === GAMES.MADDEN
                                ? theme.colors.kiwigreen
                                : "black"
                            }
                          >
                            {t("WelcomeBonusMadden")}
                          </Paragraph>
                        </FlexBox>
                      </FlexBox>
                      <FlexBox
                        justifyContent="center"
                        flexDirection="row"
                        alignItems="center"
                        gap="2rem"
                      >
                        <FlexBox
                          flexDirection="column"
                          position="relative"
                          onClick={() => this.selectGame(GAMES.FORTNITE)}
                        >
                          <Image
                            src="/img/fortnite.png"
                            className={
                              selectedGame === GAMES.FORTNITE
                                ? "games-selected-border"
                                : ""
                            }
                            width={{ base: "8rem", md: "9.375rem" }}
                          />
                          <FlexBox
                            className={
                              selectedGame === GAMES.FORTNITE
                                ? "games-selected"
                                : ""
                            }
                          />
                          <Paragraph
                            textTransform="uppercase"
                            color={
                              selectedGame === GAMES.FORTNITE
                                ? theme.colors.kiwigreen
                                : "black"
                            }
                          >
                            {t("WelcomeBonusFortnite")}
                          </Paragraph>
                        </FlexBox>
                      </FlexBox>
                    </FlexBox>
                    <FlexBox
                      justifyContent="center"
                      alignItems="center"
                      gap="2rem"
                      margin="3rem 0 0 0"
                    >
                      <Button
                        backgroundColor={theme.colors.white}
                        hoverBackgroundColor={theme.colors.white}
                        color={`${theme.colors.secondary} !important`}
                        boxShadow="none"
                        width="18rem"
                        onClick={() => history.push(urlSportsPage)}
                      >
                        {t("ButtonDynamicFormCancel")}
                      </Button>
                      <Button width="10rem" onClick={() => this.stepForward()}>
                        {t("ButtonDynamicFormContinue")}
                      </Button>
                    </FlexBox>
                  </FlexBox>
                )}

                {currentStep === 2 && (
                  <FlexBox width="100%" flexDirection="column">
                    <FlexBox
                      padding="1rem 0"
                      gap="0.4rem"
                      flexDirection="column"
                    >
                      <h1>{t("WelcomeBonusTitle3")}</h1>
                      <Paragraph fontSize="1rem">
                        {t("WelcomeBonusTitle4")}
                      </Paragraph>
                    </FlexBox>
                    <DynamicForm
                      formFields={getBonusFields({
                        gameUsername: gameUsername,
                        selectedGame: selectedGame,
                        onChange: this.onChangeUsername
                      })}
                      displayButtons={false}
                    />
                    <FlexBox
                      backgroundColor={theme.colors.mistyGrey}
                      hoverBackgroundColor={theme.colors.mistyGrey}
                      borderRadius="1rem"
                      margin="1.5rem 0 1.5rem"
                      padding="1rem"
                    >
                      <FlexBox alignItems="center" justifyContent="center">
                        <Icon
                          scale="2"
                          icon="info_icon_2"
                          viewBox="0 0 32 32"
                          color={theme.colors.darkSlateGray}
                          margin="0 13px 0 2px"
                        />
                      </FlexBox>
                      <FlexBox alignItems="center">
                        <Paragraph
                          color={theme.colors.darkSlateGray}
                          fontSize={theme.fonts.small}
                        >
                          {t("WelcomeBonusParagraph")}
                        </Paragraph>
                      </FlexBox>
                    </FlexBox>
                    <FlexBox
                      justifyContent="center"
                      alignItems="center"
                      gap="2rem"
                      margin="3rem 0 0 0"
                    >
                      <Button
                        backgroundColor={theme.colors.white}
                        hoverBackgroundColor={theme.colors.white}
                        color={`${theme.colors.secondary} !important`}
                        boxShadow="none"
                        width="18rem"
                        onClick={() => history.push(urlSportsPage)}
                      >
                        {t("ButtonDynamicFormCancel")}
                      </Button>
                      <Button width="10rem" onClick={() => this.stepForward()}>
                        {t("ButtonDynamicFormContinue")}
                      </Button>
                    </FlexBox>
                  </FlexBox>
                )}

                {currentStep === 3 && (
                  <FlexBox width="100%" flexDirection="column">
                    <FlexBox
                      padding="1rem 0"
                      gap="0.4rem"
                      flexDirection="column"
                    >
                      <h1>{t("WelcomeBonusTitle5")}</h1>
                      <Paragraph fontSize="1rem">
                        {t("WelcomeBonusTitle6")}
                      </Paragraph>
                    </FlexBox>
                    <FlexBox
                      position="relative"
                      backgroundColor="#6F00FF"
                      hoverBackgroundColor="#6F00FF"
                      borderRadius="1.25rem"
                      flexDirection="column"
                    >
                      <FlexBox
                        flexDirection={{ base: "column", md: "row" }}
                        justifyContent={{ base: "center", md: "unset" }}
                        alignItems={{ base: "center", md: "unset" }}
                      >
                        <FlexBox
                          position={{ base: "unset", md: "absolute" }}
                          width={{ base: "unset", md: "21rem" }}
                          margin={{ base: "1rem 0 0 0", md: "0" }}
                          top="3rem"
                          left="1rem"
                          lineHeight="3rem"
                          textAlign="center"
                        >
                          <Paragraph
                            color="#F6FB04"
                            fontSize={{ base: "2rem", md: "3rem" }}
                            fontWeight="800"
                            fontStyle="italic"
                            textTransform="uppercase"
                          >
                            {t("WelcomeBonusText1")}
                          </Paragraph>
                        </FlexBox>
                        <FlexBox
                          position={{ base: "unset", md: "absolute" }}
                          justifyContent={{ base: "center", md: "unset" }}
                          fontSize="1.5rem"
                          color={theme.colors.white}
                          top="11rem"
                          left="3rem"
                        >
                          <Paragraph>{t("WelcomeBonusText2")}</Paragraph>
                        </FlexBox>
                      </FlexBox>
                      <FlexBox
                        margin={{ base: "0", md: "0 0 0 17rem" }}
                        justifyContent={{ base: "center", md: "unset" }}
                      >
                        <Image
                          src="/img/big_cash_face_new.png"
                          width="100%"
                          margin="2.5rem"
                        />
                      </FlexBox>
                      <FlexBox
                        position={{ base: "unset", md: "absolute" }}
                        justifyContent={{ base: "center", md: "unset" }}
                        left="2rem"
                        top="16rem"
                      >
                        <Button
                          className="claim-bonus-btn"
                          width="18rem"
                          color={`${theme.colors.primary} !important`}
                          height="3.6rem"
                          margin={{ base: "0 0 1rem 0", md: "0" }}
                          backgroundColor={theme.colors.white}
                          hoverBackgroundColor={theme.colors.white}
                          onClick={() =>
                            history.push(
                              `/${selectedLanguage}/deposit/choose-amount`
                            )
                          }
                        >
                          {t("ClaimBonus")}
                        </Button>
                      </FlexBox>
                    </FlexBox>
                    <FlexBox
                      margin="2rem 0 0 0"
                      alignContent="center"
                      justifyContent="center"
                      cursor="pointer"
                    >
                      <Paragraph onClick={() => history.push(urlSportsPage)}>
                        {t("BoyWelcomeBonusGetBonusLater")}
                      </Paragraph>
                    </FlexBox>
                  </FlexBox>
                )}
              </>
            )}
          </Card>
        </Modal>

        <ConfirmBox
          isVisible={isConfirmVisible}
          title={t("BoyVerificationStep3TextConfirm")}
          onCancel={() => {
            this.setState({ isConfirmVisible: false });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state),
  hasPlayerReceivedWelcomeBonus: selectHasPlayerReceivedWelcomeBonus(state)
});

const mapDispatchToProps = dispatch => ({
  onClearBoyOutcomes: () => dispatch(clearBoyOutcomes()),
  onAssignDefaultGame: data => dispatch(assignDefaultGame(data)),
  onAssignDefaultGameUsername: data =>
    dispatch(assignDefaultGameUsername(data)),
  onClaimWelcomeBonus: data => dispatch(claimWelcomeBonus(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(withTheme(GetBonus)), GetBonus)),
  getPage,
  REDUCER_NAME
);
