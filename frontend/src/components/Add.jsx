import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdate = location.state && location.state.data; // Check if we're in update mode
  const [inputs, setInputs] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: "",
  });

  useEffect(() => {
    if (isUpdate) {
      // If updating, set initial form state to the data being updated
      setInputs(location.state.data);
    }
  }, [isUpdate, location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isUpdate) {
      // Update data
      axios
        .put(`http://localhost:3001/update/${location.state.data._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Error updating data");
        });
    } else {
      // Add new data
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Error adding data");
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Employee Name"
            onChange={inputHandler}
            name="EmpName"
            value={inputs.EmpName}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Designation"
            onChange={inputHandler}
            name="designation"
            value={inputs.designation}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Employee Id"
            onChange={inputHandler}
            name="empId"
            value={inputs.empId}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Photo (paste any link from the browser)"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
