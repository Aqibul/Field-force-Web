import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, // Import the SubMenu component
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import BoyOutlinedIcon from "@mui/icons-material/BoyOutlined";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SubMenuItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        marginLeft: "20px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        overflowY: "auto",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "100%",
          overflowY: "auto",
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu
          iconShape="square"
          style={{
            background: "linear-gradient(to right, #2d0031, #4d0054)",
            height: "100%",
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[500],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: "white" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Profile"
              to="/profile"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="PJP"
              to="/viewpjp"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dealer"
              to="/dealer"
              icon={<AccessibilityNewOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sub Dealer"
              to="/subdealer"
              icon={<BoyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="Clients" icon={<PeopleOutlinedIcon />}>
              <SubMenuItem
                title="Architect"
                to="/architect"
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenuItem
                title="Builder"
                to="/builder"
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenuItem
                title="Contractor"
                to="/contractor"
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenuItem
                title="Competitor"
                to="/competitor"
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenuItem
                title="Other"
                to="/others"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Visits"
              to="/visits"
              icon={<TransferWithinAStationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
