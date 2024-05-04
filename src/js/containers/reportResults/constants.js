import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import SelectScore from "../../components/custom/formLabel/selectScore";
export const REDUCER_NAME = "reportResults";
export const REPORT_RESULT_ERROR = `${REDUCER_NAME}/REPORT_RESULT_ERROR`;

export const getFormFields = ({
  challengee,
  challenger,
  matchPlatform,
  recommendedScoreAdvantage,
  onChallengerScoreChange,
  onChallengeeScoreChange,
  matchData,
  isAdmin
}) => [
  {
    id: 1,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: SelectScore,
    challengee,
    challenger,
    matchPlatform,
    isAdmin,
    matchData,
    recommendedScoreAdvantage,
    onChallengerScoreChange,
    onChallengeeScoreChange,
    className: "single"
  },
  {
    id: 2,
    name: "acceptedReport",
    componentType: FIELD_TYPES.CHECK_BOX,
    fieldProps: {
      label: "MatchLobbyReportResultAccept",
      autoComplete: "accept-report",
      className: "single report__result__accepted",
      material: true
    },
    validation: {
      required: "TermsAndConditionsMustBeAccepted"
    }
  }
];
