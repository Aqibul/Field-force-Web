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
import { useDispatch, useSelector } from "react-redux";
import { fetchViewAllDealer } from "../../Redux/Slice/AllDealer/ViewAllDealerSlice";
import { fetchViewPjp } from "../../Redux/Slice/Pjp/ViewPjpSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchViewDashboard } from "../../Redux/Slice/Dashboard/ViewDashboardSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const Alldealer = useSelector(
    (state) => state.ViewAllDealer.ViewAllDealerData
  );
  const DashboardData = useSelector(
    (state) => state.ViewDashboard.ViewDashboardData
  );

  const AllPjp = useSelector((state) => state.ViewPjp.ViewPjpData);

  const countDealersByRole = (roleName) => {
    if (!Alldealer || !Alldealer.data || !Array.isArray(Alldealer.data)) {
      return 0;
    }

    return Alldealer.data.filter((dealer) => dealer.rolesname === roleName)
      .length;
  };

  const countAllPjp = () => {
    if (!AllPjp || !AllPjp.data || typeof AllPjp.data !== "object") {
      return 0;
    }

    return Object.keys(AllPjp.data).length;
  };

  React.useEffect(() => {
    dispatch(fetchViewAllDealer());
    dispatch(fetchViewPjp());
    dispatch(fetchViewDashboard());
  }, [dispatch]);
  const prepareGraphData = () => {
    if (!DashboardData || typeof DashboardData !== "object") {
      return [];
    }

    const graphData = Object.keys(DashboardData).map((month) => ({
      month,
      value: DashboardData[month],
    }));

    return graphData;
  };
  const calculateTotalVisits = () => {
    if (!DashboardData || typeof DashboardData !== "object") {
      return 0;
    }

    return Object.values(DashboardData).reduce(
      (total, visits) => total + visits,
      0
    );
  };
  const totalVisits = calculateTotalVisits();

  const graphData = prepareGraphData();
  return (
    <div style={{ background: "linear-gradient(to right, #ffedff, #fff)" }}>
      <Topbar />
      <Grid container spacing={3} style={{ padding: "30px" }}>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#f8ee1f" }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  Pjp
                </Typography>
                <Typography variant="h2" component="div">
                  {countAllPjp()}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/viewpjp">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#e739fc" }}>
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
                  {countDealersByRole("Dealer")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/dealer">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#95fba0" }}>
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
                  {countDealersByRole("SubDealer")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/subdealer">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#f9bcff" }}>
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
                  {countDealersByRole("Architect")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/architect">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#9fa3f2" }}>
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
                  {countDealersByRole("Builder")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/builder">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#bf62ff" }}>
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
                  {countDealersByRole("Contractor")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/contractor">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#f9ff59" }}>
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
                  {countDealersByRole("Competitor")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/competitor">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "#fe8553" }}>
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
                  {countDealersByRole("Other")}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Link to="/others">
                <Button size="small" style={{ color: "#575757" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
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
                  {totalVisits}
                </Typography>
              </div>
              <ResponsiveContainer height={400}>
                <BarChart data={graphData}>
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
              <Link to="/visits">
                <Button size="small" style={{ color: "#fff" }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
