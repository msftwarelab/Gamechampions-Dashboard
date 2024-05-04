import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { styled } from "~theme";

class UpdateAffiliateUrlForm extends React.PureComponent {
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
      onUpdateAffiliateUrl,
      history,
      affiliateId,
      match
    } = this.props;

    return (
      <UpdateAffiliateUrlFormStyle>
        <DynamicForm
          loading={this.state.submitting}
          formFields={formFields}
          returnUrl={returnUrl}
          initialValues={initialValues}
          onSubmit={e => {
            this.setState({ submitting: true });
            let data = { ...e };
            data.affiliateId = affiliateId;
            data.id = match.params.urlId;
            return onUpdateAffiliateUrl(data)
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
      </UpdateAffiliateUrlFormStyle>
    );
  }
}
export default UpdateAffiliateUrlForm;

const UpdateAffiliateUrlFormStyle = styled.div`
  display: block;
  margin-top: 1.25rem;
`;
