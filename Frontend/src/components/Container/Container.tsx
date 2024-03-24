const Container = ({ sx, children }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    ...sx,
  };

  return <div style={containerStyle}>{children}</div>;
};

export default Container;
