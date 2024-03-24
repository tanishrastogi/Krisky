import style from "./SellerDashboard.module.css";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { Breadcrumb, Container } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

const SellerDashboard = () => {
  const { currentSection, currentAction } = useSelector(
    (state: RootState) => state.sellerDashboard
  );
  return (
    <Container
      sx={{
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <Sidebar />
      <div className={style.right}>
        <div className={style.Heading}>Vendor Dashboard</div>
        <Breadcrumb
          currentSection={currentSection}
          currentAction={currentAction}
        />
        <MainContent
          currentSection={currentSection}
          currentAction={currentAction}
        />
      </div>
    </Container>
  );
};

export default SellerDashboard;
