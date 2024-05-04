import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "setScoreAdvantage";
export const MATCH_LOBBY_LOADING = `${REDUCER_NAME}/MATCH_LOBBY_LOADING`;
export const MATCH_LOBBY_ERROR = `${REDUCER_NAME}/MATCH_LOBBY_ERROR`;
export const CHALLENGER_DETAILS = `${REDUCER_NAME}/CHALLENGER_DETAILS`;
export const CHALLENGEE_DETAILS = `${REDUCER_NAME}/CHALLENGEE_DETAILS`;
export const CHALLENGER_TEAM = `${REDUCER_NAME}/CHALLENGER_TEAM`;
export const DEFENDER_TEAM = `${REDUCER_NAME}/DEFENDER_TEAM`;
export const RECOMMENDED_SCORE_ADVANTAGE = `${REDUCER_NAME}/RECOMMENDED_SCORE_ADVANTAGE`;
export const SCORE_ADVANTAGE = `${REDUCER_NAME}/SCORE_ADVANTAGE`;
export const MATCH_PLATFORM = `${REDUCER_NAME}/MATCH_PLATFORM`;
import SelectScore from "../../components/custom/formLabel/selectScore";
import RecommendedScoreAdvantage from "../../components/custom/formLabel/recommendedScoreAdvantage/recommendedScoreAdvantage";

export const getFormFields = ({
  challengee,
  challenger,
  recommendedScoreAdvantage,
  matchPlatform,
  onChallengerScoreChange,
  onChallengeeScoreChange
}) => [
  {
    id: 1,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: SelectScore,
    challengee,
    challenger,
    matchPlatform,
    onChallengerScoreChange,
    onChallengeeScoreChange,
    className: "single"
  },
  {
    id: 2,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: RecommendedScoreAdvantage,
    className: "single",
    recommendedScoreAdvantage
  }
];
