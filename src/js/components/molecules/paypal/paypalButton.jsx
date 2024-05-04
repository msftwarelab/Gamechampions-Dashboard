import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { FlexBox } from "~components/atoms";

class PaypalButton extends React.PureComponent {
  render() {
    const { createPaypalOrder, onPaypalApprove, setError } = this.props;
    return (
      <FlexBox
        height="40px"
        width={{ base: "80%", md: "50%" }}
        flexDirection="column"
        alignSelf="center"
      >
        <PayPalScriptProvider
          options={{
            "client-id": process.env.PAYPAL_CLIENT_ID,
            currency: "EUR",
            intent: "capture"
          }}
        >
          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "blue",
              shape: "pill",
              label: "pay",
              height: 40
            }}
            createOrder={(data, actions) => createPaypalOrder(data, actions)}
            onApprove={data => onPaypalApprove(data)}
            onCancel={data => setError(data)}
            onError={data => setError(data)}
          />
        </PayPalScriptProvider>
      </FlexBox>
    );
  }
}

export default PaypalButton;
