import logo from "../assets/logo.svg";

export const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#fff",
        padding: "5px 5px 5px 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img src={logo} alt="logo" style={{ width: 200 }} />
    </div>
  );
};
