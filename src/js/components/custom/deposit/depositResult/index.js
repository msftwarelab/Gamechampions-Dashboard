import React from "react";
import { Heading, Image, Loader, Paragraph } from "~components/atoms";
import { default as styled } from "styled-components";
import { FlexBoxStyle, SizeStyle } from "~components/styles";
import { withTranslation } from "react-i18next";
import { STORAGE_URL } from "~service/constants";

class DepositResult extends React.PureComponent {
  renderImage() {
    return (
      <Image
        width="120px"
        src={
          this.props.error
            ? `${STORAGE_URL}images/tx-fail.png`
            : `${STORAGE_URL}images/tx-success.png`
        }
        title="success"
        alt="success"
        margin="0 0 1rem 0"
      />
    );
  }

  renderHeader() {
    const { t } = this.props;
    return (
      <Heading margin="0 0 1rem 0">
        {this.props.error
          ? t("DepositResultFailHeader")
          : t("DepositResultSuccessHeader")}
      </Heading>
    );
  }

  renderContent() {
    const { error, t } = this.props;
    return (
      <Paragraph margin="0 0 1rem 0">
        {error ? t(error) : t("DepositResultSuccessContent")}
      </Paragraph>
    );
  }

  renderLoader() {
    return (
      <Loader
        isLoading={this.props.isLoading}
        margin="5rem auto"
        scale="6rem"
      />
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <DepositFormStyle flexDirection="column" alignItems="center" width="100%">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            {this.renderImage()}
            {this.renderHeader()}
            {this.renderContent()}
          </>
        )}
      </DepositFormStyle>
    );
  }
}

const DepositFormStyle = styled.div`
  display: flex;

  ${FlexBoxStyle};
  ${SizeStyle};
`;

export default withTranslation()(DepositResult);
