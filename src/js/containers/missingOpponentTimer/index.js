import React from "react";
import { connect } from "react-redux";
import { TIME_TO_BEGIN_MATCH } from "./constants";
import { matchStartTime, reportOpponent } from "./actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectStartTime } from "./reducer";
import moment from "moment";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import { withTheme } from "~theme";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "~containers/snackbar/constants";
import { Button } from "~components/atoms";

class MissingOpponentTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      remainingTime: 0
    };

    this.sendReport = this.sendReport.bind(this);
    this.matchStartTime = this.matchStartTime.bind(this);
  }

  matchStartTime() {
    const {
      getMatchStartTime,

      matchId
    } = this.props;

    getMatchStartTime({ matchId });
  }

  sendReport() {
    const {
      reportMissingPlayer,
      selectedLanguage,
      history,
      matchId
    } = this.props;

    reportMissingPlayer({ matchId }).then(() => {
      history.push(
        `/${selectedLanguage}/match-lobby/${matchId}/report-results?${SUCCESS_QUERY_STRING_PARAM}=true&${PREVACTION_QUERY_STRING_PARAM}=view&${OBJECT_QUERY_STRING_PARAM}=report-results`
      );
    });
  }

  convertToMinutes(time, endTime) {
    const remainingTime = endTime - time;
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  componentDidMount() {
    this.matchStartTime();

    this.intervalID = setInterval(() => this.timeChangeHandler(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timeChangeHandler() {
    const selectedStartTime = this.props;
    const timeMatchStarted = selectedStartTime.selectedStartTime;
    const timeMatchStartedLocal = moment
      .utc(timeMatchStarted)
      .local()
      .valueOf();

    const timerEndPointInMS =
      timeMatchStartedLocal + 60000 * parseInt(TIME_TO_BEGIN_MATCH);

    this.setState({
      time: new Date().getTime(),
      startTime: timerEndPointInMS
    });

    const remainingTimeInMinutes = this.convertToMinutes(
      this.state.time,
      this.state.startTime
    );

    this.setState({ remainingTime: remainingTimeInMinutes });
  }

  render() {
    const remainingTime = this.state.startTime - this.state.time;
    const { t } = this.props;
    const { theme } = this.props;

    return (
      <div className={"form__buttons"}>
        <Button
          isDisabled={remainingTime <= 0 ? false : true}
          backgroundColor={theme.colors.tertiary}
          to={"#"}
          onClick={this.sendReport}
          hoverBackgroundColor={theme.colors.tertiaryLight}
          width={"100%"}
          padding={"10px 0"}
        >
          {remainingTime >= 0 ? (
            <p>
              {" "}
              {t("MissingOpponentButtonText")} {"("}
              {this.state.remainingTime}
              {")"}
            </p>
          ) : (
            <p> {t("MissingOpponentButtonText")}</p>
          )}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state),
  selectedStartTime: selectStartTime(state)
});

const mapDispatchToProps = dispatch => ({
  reportMissingPlayer: data => dispatch(reportOpponent(data)),
  getMatchStartTime: data => dispatch(matchStartTime(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  hoistStatics(
    withTranslation()(withTheme(MissingOpponentTimer)),
    MissingOpponentTimer
  )
);
