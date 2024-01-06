import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" justifyContent="space-between" p={1}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <IconButton type="button" sx={{ p: 1 }}></IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
