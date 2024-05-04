import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, FORM_FIELDS, BONUS_CAMPAIGN_TYPE } from "./constants";
import { selectSelectedBonus } from "./reducer";
import { fetchBonus, getBonusById, submitUpdateBonus } from "./actions";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import BonusCampaignsDetailsForm from "~components/custom/bonusCampaigns/bonusDetailsForm";

class PlayerWithdraw extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPublic: null,
      isDirectBonus: null
    };
  }

  componentDidMount() {
    const { onGetBonusById, match, selectSelectedBonus } = this.props;
    const { params = {} } = match;
    const { bonusId } = params;

    if (selectSelectedBonus && !selectSelectedBonus.size) {
      onGetBonusById({ id: bonusId });
    }
  }
  render() {
    const {
      page,
      selectedBonus,
      selectedLanguage,
      history,
      onUpdateBonus,
      match
    } = this.props;

    const { params = {} } = match;
    const { bonusId } = params;
    const { isPublic, isDirectBonus } = this.state;
    const selectedBonusJS = selectedBonus && selectedBonus.toJS();

    return (
      <Modal
        onClick={() => history.push(`/${selectedLanguage}/bonus-campaigns`)}
      >
        <Card
          closeUrl={`/${selectedLanguage}/bonus-campaigns`}
          title={page.get("title")}
          className="player-details-form"
        >
          <BonusCampaignsDetailsForm
            key={
              this.state.isDirectBonus ||
              selectedBonusJS.type === BONUS_CAMPAIGN_TYPE.DEPOSIT
                ? "isDirect"
                : "isDeposit"
            }
            bonusId={bonusId}
            bonusType={
              isDirectBonus !== null
                ? isDirectBonus
                  ? BONUS_CAMPAIGN_TYPE.DIRECT
                  : BONUS_CAMPAIGN_TYPE.DEPOSIT
                : selectedBonusJS.type
            }
            initialValues={
              {
                ...selectedBonusJS,
                isDirectBonus:
                  selectedBonusJS.type === BONUS_CAMPAIGN_TYPE.DIRECT ||
                  this.state.isDirectBonus
              } || {}
            }
            formFields={FORM_FIELDS({
              OnChange: (v, c) => this.setState({ isPublic: c }),
              OnDirectBonusChange: (v, c) =>
                this.setState({ isDirectBonus: c }),
              isPublic: isPublic !== null ? isPublic : selectedBonusJS.isPublic,
              isDirectBonus:
                isDirectBonus !== null
                  ? isDirectBonus
                  : selectedBonusJS.type === BONUS_CAMPAIGN_TYPE.DIRECT
            })}
            returnUrl={`/${selectedLanguage}/bonus-campaigns`}
            onUpdateBonus={onUpdateBonus}
            history={history}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    const { bonusId } = params;
    return store.dispatch(
      fetchBonus({
        pageData: {
          url,
          language
        },
        requestData: {
          id: bonusId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedBonus: selectSelectedBonus(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onUpdateBonus: data => dispatch(submitUpdateBonus(data)),
  onGetBonusById: data => dispatch(getBonusById(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(PlayerWithdraw),
    getPage,
    REDUCER_NAME
  )
);
