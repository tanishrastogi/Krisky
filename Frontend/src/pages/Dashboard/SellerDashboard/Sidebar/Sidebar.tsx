import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import style from "./Sidebar.module.css";
import {
  closeSection,
  selectSellerAction,
  toggleSection,
} from "../../../../redux/reducers/sellerDashboardSlice";
import { Container, Logo } from "../../../../components";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/Krisksy.svg";
import SpeedIcon from '@mui/icons-material/Speed';

const Sidebar = () => {
  const navigate = useNavigate();
  const { sectionsState } = useSelector(
    (state: RootState) => state.sellerDashboard
  );
  const dispatch = useDispatch();
  const sections = [
    {
      Product: {
        actions: ["List", "Create", "Offers", "Requests"],
        icon: (
          <AccountBoxRoundedIcon
            style={{
              height: "30px",
              width: "30px",
              flexShrink: "0",
              marginRight: "16px",
            }}
          />
        ),
      },
    },
    {
      Order: {
        actions: ["List"],
        icon: (
          <ShoppingCartRoundedIcon
            style={{
              height: "30px",
              width: "30px",
              flexShrink: "0",
              marginRight: "16px",
            }}
          />
        ),
      },
    },
  ];
  return (
    <>
      <div className={style.sidebarBody}>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "10px 30px",
            overflow: "auto",
            borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
            fontFamily: "sans-serif",
          }}
        >
          <div onClick={() => navigate("/")}>
            <img className={style.Logo} src={logo} alt="" />
          </div>
          <div className={style.SideBarSections}>
            <h2 className={style.SideBarSectionsHeading}>Overview</h2>
            <button
              className={style.sectionButton}
              onClick={() => dispatch(closeSection())}
            >
              <span className={style.AppIcon}><SpeedIcon/></span>
              <span className={style.AppText}> App</span>

             
             
            </button>
          </div>
          <div className={style.SideBarSections}>
            <h2 className={style.SideBarSectionsHeading}>Management</h2>
            {sections.map((section, index) => {
              const sectionName = Object.keys(section)[0];
              const actions = section[sectionName].actions;
              return (
                <div key={index} className={style.section}>
                  <div
                    onClick={() => dispatch(toggleSection(sectionName))}
                    className={style.sectionButton}
                  >
                    <div className={style.sectionName}>
                      {section[sectionName].icon}
                      <p className={style.SectionNameHeading}>{sectionName}</p>
                    </div>
                    <KeyboardArrowRightRoundedIcon
                      style={{
                        transform: sectionsState[sectionName]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  {sectionsState[sectionName] && (
                    <div className={style.actions}>
                      {actions.map((action, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              dispatch(
                                selectSellerAction({
                                  selectedSection: sectionName,
                                  selectedAction: action,
                                })
                              )
                            }
                            className={style.actionButton}
                          >
                            <p className={style.SectionNameHeading}>{action}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Sidebar;
