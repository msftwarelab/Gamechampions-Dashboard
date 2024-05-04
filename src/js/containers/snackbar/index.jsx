import React from "react";
import { withRouter } from "react-router-dom";
import { getParameterByName } from "../../util/util.js";
import * as CONSTANTS from "./constants";

const TTL = 6000;

class Messages extends React.PureComponent {
  componentDidMount() {
    toggleSnackbar(this.element);
  }

  componentDidUpdate() {
    toggleSnackbar(this.element);
  }

  render() {
    const { history } = this.props;
    // retrieve status from the URL query string
    let isSuccess = "";
    let prevAction = "";
    let object = "";

    if (history.location.search) {
      isSuccess = getParameterByName(
        CONSTANTS.SUCCESS_QUERY_STRING_PARAM,
        history.location.search
      );
      prevAction = getParameterByName(
        CONSTANTS.PREVACTION_QUERY_STRING_PARAM,
        history.location.search
      );
      object = getParameterByName(
        CONSTANTS.OBJECT_QUERY_STRING_PARAM,
        history.location.search
      );
    }

    object = object || "Object";
    let message = "";
    if (isSuccess === "true") {
      switch (prevAction) {
        case "edit":
          message = `${object} was updated successfully.`;
          break;
        case "save":
          message = `${object} was saved successfully.`;
          break;
        case "send":
          message = `${object} was sent successfully.`;
          break;
        case "delete":
          message = `${object} was removed from the database.`;
          break;
        case "create":
          message = `${object} was created successfully.`;
          break;
        case "view":
          message = `${object} was updated successfully.`;
          break;
        case "assign":
          message = `${object} was assigned successfully.`;
          break;
        default:
          break;
      }
    }

    message = message || "The application encountered an error.";
    return null;
  }
}

const toggleSnackbar = element => {
  if (element) {
    element.classList.remove("dismissed");
    setTimeout(() => {
      element.classList.add("dismissed");
    }, TTL);
  }
};

export default withRouter(Messages);
