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
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
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
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { fetchViewCategory } from "../../Redux/Slice/Category/ViewCategorySlice";

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

export default function Pjp() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();
  const AllPjp = useSelector((state) => state.ViewPjp.ViewPjpData);
  const AllPjpUser = AllPjp?.data?.user_info || {};
  const filteredData = Object.values(AllPjp?.data || {}).filter(
    (vData) => vData.type !== "visits"
  );
  const CategoryData = useSelector(
    (state) => state.ViewCategory.ViewCategoryData
  );
  console.log("CategoryData", CategoryData);

  const searchData = filteredData?.filter(
    (visitData) =>
      (visitData.category?.toLowerCase() ?? "").includes(searchTerm) ||
      (visitData.concerned_person?.toLowerCase() ?? "").includes(searchTerm)
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
    dispatch(fetchViewCategory());
  }, [dispatch]);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    setPage(0);
  };

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

  const handleOpenMapModal = (AllPjpUser) => {
    const latitude = parseFloat(AllPjpUser?.Attitude);
    const longitude = parseFloat(AllPjpUser?.longitude);

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

  // add Pjp
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    geotag_address: "Enter From Phone only",
    concered_name: "",
    number: "",
    email: "",
    designation: "",
    role_id: "5",
    longitude: "00",
    Attitude: "00",
    territory: "00",
    state: "00",
    rm: "00",
    code: "00",
    brands: "00",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    // geotag_address: "",
    concered_name: "",
    number: "",
    email: "",
    designation: "",
  });
  const handleForm = () => {
    // const errors = validateForm();

    // if (Object.keys(errors).length > 0) {
    //   // Set errors and prevent form submission
    //   setFormErrors(errors);
    //   return;
    // }

    // Include default values for fields in the formData
    const formDataWithDefaults = {
      ...formData,
      role_id: "5",
      longitude: "00",
      Attitude: "00",
      territory: "00",
      state: "00",
      rm: "00",
      code: "00",
      brands: "00",
      geotag_address: "Enter From Phone only",
    };

    // Log the form data before dispatching
    console.log("Form Data:", formDataWithDefaults);

    // dispatch(addAllDealer(formDataWithDefaults))
    //   .then(() => {
    //     // Reset form data and errors after successful addition
    //     setFormData({
    //       name: "",
    //       address: "",
    //       concered_name: "",
    //       number: "",
    //       email: "",
    //       designation: "",
    //     });
    //     setFormErrors({});

    //     // Reload data after successful addition
    //     // dispatch(fetchViewAllDealer());
    //     toast.success("Pjp added successfully!");

    //     // Close the modal
    //     handleCloseModal();
    //   })
    //   .catch((error) => {
    //     console.error("Error adding Pjp:", error);
    //     toast.error("Error adding Pjp. Please try again.");
    //   });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#fff" }}
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add Pjp
          </Button>
          <h4 style={{ color: "#ffffff" }}>Pjp Details</h4>
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
                  {slicedData.map((PjpData, index) => {
                    const userInfo = AllPjpUser || {};

                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{PjpData.category}</StyledTableCell>
                        <StyledTableCell>
                          {PjpData.concerned_person}
                        </StyledTableCell>
                        <StyledTableCell>{PjpData.remarks}</StyledTableCell>
                        <StyledTableCell>
                          {PjpData.payment_status}
                        </StyledTableCell>
                        <StyledTableCell>
                          {userInfo.Attitude}/{userInfo.longitude}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            color="secondary"
                            onClick={() => handleOpenMapModal(PjpData)}
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
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Pjp</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5>Category</h5>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role_id">Type</InputLabel>
                <Select
                  label="other_category"
                  name="other_category"
                  id="other_category"
                  value={formData.other_category}
                  onChange={handleChange}
                  error={!!formErrors.other_category}
                >
                  {CategoryData && CategoryData.data ? (
                    CategoryData.data.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Loading...</MenuItem>
                  )}
                </Select>

                {formErrors.type && (
                  <FormHelperText error>
                    {formErrors.other_category}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <h5>List</h5>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role_id">Select Name</InputLabel>
                <Select
                  label="other_category"
                  name="other_category"
                  id="other_category"
                  value={formData.other_category}
                  onChange={handleChange}
                  error={!!formErrors.other_category}
                >
                  {CategoryData && CategoryData.data ? (
                    CategoryData.data.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Loading...</MenuItem>
                  )}
                </Select>

                {formErrors.type && (
                  <FormHelperText error>
                    {formErrors.other_category}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <h5>Concerned Name</h5>
              <TextField
                label="Concerned Name"
                fullWidth
                margin="normal"
                name="concered_name"
                id="concered_name"
                value={formData.concered_name}
                onChange={handleChange}
                error={!!formErrors.concered_name}
                helperText={formErrors.concered_name}
              />
            </Grid>
            <Grid item xs={12}>
              <h5>Remarks</h5>
              <TextField
                label="Remarks"
                fullWidth
                multiline
                rows={4} // Adjust the number of rows as needed
                margin="normal"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleForm}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
