import React from "react";
import { connect } from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { FlexBox } from "~components/atoms";
import Card from "~components/card/card";
import { getPage } from "~containers/page/actions";
import { withPage } from "~hocs";
import { REDUCER_NAME } from "./constants";
import { fetchSupport } from "./action";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import WidgetBot from "@widgetbot/react-embed";
import {
  DISCORD_CHANNEL,
  DISCORD_SERVER_ID
} from "~containers/globalChat/constants";

class Support extends React.PureComponent {
  componentDidMount() {
    this.getChannelIdByLanguage = this.getChannelIdByLanguage.bind(this);
  }

  getChannelIdByLanguage() {
    const { selectedLanguage } = this.props;

    switch (selectedLanguage) {
      case "en":
        return DISCORD_CHANNEL.EN;
      case "es":
        return DISCORD_CHANNEL.ES;
      case "de":
        return DISCORD_CHANNEL.DE;
      case "fr":
        return DISCORD_CHANNEL.FR;
      case "pt":
        return DISCORD_CHANNEL.PT;
      case "it":
        return DISCORD_CHANNEL.IT;
    }
  }

  render() {
    return (
      <Card cardClassName="fullscreen" padding="0">
        <FlexBox
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height={"100%"}
        >
          <WidgetBot
            width="100%"
            height="100%"
            style={{
              borderRadius: 0
            }}
            server={DISCORD_SERVER_ID}
            channel={this.getChannelIdByLanguage()}
          />
        </FlexBox>
      </Card>
    );
  }
  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchSupport({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

export default withPage(
  connect(mapStateToProps)(hoistStatics(withTranslation()(Support), Support)),
  getPage,
  REDUCER_NAME
);
