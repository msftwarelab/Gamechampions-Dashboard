import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import { REDUCER_NAME } from "./constants";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { FlexBox, Icon, Paragraph, Link } from "~components/atoms";
import { withTheme } from "~theme";
import { getReturnUrl } from "../../util/util";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

class IosAddToHomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, theme, t } = this.props;

    const returnUrl = getReturnUrl(this.props);

    return (
      <Modal wide={true}>
        <Card padding="0">
          <FlexBox
            minHeight="100vh"
            padding="1.5rem"
            flexDirection="column"
            backgroundColor={theme.colors.navyBlue}
            hoverBackgroundColor={theme.colors.navyBlue}
            justifyContent="space-between"
          >
            <FlexBox justifyContent="flex-end">
              <Link to="#" onClick={() => history.replace(returnUrl)}>
                <Icon
                  viewBox="0 0 22 22"
                  scale="1.25"
                  color={theme.colors.white}
                  icon="close_2"
                  cursor="pointer"
                />
              </Link>
            </FlexBox>
            <FlexBox
              backgroundColor={theme.colors.white}
              hoverBackgroundColor={theme.colors.white}
              borderRadius="2.5rem"
              padding="2rem 1.5rem"
              flexDirection="column"
              gap="2rem"
            >
              <FlexBox justifyContent="center">
                <Icon
                  viewBox="0 0 86 101"
                  scale="6.25"
                  color={theme.colors.navyBlue}
                  icon="apple"
                  cursor="default"
                />
              </FlexBox>
              <FlexBox justifyContent="center">
                <Paragraph
                  color={theme.colors.navyBlue}
                  fontSize={theme.fonts.xxLarge}
                  fontWeight={theme.fonts.bold}
                  textAlign="center"
                >
                  {t("IosAddToHomeTitle")}
                </Paragraph>
              </FlexBox>
              <FlexBox justifyContent="center">
                <Paragraph
                  color={theme.colors.navyBlue}
                  fontSize={theme.fonts.fontSizeNormal}
                  textAlign="center"
                >
                  {t("IosAddToHomeSubtitle1")}
                </Paragraph>
              </FlexBox>
            </FlexBox>
            <FlexBox flexDirection="column">
              <FlexBox justifyContent="center" gap="4px" alignItems="center">
                <Paragraph
                  color={theme.colors.white}
                  fontSize={theme.fonts.large}
                >
                  {t("IosAddToHomeSubtitle2")}
                </Paragraph>
                <Icon
                  viewBox="0 0 18 24"
                  scale="1.5"
                  color={theme.colors.azureBlue}
                  icon="iosHome"
                  cursor="pointer"
                />
                <Paragraph
                  color={theme.colors.white}
                  fontSize={theme.fonts.large}
                >
                  {t("IosAddToHomeSubtitle3")}
                </Paragraph>
              </FlexBox>
              <FlexBox width="56%" margin="0 0 1rem" justifyContent="flex-end">
                <Icon
                  viewBox="0 0 117 111"
                  scale="7.5"
                  color={theme.colors.white}
                  icon="longArrowForIos"
                  cursor="pointer"
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Card>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = () => ({});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    hoistStatics(
      withTranslation()(withTheme(IosAddToHomeScreen)),
      IosAddToHomeScreen
    )
  ),
  getPage,
  REDUCER_NAME
);
