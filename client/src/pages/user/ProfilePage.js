import React from "react";
import Layout from "../../components/Layout/Layout";
import Avatar from "@mui/material/Avatar";
import { TableCell, TableRow } from "@mui/material";
import { useAuth } from "../../context/auth";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileUpdate from "../../components/Profile/ProfileUpdate";
import { style } from '../../../node_modules/@mui/system/esm/Stack/createStack';
import Profile from "./Profile";
import OrdersList from "../../components/Profile/OrdersList";

export default function ProfilePage() {
    const [auth, setAuth] = useAuth();
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Layout title={"profile"}>
      <div style={{ marginTop: "10vh" }}>
        <div style={{ display: "flex", margin: "1.5rem" }}>
          <div
            className="left"
            style={{
              flex: 1,
              border: "1px solid #A5A9B1",
              borderRadius: "10px",
              padding: "2rem",
              paddingTop: "0rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "black",
                minWidth: "115%",
                borderRadius: "10px",
                color: "white",
                textAlign: "center",
                padding: "1rem",
                fontSize: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              Profile
            </div>
            <Avatar sx={{ bgcolor: "gray", width: "20vh", height: "20vh" }} />
            <div style={{ marginTop: "2rem" }}>
              <TableRow>
                <TableCell>
                  <h5>Name</h5>
                </TableCell>
                <TableCell>
                  <h6>{auth.user.name}</h6>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h5>Email</h5>
                </TableCell>
                <TableCell>
                  <h6>{auth.user.email}</h6>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h5>Phone</h5>
                </TableCell>
                <TableCell>
                  <h6>{auth.user.phone}</h6>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h5>Address</h5>
                </TableCell>
                <TableCell>
                  <h6>{auth.user.address}</h6>
                </TableCell>
              </TableRow>
            </div>
          </div>
          <div style={{ width: "1rem" }}></div>
          <div className="right" style={{ flex: 2, border: "1px solid" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Update Profile" value="1" />
                  <Tab label="Orders" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <Profile />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <OrdersList />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </Layout>
  );
}
