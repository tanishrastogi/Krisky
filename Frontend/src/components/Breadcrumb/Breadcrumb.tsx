import style from "./Breadcrumb.module.css";

const Breadcrumb = ({ currentSection, currentAction }) => {
  return (
    <>
    <div className={style.container}>
    <div className={style.currentSectionText}>Dashboard</div>
      {currentSection && (
        <div className={style.step}>
          <div className={style.circle}></div>
          <div className={style.currentSectionText}> {currentSection}</div>
        </div>
      )}
      {currentAction && (
        <div className={style.step}>
          <div className={style.circle}></div>
          <div className={style.currentSectionText}>{currentAction}</div>
        </div>
      )}
    </div>
    </>
  );
};



export default Breadcrumb;
