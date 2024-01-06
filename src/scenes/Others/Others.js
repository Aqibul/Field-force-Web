import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchViewAllDealer } from "../../Redux/Slice/AllDealer/ViewAllDealerSlice";
import { addAllDealer } from "../../Redux/Slice/AllDealer/AddAllDealerSlice";
import { updateAllDealer } from "../../Redux/Slice/AllDealer/UpdateAllDealerSlice";
import InputBase from "@mui/material/InputBase";

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

export default function Others() {
  const dispatch = useDispatch();
  const Alldealer = useSelector(
    (state) => state.ViewAllDealer.ViewAllDealerData
  );

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
    role_id: "10",
    longitude: "00",
    Attitude: "00",
    territory: "00",
    state: "00",
    rm: "00",
    code: "00",
    brands: "00",
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
      role_id: "10",
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
        });
        setFormErrors({});

        // Reload data after successful addition
        dispatch(fetchViewAllDealer());
        toast.success("Others added successfully!");

        // Close the modal
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding Others:", error);
        toast.error("Error adding Others. Please try again.");
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
    role_id: "10",
    longitude: "00",
    Attitude: "00",
    territory: "00",
    state: "00",
    rm: "00",
    code: "00",
    brands: "00",
    geotag_address: "Enter From Phone only",
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
      //   brands,
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
      role_id: "10",
      longitude: "00",
      Attitude: "00",
      territory: "00",
      state: "00",
      rm: "00",
      code: "00",
      brands: "00",
      geotag_address: "Enter From Phone only",
      // include other default values as needed
    };

    dispatch(updateAllDealer(credentials))
      .then(() => {
        // Reload data after successful update
        dispatch(fetchViewAllDealer());
        toast.success("Others updated successfully!");

        // Close the edit modal
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Error updating Others:", error);
        toast.error("Error updating Others. Please try again.");
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
        role_id: "10",
        longitude: "00",
        Attitude: "00",
        territory: "00",
        state: "00",
        rm: "00",
        code: "00",
        brands: "00",
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
    (dealerData) => dealerData.roleId === "10"
  );

  // Slice the data for pagination
  const slicedData = filteredDataWithRole?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Vertically align items in the center
          borderBottom: "1px solid #ccc", // Add a border to the bottom
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#fff" }}
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Add Others
        </Button>

        <InputBase
          sx={{ ml: 2 }}
          placeholder="Search by name or email"
          onChange={handleSearch}
          style={{ color: "black", border: "1px solid #ccc", padding: "8px" }}
        />
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : Alldealer && Alldealer.data && Alldealer.data.length > 0 ? (
        <React.Fragment>
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
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Concerned Person</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Designation</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData?.map((dealerData) => (
                  <StyledTableRow key={dealerData.id}>
                    <StyledTableCell>{dealerData.name}</StyledTableCell>
                    <StyledTableCell>{dealerData.address}</StyledTableCell>
                    <StyledTableCell>
                      {dealerData.concered_name}
                    </StyledTableCell>
                    <StyledTableCell>{dealerData.email}</StyledTableCell>
                    <StyledTableCell>{dealerData.designation}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenEditModal(dealerData)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ) : (
        <div style={{ padding: "20px" }}>No User available</div>
      )}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Others</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5>Type</h5>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role_id">Type</InputLabel>
                <Select
                  label="Type"
                  name="role_id"
                  id="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  error={!!formErrors.role_id}
                >
                  <MenuItem value="Plumber">Plumber</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
                {formErrors.role_id && (
                  <FormHelperText error>{formErrors.role_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>
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
        <DialogTitle>Update Others</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <input
              type="hidden"
              id="eid"
              value={selectedData ? selectedData.id : ""}
            />
            <Grid item xs={12}>
              <h5>Type</h5>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role_id">Type</InputLabel>
                <Select
                  label="Type"
                  name="role_id"
                  id="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  error={!!formErrors.role_id}
                >
                  <MenuItem value="Plumber">Plumber</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
                {formErrors.role_id && (
                  <FormHelperText error>{formErrors.role_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <h5>Name</h5>
              <TextField
                id="name"
                label="name"
                defaultValue={selectedData ? selectedData.name : ""}
                onChange={(e) => handleEditModalChange("name", e.target.value)}
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
                onChange={(e) => handleEditModalChange("email", e.target.value)}
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
    </div>
  );
}
