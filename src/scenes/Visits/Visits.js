import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MapIcon from "@mui/icons-material/Map";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputBase from "@mui/material/InputBase";
import L from "leaflet";
import redPinIcon from "../../Assets/images/pin.png";
import Topbar from "../global/Topbar";
import { fetchViewPjp } from "../../Redux/Slice/Pjp/ViewPjpSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Visits() {
  const dispatch = useDispatch();
  const AllVisits = useSelector((state) => state.ViewPjp.ViewPjpData);
  const AllVisitsUser = AllVisits?.data?.user_info || {};
  const filteredData = Object.values(AllVisits?.data || {}).filter(
    (vData) => vData.type === "visits"
  );

  const locationOnIcon = new L.Icon({
    iconUrl: redPinIcon,
    iconSize: [25, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const loading = useSelector((state) => state.ViewAllDealer.isLoader);
  const error = useSelector((state) => state.ViewAllDealer.isError);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchViewPjp());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    setPage(0);
  };
  const searchData = filteredData?.filter(
    (visitData) =>
      visitData.category.toLowerCase().includes(searchTerm) ||
      visitData.concerned_person.toLowerCase().includes(searchTerm)
  );
  const slicedData = searchData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openMapModal, setOpenMapModal] = React.useState(false);
  const [mapLocation, setMapLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const handleOpenMapModal = (AllVisitsUser) => {
    const latitude = parseFloat(AllVisitsUser?.Attitude);
    const longitude = parseFloat(AllVisitsUser?.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      toast.error("Latitude and/or Longitude not available for this Visit.");
      return;
    }

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    setMapLocation({
      latitude: latitude,
      longitude: longitude,
    });
    setOpenMapModal(true);
  };

  const handleCloseMapModal = () => {
    setOpenMapModal(false);
  };

  return (
    <>
      <Topbar />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
            background: "linear-gradient(to right, #4d0054, #91009e)",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0)",
            borderRadius: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <h4 style={{ color: "#ffffff" }}>Visits Details</h4>
          <InputBase
            sx={{ ml: 2 }}
            placeholder="Search by name or email"
            onChange={handleSearch}
            style={{
              color: "#000",
              paddingLeft: "20px",
              padding: "3px",
              paddingRight: "5px",
              borderRadius: "5px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              outline: "none",
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
          />
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : filteredData.length > 0 ? (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Sl. No.
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Category
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Name
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Remarks
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Payment
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Lat/Long
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Map
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedData.map((VisitsData, index) => {
                    const userInfo = AllVisitsUser || {};

                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{VisitsData.category}</StyledTableCell>
                        <StyledTableCell>
                          {VisitsData.concerned_person}
                        </StyledTableCell>
                        <StyledTableCell>{VisitsData.remarks}</StyledTableCell>
                        <StyledTableCell>
                          {VisitsData.payment_status}
                        </StyledTableCell>
                        <StyledTableCell>
                          {userInfo.Attitude}/{userInfo.longitude}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            color="secondary"
                            onClick={() => handleOpenMapModal(VisitsData)}
                          >
                            <MapIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, -1]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page"
            />
          </React.Fragment>
        ) : (
          <div style={{ padding: "20px" }}>No User available</div>
        )}

        <Dialog open={openMapModal} onClose={handleCloseMapModal}>
          <DialogTitle>Location on Map</DialogTitle>
          <DialogContent>
            <MapContainer
              center={[mapLocation.latitude, mapLocation.longitude]}
              zoom={13}
              style={{ height: "400px", width: "400px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[mapLocation.latitude, mapLocation.longitude]}
                icon={locationOnIcon}
              />
            </MapContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMapModal} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
