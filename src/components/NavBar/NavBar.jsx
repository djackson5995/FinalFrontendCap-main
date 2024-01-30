import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
const NavBar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Stack direction="row" alignItems="center" gap="20px">
      <Link to="/">
        <FontAwesomeIcon
          icon={faDumbbell}
          style={{ width: "48px", height: "48px" }}
        />
      </Link>

      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{
          gap: { sm: "123px", xs: "40px" },
          mt: { sm: "32px", xs: "20px" },
          justifyContent: "none",
        }}
        px="20px"
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>

        <Link
          to="/exercises"
          style={{ textDecoration: "none", color: "#3A1212" }}
        >
          Exercises
        </Link>

        <Link
          to="/calendar"
          style={{ textDecoration: "none", color: "#3A1212" }}
        >
          Calendar
        </Link>

        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </Stack>
    </Stack>
  );
};

export default NavBar;
