import { getKey, makePayment, verifyPayment } from "../../api/payment.api";
import { baseURL } from "../../api/auth.api";
import { useSelector } from "react-redux";
import { useState } from "react";

const PaymentButton = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  const amount = props.amount * 100;
  console.log(amount);
  const checkOutHandler = async () => {
    const key = await getKey();
    const order = await makePayment({ amount, userID });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Ankit Gupta",
      description: "Razorpay tutorial",
      image: "",
      order_id: order.id,
      prefill: {
        name: "Ankit Gupta",
        email: "guptankit0522@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "abcdefghijkl",
      },
      theme: {
        color: "#000000",
      },
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        const payload = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          userID,
          orderDetails: order,
          // address: "abcdefghijkl",
        };
        const data = await verifyPayment(payload);
        alert(data.message);
      },
    };
    const razorPay = new Razorpay(options);
    razorPay.open();
  };

  return (
    <button
      style={{
        backgroundColor: "black",
        width: "180px",
        height: "40px",
        color: "white",
      }}
      onClick={checkOutHandler}
    >
      Buy Now
    </button>
  );
};

export default PaymentButton;
