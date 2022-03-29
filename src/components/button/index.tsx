import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id":
    "AbWOHxm69p7xUTrYIiMa6Umjsq7OuE9K9L1g0LEWjiofakXMhVjEnWb0NV_A7FmAltpjNf_MArxivq2J",
  currency: "BRL",
};
function Button() {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: {
      shape: "rect",
      color: "blue",
      layout: "horizontal",
      label: "pay",
    },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "1.00",
            },
            reference_id: "REFID-000-1001",
          },
        ],
      });
    },
    async onApprove(data, actions) {
      /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
      const result = await actions.order?.capture();
      if (result) {
        console.log(result);
      }
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}
export function ButtonPaypal() {
  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <Button />
    </PayPalScriptProvider>
  );
}
