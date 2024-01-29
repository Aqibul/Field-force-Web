import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Edit";
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
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchViewAllDealer } from "../../Redux/Slice/AllDealer/ViewAllDealerSlice";
import { addAllDealer } from "../../Redux/Slice/AllDealer/AddAllDealerSlice";
import { updateAllDealer } from "../../Redux/Slice/AllDealer/UpdateAllDealerSlice";
import InputBase from "@mui/material/InputBase";
import L from "leaflet";
import redPinIcon from "../../Assets/images/pin.png";
import Topbar from "../global/Topbar";

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

export default function Competitor() {
  const dispatch = useDispatch();
  const Alldealer = useSelector(
    (state) => state.ViewAllDealer.ViewAllDealerData
  );
  const locationOnIcon = new L.Icon({
    iconUrl: redPinIcon,
    iconSize: [25, 30], // Adjust the size as needed
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const loading = useSelector((state) => state.ViewAllDealer.isLoader);
  const error = useSelector((state) => state.ViewAllDealer.isError);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModal, setOpenModal] = React.useState(false);

  // view list
  React.useEffect(() => {
    dispatch(fetchViewAllDealer());
  }, [dispatch]);
  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    role_id: "8",
    longitude: "00",
    Attitude: "00",
    territory: "00",
    state: "00",
    rm: "00",
    code: "00",
    brands: "",
  });
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.concered_name.trim()) {
      errors.concered_name = "Concerned Name is required";
    }
    if (!formData.number.trim()) {
      errors.number = "Phone Number is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.designation.trim()) {
      errors.designation = "Designation is required";
    }
    if (!formData.brands.trim()) {
      errors.brands = "Brand is required";
    }
    return errors;
  };
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    // geotag_address: "",
    concered_name: "",
    number: "",
    email: "",
    designation: "",
    brands: "",
  });
  const handleForm = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      // Set errors and prevent form submission
      setFormErrors(errors);
      return;
    }

    // Include default values for fields in the formData
    const formDataWithDefaults = {
      ...formData,
      role_id: "8",
      longitude: "00",
      Attitude: "00",
      territory: "00",
      state: "00",
      rm: "00",
      code: "00",
      geotag_address: "Enter From Phone only",
    };

    // Log the form data before dispatching
    console.log("Form Data:", formDataWithDefaults);

    dispatch(addAllDealer(formDataWithDefaults))
      .then(() => {
        // Reset form data and errors after successful addition
        setFormData({
          name: "",
          address: "",
          concered_name: "",
          number: "",
          email: "",
          designation: "",
          brands: "",
        });
        setFormErrors({});

        // Reload data after successful addition
        dispatch(fetchViewAllDealer());
        toast.success("Competitor added successfully!");

        // Close the modal
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding Competitor:", error);
        toast.error("Error adding Competitor. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   update
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);
  const [editData, setEditData] = React.useState({
    id: "",
    name: "",
    address: "",
    concered_name: "",
    number: "",
    email: "",
    designation: "",
    role_id: "8",
    longitude: "00",
    Attitude: "00",
    territory: "00",
    state: "00",
    rm: "00",
    code: "00",
    geotag_address: "Enter From Phone only",
    brands: "",
  });

  const handleEditModalChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleEdit = () => {
    const {
      id,
      name,
      address,
      concered_name,
      number,
      email,
      designation,
      //   role_id,
      //   longitude,
      //   Attitude,
      //   territory,
      //   state,
      //   rm,
      //   code,
      brands,
      //   geotag_address,
    } = editData;

    const credentials = {
      id,
      name,
      address,
      concered_name,
      number,
      email,
      designation,
      role_id: "8",
      longitude: "00",
      Attitude: "00",
      territory: "00",
      state: "00",
      rm: "00",
      code: "00",
      brands,
      geotag_address: "Enter From Phone only",
      // include other default values as needed
    };

    dispatch(updateAllDealer(credentials))
      .then(() => {
        // Reload data after successful update
        dispatch(fetchViewAllDealer());
        toast.success("Competitor updated successfully!");

        // Close the edit modal
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Error updating Competitor:", error);
        toast.error("Error updating Competitor. Please try again.");
      });
  };

  const handleOpenEditModal = (dealerData) => {
    if (dealerData) {
      setSelectedData(dealerData);
      setEditData({
        id: dealerData.id,
        name: dealerData.name,
        address: dealerData.address,
        concered_name: dealerData.concered_name,
        number: dealerData.number,
        email: dealerData.email,
        designation: dealerData.designation,
        role_id: dealerData.role_id,
        longitude: dealerData.longitude,
        Attitude: dealerData.Attitude,
        territory: dealerData.territory,
        state: dealerData.state,
        rm: dealerData.rm,
        code: dealerData.code,
        brands: dealerData.brands,
        geotag_address: dealerData.geotag_address,
      });
    } else {
      setEditData({
        id: "",
        name: "",
        address: "",
        concered_name: "",
        number: "",
        email: "",
        designation: "",
        role_id: "8",
        longitude: "00",
        Attitude: "00",
        territory: "00",
        state: "00",
        rm: "00",
        code: "00",
        brands: "",
        geotag_address: "Enter From Phone only",
      });
    }
    setOpenEditModal(true);
  };
  //   search
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    // Update the page to the first one when the search term changes
    setPage(0);
  };

  const filteredData = Alldealer?.data?.filter(
    (dealerData) =>
      dealerData.name.toLowerCase().includes(searchTerm) ||
      dealerData.email.toLowerCase().includes(searchTerm)
  );

  // Filter the data further based on role_id
  const filteredDataWithRole = filteredData?.filter(
    (dealerData) => dealerData.roleId === "8"
  );

  // Slice the data for pagination
  const slicedData = filteredDataWithRole?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [openMapModal, setOpenMapModal] = React.useState(false);
  const [mapLocation, setMapLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const handleOpenMapModal = (dealerData) => {
    const latitude = parseFloat(dealerData.Attitude);
    const longitude = parseFloat(dealerData.longitude);

    // Check if latitude and longitude are available
    if (isNaN(latitude) || isNaN(longitude)) {
      // Handle the case where latitude and/or longitude are not available
      toast.error(
        "Latitude and/or Longitude not available for this Competitor."
      );
      return;
    }

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
            border: "1px solid #ddd", // Border color
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0)", // Box shadow with matching background color
            borderRadius: "5px", // Border radius
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
            Add Competitor
          </Button>
          <h4 style={{ color: "#ffffff" }}>Competitor Details</h4>
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
              backgroundColor: "#fff", // Background color
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
              outline: "none", // Remove outline on focus
              transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition effect
            }}
          />
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : Alldealer && Alldealer.data && Alldealer.data.length > 0 ? (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Sl. No.
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Name
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Address
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Concerned Person
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Email
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Designation
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Lat/Long
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Action
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#7b0087" }}>
                      Map
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedData?.map((dealerData, index) => (
                    <StyledTableRow key={dealerData.id}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{dealerData.name}</StyledTableCell>
                      <StyledTableCell>{dealerData.address}</StyledTableCell>
                      <StyledTableCell>
                        {dealerData.concered_name}
                      </StyledTableCell>
                      <StyledTableCell>{dealerData.email}</StyledTableCell>
                      <StyledTableCell>
                        {dealerData.designation}
                      </StyledTableCell>
                      <StyledTableCell>
                        {dealerData.Attitude}/{dealerData.longitude}
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => handleOpenEditModal(dealerData)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => handleOpenMapModal(dealerData)}
                        >
                          <MapIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, -1]}
              component="div"
              count={Alldealer.data.length}
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
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Add Competitor</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h5>Name</h5>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Address</h5>
                <TextField
                  label="Address"
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
                <h5>Phone</h5>
                <TextField
                  label="Phone"
                  fullWidth
                  margin="normal"
                  name="number"
                  id="number"
                  value={formData.number}
                  onChange={handleChange}
                  error={!!formErrors.number}
                  helperText={formErrors.number}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Email</h5>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Designation</h5>
                <TextField
                  label="Designation"
                  fullWidth
                  margin="normal"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  error={!!formErrors.designation}
                  helperText={formErrors.designation}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Brands</h5>
                <TextField
                  label="Brands"
                  fullWidth
                  margin="normal"
                  name="brands"
                  id="brands"
                  value={formData.brands}
                  onChange={handleChange}
                  error={!!formErrors.brands}
                  helperText={formErrors.brands}
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
        <Dialog open={openEditModal} onClose={handleCloseModal}>
          <DialogTitle>Update Competitor</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <input
                type="hidden"
                id="eid"
                value={selectedData ? selectedData.id : ""}
              />
              <Grid item xs={12}>
                <h5>Name</h5>
                <TextField
                  id="name"
                  label="name"
                  defaultValue={selectedData ? selectedData.name : ""}
                  onChange={(e) =>
                    handleEditModalChange("name", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Address</h5>
                <TextField
                  label="Address"
                  fullWidth
                  multiline
                  rows={4} // Adjust the number of rows as needed
                  margin="normal"
                  name="address"
                  id="address"
                  defaultValue={selectedData ? selectedData.address : ""}
                  onChange={(e) =>
                    handleEditModalChange("address", e.target.value)
                  }
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Concerned Name</h5>
                <TextField
                  label="Concerned Name"
                  fullWidth
                  margin="normal"
                  name="concered_name"
                  id="concered_name"
                  defaultValue={selectedData ? selectedData.concered_name : ""}
                  onChange={(e) =>
                    handleEditModalChange("concered_name", e.target.value)
                  }
                  error={!!formErrors.number}
                  helperText={formErrors.number}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Phone</h5>
                <TextField
                  label="Phone"
                  fullWidth
                  margin="normal"
                  name="number"
                  id="number"
                  defaultValue={selectedData ? selectedData.number : ""}
                  onChange={(e) =>
                    handleEditModalChange("number", e.target.value)
                  }
                  error={!!formErrors.number}
                  helperText={formErrors.number}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Email</h5>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  name="email"
                  id="email"
                  defaultValue={selectedData ? selectedData.email : ""}
                  onChange={(e) =>
                    handleEditModalChange("email", e.target.value)
                  }
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Designation</h5>
                <TextField
                  label="Designation"
                  fullWidth
                  margin="normal"
                  name="designation"
                  id="designation"
                  defaultValue={selectedData ? selectedData.designation : ""}
                  onChange={(e) =>
                    handleEditModalChange("designation", e.target.value)
                  }
                  error={!!formErrors.designation}
                  helperText={formErrors.designation}
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Brands</h5>
                <TextField
                  label="Brands"
                  fullWidth
                  margin="normal"
                  name="brands"
                  id="brands"
                  defaultValue={selectedData ? selectedData.brands : ""}
                  onChange={(e) =>
                    handleEditModalChange("brands", e.target.value)
                  }
                  error={!!formErrors.brands}
                  helperText={formErrors.brands}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="secondary">
              Cancel
            </Button>
            <Button color="primary" onClick={handleEdit} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
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
              >
                {/* <Popup>
                Location: {mapLocation.latitude}, {mapLocation.longitude}
              </Popup> */}
              </Marker>
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
