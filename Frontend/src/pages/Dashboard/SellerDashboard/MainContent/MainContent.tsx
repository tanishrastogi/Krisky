import style from "./MainContent.module.css";
import ListOrder from "../Order/ListOrder/ListOrder";
import Analytics from "../Analytics/Analytics";
import { Container } from "../../../../components";
import OfferProduct from "../Product/OfferProduct/OfferProduct";
import RequestProduct from "../Product/RequestProduct/RequestProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import DetailProduct from "../../AdminDashboard/Product/DetailProduct/DetailProduct";
import ListProduct from "../../SellerDashboard/Product/ListProduct/ListProduct";
import CreateProduct from "../../SellerDashboard/Product/CreateProduct/CreateProduct";

const MainContent = ({ currentSection, currentAction }) => {
  let content = null;
  switch (currentSection) {
    case "Product":
      switch (currentAction) {
        case "Create":
          content = <CreateProduct />;
          break;
        case "Details":
          content = <DetailProduct />;
          break;
        case "List":
          content = <ListProduct />;
          break;
        case "Offers":
          content = <OfferProduct />;
          break;
        case "Requests":
          content = <RequestProduct />;
          break;
        case "Edit":
          content = <EditProduct />;
          break;
      }
      break;
    case "Order":
      switch (currentAction) {
        case "List":
          content = <ListOrder />;
          break;
      }
      break;
    default:
      content = <Analytics />;
      break;
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className={style.content}>{content}</div>
    </Container>
  );
};

export default MainContent;
