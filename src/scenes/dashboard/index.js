import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import Topbar from "../global/Topbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataForCard1 = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 21 },
  { month: "Apr", value: 30 },
  { month: "May", value: 55 },
  { month: "Jun", value: 21 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

const dataForCard2 = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 145 },
  { month: "Mar", value: 21 },
  { month: "Apr", value: 5 },
  { month: "May", value: 55 },
  { month: "Jun", value: 21 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

const dataForCard3 = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 21 },
  { month: "Apr", value: 30 },
  { month: "May", value: 75 },
  { month: "Jun", value: 10 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Dashboard = () => {
  return (
    <div>
      <Topbar />
      <Grid container spacing={3} style={{ padding: "30px" }}>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  PJP
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard1}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Dealer
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard1}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Subdealer
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard1}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Architect
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard1}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Builder
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard2}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Contractor
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard3}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Competitor
                </Typography>
                <Typography variant="h2" component="div">
                  51
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard3}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: generateRandomColor() }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Other
                </Typography>
                <Typography variant="h2" component="div">
                  67
                </Typography>
              </div>
              <ResponsiveContainer height={100}>
                <BarChart data={dataForCard3}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Total Visits BarChart */}
        <Grid item xs={12}>
          <Card
            style={{
              backgroundColor: "#1e88e5",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <Typography variant="h2" component="div">
                  Total Visits
                </Typography>
                <Typography variant="h1" component="div">
                  67
                </Typography>
              </div>
              <ResponsiveContainer height={400}>
                <BarChart data={dataForCard1}>
                  <XAxis dataKey="month" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2196f3",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" fill="#64b5f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "#fff" }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
