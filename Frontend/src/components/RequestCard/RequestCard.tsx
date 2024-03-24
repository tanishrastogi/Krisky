import {
  acceptProductRequest,
  acceptSellerRequest,
  declineProductRequest,
  declineSellerRequest,
} from "../../api/admin.api";
import { Container, Button } from "../index";
import style from "./RequestCard.module.css";

const RequestCard = ({ type, id, name, logo }) => {
  console.log(name);
  const handleAccept = async () => {
    if (type === "seller") {
      const response = await acceptSellerRequest({ requestID: id });
      console.log(response);
    } else {
      const response = await acceptProductRequest({ requestID: id });
      console.log(response);
    }
  };
  const handleDecline = async () => {
    if (type === "seller") {
      const response = await declineSellerRequest({ requestID: id });
      console.log(response);
    } else {
      const response = await declineProductRequest({ requestID: id });
      console.log(response);
    }
  };
  return (
    <Container sx={{ flexDirection: "row", border: "2px solid" }}>
      <img src={logo} alt="Not found" className={style.logo} />
      <h3>{name}</h3>
      <Button onClick={handleDecline}>Decline</Button>
      <Button onClick={handleAccept}>Accept</Button>
    </Container>
  );
};

export default RequestCard;
