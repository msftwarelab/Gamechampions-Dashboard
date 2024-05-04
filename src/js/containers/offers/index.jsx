import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import { REDUCER_NAME } from "./constants";
import { fetchOffers, getOffers } from "./actions";
import { selectOffers, selectIsLoading } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { selectProfile } from "~containers/myaccount/reducer";
import { Paragraph, FlexBox, Image, Loader } from "~components/atoms";
import { withTheme } from "~theme";
import { getReturnUrl } from "../../util/util";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import { Button } from "~components/atoms";

class Offers extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectedLanguage, onLoadOffers } = this.props;
    onLoadOffers({ selectedLanguage });
  }

  render() {
    const { history, theme, offers, isLoading, t } = this.props;

    const returnUrl = getReturnUrl(this.props);

    return (
      <Modal onClick={() => history.push(returnUrl)} modalClassName="offers">
        <Card closeUrl={returnUrl} className="offers">
          {isLoading ? (
            <Loader isLoading={isLoading} margin="5rem auto" scale="6rem" />
          ) : (
            <FlexBox
              width="100%"
              padding={{ base: "2.5rem 0", md: "1.5rem 4rem" }}
              flexDirection="column"
              gap="1rem"
            >
              {offers &&
                offers.map(offer => (
                  <>
                    <Paragraph fontSize="1.5rem" fontWeight="700">
                      {offer?.get("title")}
                    </Paragraph>
                    <FlexBox
                      flexDirection="column"
                      backgroundColor={theme.colors.white}
                      hoverBackgroundColor={theme.colors.white}
                      borderRadius="1.5rem"
                      gap="1rem"
                      key={offer?.get("id")}
                    >
                      <Image
                        src={offer?.get("thumbnail")?.get("imageUrl")}
                        className="offers-thumbnail"
                      />
                      <Paragraph
                        fontWeight="fontWeightNormal"
                        fontSize="fontSizeNormal"
                        margin="0 1rem"
                        dangerouslySetInnerHTML={{
                          __html: offer?.get("htmlContent")
                        }}
                      />
                      <a
                        href={offer?.get("link")?.get("url")}
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{
                          display: "inline-block",
                          backgroundColor: "rgb(0, 168, 38)",
                          color: "rgb(255, 255, 255)",
                          padding: "1.33em 1.66em",
                          margin: "0px 1rem 1rem",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          border: "0px",
                          borderRadius: "0.8rem",
                          cursor: "pointer",
                          lineHeight: 1.5,
                          textAlign: "center"
                        }}
                      >
                        {offer?.get("buttonText")}
                      </a>
                    </FlexBox>
                  </>
                ))}
            </FlexBox>
          )}
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { selectedLanguage }) {
    return store.dispatch(fetchOffers({ selectedLanguage }));
  }
}

const mapStateToProps = state => ({
  offers: selectOffers(state),
  isLoading: selectIsLoading(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadOffers: data => dispatch(getOffers(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(withTheme(Offers)), Offers)),
  getPage,
  REDUCER_NAME
);
