import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import { createAffiliate, fetchCreateAffiliate, resetError } from "../actions";
import {
  REDUCER_NAME,
  AFFILIATE_FORM_FIELDS,
  PAGE_SIZE_VALUE
} from "../constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../../app/reducer";

import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { selectIsLoading, selectError } from "../reducer";
import { ErrorInfo } from "~components/custom/errorInfo";
import { getParameterByName } from "../../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";

class CreateAffiliate extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    const { onResetError } = this.props;
    onResetError();
  }

  render() {
    const {
      selectedLanguage,
      history,
      page,
      onCreateAffiliate,
      error,
      t
    } = this.props;
    let returnUrl = `/${selectedLanguage}/affiliates`;

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          padding="1rem 0.5rem"
          title={page.get("title")}
          closeUrl={returnUrl}
          className="player-matches-table-card"
        >
          <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
            <DynamicForm
              formFields={AFFILIATE_FORM_FIELDS}
              onSubmit={e => {
                this.setState({ submitting: true });
                const data = { ...e };
                data.page =
                  getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) ||
                  1;
                data.pageSize =
                  getParameterByName(
                    PAGE_SIZE_QUERY_PARAM_NAME,
                    location.search
                  ) || PAGE_SIZE_VALUE;

                return onCreateAffiliate(data).then(() => {
                  history.push(
                    returnUrl + "?success=true&action=edit&object=profile"
                  );
                });
              }}
              displayButtons={true}
              returnUrl={returnUrl}
              extraContents={error && <ErrorInfo>{t(error)}</ErrorInfo>}
            />
          </FlexBox>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchCreateAffiliate({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  onCreateAffiliate: data => dispatch(createAffiliate(data)),
  onResetError: () => dispatch(resetError())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(CreateAffiliate), CreateAffiliate)),
    getPage,
    REDUCER_NAME
  )
);
