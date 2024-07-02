import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Navbar = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Space Explorer
      </Typography>
      <Button color="inherit" component={Link} href="/">
        Home
      </Button>
      <Button color="inherit" component={Link} href="/apod">
        APOD
      </Button>
      <Button color="inherit" component={Link} href="/mars-photos">
        Mars Photos
      </Button>
      <Button color="inherit" component={Link} href="/earth-images">
        Earth Images
      </Button>
      <Button color="inherit" component={Link} href="/neo-alerts">
        NEO Alerts
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
