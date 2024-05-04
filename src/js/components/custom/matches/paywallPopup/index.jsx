import React from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { FlexBox, Heading, Paragraph, Button } from "~components/atoms";
import Card from "~components/card/card";
import Modal from "~components/modal/modal";
import { MINIMUN_BETAMOUNT } from "~containers/createChallenge/constants";

class PaywallPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remaningTime: "00:00:00"
    };

    this.interval = null;
  }

  componentDidMount() {
    const endDate = moment()
      .utc()
      .startOf("day")
      .add(6, "hours");

    this.interval = setInterval(() => {
      let timeDiff = endDate.diff(moment(), "seconds");

      this.setState({
        remaningTime: moment.utc(timeDiff * 1000).format("HH:mm:ss")
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { closeUrl, t, walletBalance, history, language } = this.props;

    const buttonText =
      walletBalance >= MINIMUN_BETAMOUNT
        ? t("PaywallPopupButtonPlayForCashText")
        : t("PaywallPopupButtonDepositAmountText");

    return (
      <Modal>
        <Card title="" cardClassName="wide" closeUrl={closeUrl}>
          <FlexBox flexDirection="column" alignItems="center" padding="1rem">
            <Heading
              fontSize="1.6rem"
              textAlign="left"
              fontWeight="800"
              padding="1rem"
            >
              {t("PaywallPopupTitle")}
            </Heading>

            <FlexBox width="40%" padding="1rem" margin="0 0 1rem 0">
              <img
                style={{ width: "100%", objectFit: "contain" }}
                src="/img/trophy_3D.png"
                alt="trophy-image"
              />
            </FlexBox>

            <Heading
              textAlign="center"
              fontSize="1.6rem"
              fontWeight="800"
              margin="0 0"
            >
              {t("PaywallPopupHeader")}
            </Heading>

            <Paragraph textAlign="center" margin="1rem 0">
              {t("PaywallPopupInfo")}
            </Paragraph>

            <Button
              width="100%"
              onClick={() => {
                walletBalance >= MINIMUN_BETAMOUNT
                  ? this.props.onClose()
                  : history.push(`/${language}/deposit/choose-amount`);
              }}
            >
              {buttonText}
            </Button>

            <Paragraph textAlign="center" margin="1rem 0">
              {`${t("PaywallPopupResetTimerText")} ${this.state.remaningTime}`}
            </Paragraph>
          </FlexBox>
        </Card>
      </Modal>
    );
  }
}

export default withTranslation()(PaywallPopup);
