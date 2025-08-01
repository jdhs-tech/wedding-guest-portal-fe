import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Dialog, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import Preference from "../../assets/feedback.png";
import Assignment from "../../assets/complain.png";
import { getPreferenceList } from "../../redux/stableRelated/stableHandle";

const GuestHomePage = () => {
  const dispatch = useDispatch();

  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { preferencesList } = useSelector((state) => state.stable);

  const [preferenceAttendance, setPreferenceAttendance] = useState([]);

  const tableID = currentUser.stableName._id;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Guest"));
    dispatch(getPreferenceList(tableID, "TablePreferences"));
  }, [dispatch, currentUser._id, tableID]);

  const numberOfPreferences = preferencesList && preferencesList.length;

  useEffect(() => {
    if (userDetails) {
      setPreferenceAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(preferenceAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Preference} alt="Preferences" width="30%" />
              <Title>Total Preferences</Title>
              <Data start={0} end={numberOfPreferences} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Assignment} alt="Assignments" width="30%" />
              <Title>Total Complains</Title>
              <Data start={0} end={15} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ChartContainer>
              {response ? (
                <Typography variant="h6">No Attendance Found</Typography>
              ) : (
                <>
                  {loading ? (
                    // <Typography variant="h6">Loading...</Typography>
                    <Dialog open={true}>
                      <DialogTitle>Loading</DialogTitle>
                    </Dialog>
                  ) : (
                    <>
                      {preferenceAttendance &&
                      Array.isArray(preferenceAttendance) &&
                      preferenceAttendance.length > 0 ? (
                        <>
                          <CustomPieChart data={chartData} />
                        </>
                      ) : (
                        <Typography variant="h6">
                          No Attendance Found
                        </Typography>
                      )}
                    </>
                  )}
                </>
              )}
            </ChartContainer>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default GuestHomePage;
