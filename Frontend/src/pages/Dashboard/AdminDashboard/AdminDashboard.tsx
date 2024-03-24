import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";
import style from "./AdminDashboard.module.css";
import { Breadcrumb, Container } from "../../../components";
import Sidebar from "./Sidebar/Sidebar";
import { RootState } from "../../../redux/store/store";

const AdminDashboard = () => {
  const { currentSection, currentAction } = useSelector(
    (state: RootState) => state.adminDashboard
  );
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <div className={style.right}>
      <div className={style.Heading}>Admin Dashboard</div>
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

export default AdminDashboard;
