import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import * as SNACKBAR_CONSTANTS from "~containers/snackbar/constants";

// TODO: refactor this hoc to adapt with dynamic form
function withSubmit(ComposedComponent) {
  class Submit extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handlers = {
        submit: this.submit
      };
    }

    submit(e) {
      let data = null;

      if (e.toJS) {
        data = e.toJS();
      } else {
        data = e;
      }

      let {
        history,
        onSetValidationMessages,
        onResetValidationMessages
      } = this.props;

      let {
        queryStringParam,
        returnUrl,
        action,
        validator,
        submitHandler,
        submitSuccessCallback,
        submitFailureCallback
      } = this.state;

      if (!validator) {
        validator = () => {
          return Promise.resolve();
        };
      }

      if (!onResetValidationMessages) {
        onResetValidationMessages = () => {};
      }

      return validator(data)
        .then(errors => {
          if (!errors) {
            onResetValidationMessages();
            return submitHandler(data)
              .then(() => {
                if (submitSuccessCallback) {
                  submitSuccessCallback();
                } else {
                  history.push(
                    `${returnUrl}?${SNACKBAR_CONSTANTS.SUCCESS_QUERY_STRING_PARAM}=true&${SNACKBAR_CONSTANTS.PREVACTION_QUERY_STRING_PARAM}=${action}&${SNACKBAR_CONSTANTS.OBJECT_QUERY_STRING_PARAM}=${queryStringParam}`
                  );
                }
              })
              .catch(err => {
                if (submitFailureCallback) {
                  submitFailureCallback(err);
                } else {
                  history.push(
                    `${returnUrl}?${SNACKBAR_CONSTANTS.SUCCESS_QUERY_STRING_PARAM}=false&${SNACKBAR_CONSTANTS.PREVACTION_QUERY_STRING_PARAM}=${action}&${SNACKBAR_CONSTANTS.OBJECT_QUERY_STRING_PARAM}=${queryStringParam}`
                  );
                }
              });
          } else {
            return onSetValidationMessages({ messages: errors });
          }
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }

    render() {
      return <ComposedComponent {...this.props} {...this.handlers} />;
    }
  }

  hoistNonReactStatic(Submit, ComposedComponent);

  return Submit;
}

export default withSubmit;
