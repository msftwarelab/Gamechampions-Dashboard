import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withAuth, withPage } from "~hocs";
import {
  fetchDuplicatePlayerIpsDetail,
  getDuplicatePlayerIpsDetail
} from "./actions";
import {
  REDUCER_NAME,
  PAGE_SIZE_VALUE,
  IPADDRESS_QUERY_STRING_PARAM,
  FROM_QUERY_STRING_PARAM,
  TO_QUERY_STRING_PARAM
} from "./constants";
import {
  selectDuplicateIpPlayersDetail,
  selectIsLoading,
  selectDetailPagination
} from "./reducer";
import DuplicateIpsDetailTable from "~components/custom/duplicateips/duplicateIpsDetailTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class DuplicateIpsReportDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      type: null
    };
  }

  componentDidMount() {
    const { loadDuplicateIpsDetail } = this.props;

    loadDuplicateIpsDetail({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE,
      ipAddress: getParameterByName(
        IPADDRESS_QUERY_STRING_PARAM,
        location.search
      ),
      from: getParameterByName(FROM_QUERY_STRING_PARAM, location.search),
      to: getParameterByName(TO_QUERY_STRING_PARAM, location.search)
    });
  }

  render() {
    const {
      duplicateIpsDetail,
      selectedLanguage,
      isLoading,
      detailPagination,
      loadDuplicateIpsDetail,
      isMobile,
      history,
      page
    } = this.props;

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/ip-report`)}>
        <Card
          htmlProps={{
            margin: "1rem 0"
          }}
          padding="1rem 0.5rem"
          title={page.get("title")}
          closeUrl={`/${selectedLanguage}/ips-report`}
          className="player-matches-table-card"
        >
          <DuplicateIpsDetailTable
            isLoading={isLoading}
            duplicateIpDetail={duplicateIpsDetail}
            pagination={detailPagination}
            isMobile={isMobile}
            selectedLanguage={selectedLanguage}
            onChangePageClick={e =>
              onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
                loadDuplicateIpsDetail({
                  ...data,
                  ipAddress: getParameterByName(
                    IPADDRESS_QUERY_STRING_PARAM,
                    location.search
                  ),
                  from: getParameterByName(
                    FROM_QUERY_STRING_PARAM,
                    location.search
                  ),
                  to: getParameterByName(TO_QUERY_STRING_PARAM, location.search)
                });
              })
            }
            history={history}
            params={[
              IPADDRESS_QUERY_STRING_PARAM,
              FROM_QUERY_STRING_PARAM,
              TO_QUERY_STRING_PARAM
            ]}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, query }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize = query[PAGE_SIZE_QUERY_PARAM_NAME] || PAGE_SIZE_VALUE;
    const ipAddress = query[IPADDRESS_QUERY_STRING_PARAM] || "::1";

    const end = moment();
    const start = moment().subtract(30, "days");

    const endFormatted = end.format("YYYY-MM-DD");
    const startFormatted = start.format("YYYY-MM-DD");

    const from = query[FROM_QUERY_STRING_PARAM] || startFormatted;
    const to = query[TO_QUERY_STRING_PARAM] || endFormatted;

    return store.dispatch(
      fetchDuplicatePlayerIpsDetail({
        pageData: {
          url,
          language
        },
        requestData: {
          page,
          pageSize,
          ipAddress,
          from,
          to
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  duplicateIpsDetail: selectDuplicateIpPlayersDetail(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  detailPagination: selectDetailPagination(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  loadDuplicateIpsDetail: data => dispatch(getDuplicatePlayerIpsDetail(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(DuplicateIpsReportDetail),
    getPage,
    REDUCER_NAME
  )
);
