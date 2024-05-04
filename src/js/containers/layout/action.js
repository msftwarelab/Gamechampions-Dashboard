import { pushNewNotification } from "~containers/notifications/actions";
import {
  setBonusMoney,
  setAvailableAmount,
  setDepositCount
} from "~containers/wallet/actions";
import Api from "../../../../service/main";

export const getPoll = () => dispatch => {
  return Api.self
    .getPoll()
    .then(({ balance, notification }) => {
      dispatch(setBonusMoney(balance.bonusMoney));
      dispatch(setAvailableAmount(balance.availableAmount));
      dispatch(setDepositCount(balance.depositCount));
      dispatch(pushNewNotification(notification));
    })
    .catch(error => {
      console.error(error);
    });
};
