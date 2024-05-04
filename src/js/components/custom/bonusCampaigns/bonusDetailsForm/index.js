import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";

class BonusCampaignsDetailsForm extends React.PureComponent {
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
      onUpdateBonus,
      history,
      bonusId,
      key,
      bonusType
    } = this.props;
    return (
      <DynamicForm
        key={key}
        loading={this.state.submitting}
        formFields={formFields}
        returnUrl={returnUrl}
        initialValues={initialValues}
        onSubmit={e => {
          this.setState({ submitting: true });
          const data = { ...e };
          data.id = bonusId;
          data.type = bonusType;
          return onUpdateBonus(data)
            .then(() => {
              history.push(
                returnUrl + "?success=true&action=edit&object=bonus"
              );
            })
            .catch(() =>
              history.push(
                returnUrl + "?success=false&action=edit&object=bonus"
              )
            );
        }}
      />
    );
  }
}
export default BonusCampaignsDetailsForm;
