import { Grid, Button } from "@mui/material";
import "../styles/dashboard.css"
import { useNavigate } from "react-router-dom";

const borderStyle = {
    border: "1px solid #000"
}

export default function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  }

  return (
    <>
      <Grid container>
        <Grid item sm={12} style={borderStyle} className="topBar">
            Top bar
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
        </Grid>
        <Grid container sm={12} className="main">
            <Grid item sm={2} style={borderStyle}>
                Side nav
            </Grid>
            <Grid item sm={10} style={borderStyle}>
                This is the main content
            </Grid>
        </Grid>
      </Grid>
    </>
  );
}
