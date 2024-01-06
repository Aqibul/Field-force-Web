import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { addPjp } from "../../Redux/Slice/Pjp/AddPjpSlice";
import { fetchViewPjp } from "../../Redux/Slice/Pjp/ViewPjpSlice";
import { fetchViewCategory } from "../../Redux/Slice/Category/ViewCategorySlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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

export default function ViewPjp() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const pjp = useSelector((state) => state.ViewPjp.ViewPjpData);
  const loading = useSelector((state) => state.ViewPjp.isLoader);
  const error = useSelector((state) => state.ViewPjp.isError);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [formData, setFormData] = useState({
    category: "",
    concerned_person: "",
    formattedDate: "",
    remarks: "",
    payment_status: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(pjp);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [formErrors, setFormErrors] = useState({
    category: "",
    concerned_person: "",
    formattedDate: "",
    remarks: "",
    payment_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormErrors({
      ...formErrors,
      [name]: "", // Reset the error for the specific field
    });

    // Special handling for the category field
    if (name === "category") {
      setSelectedCategory(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }

    if (!formData.concerned_person.trim()) {
      errors.concerned_person = "Concerned Person is required";
    }

    // Check if formattedDate is not a valid date object
    if (!(formData.formattedDate instanceof Date)) {
      errors.formattedDate = "Date is required";
    }

    return errors;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    console.log("Entering handleForm");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setFormErrors(errors);
      return;
    }

    const formDataPjp = {
      ...formData,
      category: selectedCategory,
    };

    try {
      console.log("Submitting form data:", formDataPjp);
      await dispatch(addPjp(formDataPjp));

      setFormData({
        category: "",
        concerned_person: "",
        formattedDate: "",
        remarks: "",
        payment_status: "",
      });
      setFormErrors({});
      setSelectedCategory(null);

      console.log("Fetching updated Pjp data...");
      await dispatch(fetchViewPjp());

      // Close the modal
      handleCloseModal();
      console.log("Modal closed successfully");
    } catch (error) {
      console.error("Error adding Pjp:", error);
      // Handle error (e.g., show an error message)
    }
  };

  React.useEffect(() => {
    dispatch(fetchViewPjp());
  }, [dispatch]);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [categoryData, setCategoryData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchViewCategory());
        const dataFromResponse = response.payload.data || [];
        console.log("category data", dataFromResponse);
        setCategoryData(dataFromResponse);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px", backgroundColor: "#ff" }}
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
      >
        Add Pjp
      </Button>

      <ToastContainer position="bottom-right" autoClose={3000} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : pjp && Array.isArray(pjp.data) && pjp.data.length > 0 ? (
        <React.Fragment>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, -1]}
            component="div"
            count={pjp.data.length}
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
                  <StyledTableCell>Contractor</StyledTableCell>
                  <StyledTableCell>Lists</StyledTableCell>
                  <StyledTableCell>Concerned Person</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pjp.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((pjpData) => (
                    <StyledTableRow key={pjpData.id}>
                      <StyledTableCell>{pjpData.category}</StyledTableCell>
                      <StyledTableCell>
                        {pjpData.concerned_person}
                      </StyledTableCell>
                      <StyledTableCell>{pjpData.category}</StyledTableCell>

                      <StyledTableCell>
                        <IconButton color="secondary">
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
        <div style={{ padding: "20px" }}>No Company available</div>
      )}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Pjp</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h5 style={{ marginBottom: "35px" }}>Category</h5>
              <Select
                label="Category"
                fullWidth
                margin="normal"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                error={!!formErrors.category}
                helperText={formErrors.category}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categoryData.map((category) => (
                  <MenuItem key={category.id} value={category.category}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={6}>
              <h5>Concerned Person</h5>
              <TextField
                label="Concerned Person"
                fullWidth
                margin="normal"
                name="concerned_person"
                id="concerned_person"
                value={formData.concerned_person}
                onChange={handleChange}
                error={!!formErrors.concerned_person}
                helperText={formErrors.concerned_person}
              />
            </Grid>
            <Grid item xs={6}>
              <h5 style={{ marginBottom: "35px" }}>Date</h5>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  value={formData.formattedDate}
                  onChange={(date) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      formattedDate: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <h5>Remarks</h5>
              <TextField
                label="Remarks"
                fullWidth
                margin="normal"
                name="remarks"
                id="remarks"
                value={formData.remarks}
                onChange={handleChange}
                error={!!formErrors.remarks}
                helperText={formErrors.remarks}
              />
            </Grid>
            <Grid item xs={6}>
              <h5 style={{ marginBottom: "35px" }}>Payment</h5>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formData.payment_status}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    name="payment_status"
                  />

                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    name="payment_status"
                  />
                </RadioGroup>
              </FormControl>
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
    </div>
  );
}
