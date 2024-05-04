import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";

class PlayerDetailsForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
  }

  render() {
    const {
      formFields,
      returnUrl,
      initialValues,
      onUpdatePlayer,
      history
    } = this.props;

    return (
      <DynamicForm
        loading={this.state.submitting}
        formFields={formFields}
        returnUrl={returnUrl}
        initialValues={initialValues}
        onSubmit={e => {
          this.setState({ submitting: true });

          const data = { ...e };
          const documents = JSON.parse(data.documents);
          data.documents = documents;
          return onUpdatePlayer(data)
            .then(() => {
              history.push(
                returnUrl + "?success=true&action=edit&object=profile"
              );
            })
            .catch(() =>
              history.push(
                returnUrl + "?success=false&action=edit&object=profile"
              )
            );
        }}
      />
    );
  }
}
export default PlayerDetailsForm;
