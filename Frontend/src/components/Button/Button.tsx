import style from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  bgColor = "#000000",
  textColor = "#ffffff",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
