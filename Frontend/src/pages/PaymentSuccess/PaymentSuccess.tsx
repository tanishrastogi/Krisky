import { useLocation } from "react-router-dom";
import style from "./PaymentSuccess.module.css";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("reference");
  return (
    <div className={style.container}>
      <h1>Payment Successfully Completed!</h1>
      <h2>Reference Id : {id}</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default PaymentSuccess;
