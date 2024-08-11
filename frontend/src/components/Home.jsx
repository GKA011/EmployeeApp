import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateData = (val) => {
    // Navigate to the add/update page with the data's ID and data state
    navigate(`/add`, { state: { data: val } });
  };

  const deleteData = (_id) => {
    axios
      .delete(`http://localhost:3001/delete/${_id}`)
      .then((res) => {
        alert("Data deleted");
        // Refresh the data list after deletion
        setData(data.filter((item) => item._id !== _id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Mar">
      <Grid container spacing={6}>
        {data.map((val, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <img
                  src={val.img_url}
                  className="img-fluid rounded-start"
                  width="100%"
                  alt="image"
                />
                <Typography gutterBottom variant="h5">
                  {val.EmpName}
                </Typography>
                <Typography component="div">{val.designation}</Typography>
                <Typography component="div">{val.empId}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#d500f9" }}
                  onClick={() => updateData(val)} // Pass the specific employee data
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#d500f9" }}
                  onClick={() => deleteData(val._id)} // Pass the specific employee _id
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
