import React from "react";
import { Box, IconButton } from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Topbar = () => {
  const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement
    ) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={1}
      sx={{
        background: "linear-gradient(to right, #4d0054, #fde1ff)",
      }}
    >
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <IconButton type="button" sx={{ p: 1 }}></IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleFullScreen}>
          <FullscreenIcon />
        </IconButton>
        <IconButton>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
