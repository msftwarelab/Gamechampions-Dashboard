import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const GAMES = {
  FIFA: 1,
  MADDEN: 2,
  NBA: 3,
  WARZONE: 4,
  FORTNITE: 5,
  LeagueOfLegends: 6,
  PubG: 7
};

export const getBonusFields = ({ gameUsername, selectedGame, onChange }) => [
  {
    id: 1,
    name: "gameUsername",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label:
        selectedGame === GAMES.NBA
          ? "Nba2KAccount"
          : selectedGame === GAMES.WARZONE
          ? "ActivisionId"
          : selectedGame === GAMES.FORTNITE
          ? "FortniteGamertag"
          : "EAUserNameLabel",
      autoComplete: "gameUsername",
      material: true,
      className: "single",
      value: gameUsername,
      onChange: onChange
    },
    fieldStyle: {
      width: "100%"
    }
  }
];
