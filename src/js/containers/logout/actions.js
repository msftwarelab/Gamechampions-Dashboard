import Api from "~service/main";
import { resetAuthentication } from "~containers/app/actions";

export const logout = () => dispatch => {
  Api.session.delete();

  Api.setToken(null);
  Api.setRefreshToken(null);

  // store authentication in app reducer
  dispatch(resetAuthentication());
};
