import { Container } from "../../../../components";
import Analytics from "../Analytics/Analytics";
import AddBlog from "../Blog/AddBlog/AddBlog";
import ListBlogs from "../Blog/ListBlogs/ListBlogs";
import ListOrder from "../Order/ListOrder/ListOrder";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import DetailProduct from "../Product/DetailProduct/DetailProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import RequestProduct from "../Product/RequestProduct/RequestProduct";
import ListSeller from "../Seller/ListSeller/ListSeller";
import RequestSeller from "../Seller/RequestSeller/RequestSeller";
import DetailUser from "../User/DetailUser/DetailUser";
import EditUser from "../User/EditUser/EditUser";
import ListUser from "../User/ListUser/ListUser";
import style from "./MainContent.module.css";

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
        case "Edit":
          content = <EditProduct />;
          break;
        case "List":
          content = <ListProduct />;
          break;
        case "Requests":
          content = <RequestProduct />;
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
    case "User":
      switch (currentAction) {
        case "List":
          content = <ListUser />;
          break;
        case "Details":
          content = <DetailUser />;
          break;
        case "Edit":
          content = <EditUser />;
          break;
      }
      break;
    case "Seller":
      switch (currentAction) {
        case "List":
          content = <ListSeller />;
          break;
        case "Requests":
          content = <RequestSeller />;
          break;
      }
      break;
    case "Blog":
      switch (currentAction) {
        case "Create":
          content = <AddBlog />;
          break;
        case "List":
          content = <ListBlogs />;
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
