import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { styled } from "~theme";

class UpdateAffiliateForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
  }
  render() {
    const { formFields, returnUrl, initialValues, onSubmit } = this.props;

    return (
      <UpdateAffiliatesFormStyle>
        <DynamicForm
          loading={this.state.submitting}
          formFields={formFields}
          returnUrl={returnUrl}
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </UpdateAffiliatesFormStyle>
    );
  }
}
export default UpdateAffiliateForm;

const UpdateAffiliatesFormStyle = styled.div`
  display: block;
  margin-top: 1.25rem;
`;
