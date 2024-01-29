import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchViewProfile } from "../../Redux/Slice/Profile/ViewProfileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const ProfileData = useSelector((state) => state.ViewProfile.ViewProfileData);

  React.useEffect(() => {
    dispatch(fetchViewProfile());
  }, [dispatch]);

  // Check if ProfileData is null or undefined
  if (!ProfileData) {
    return (
      <div style={mainContainerStyle}>
        <h1>Loading...</h1>
      </div>
    );
  }

  // Check if ProfileData.data is null or undefined
  if (!ProfileData.data) {
    return (
      <div style={mainContainerStyle}>
        <h1>No data available</h1>
      </div>
    );
  }

  // Use an absolute URL for the image
  const imageUrl =
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png";

  return (
    <div style={mainContainerStyle}>
      <div style={centerContainerStyle}>
        <div style={leftContainerStyle}>
          <h1>PROFILE</h1>
          <img
            src={imageUrl}
            alt="Profile Image"
            style={{ width: "70%", borderRadius: "8px" }}
          />

          <h1>{ProfileData.data.name}</h1>
        </div>
        <div style={rightContainerStyle}>
          <h3>Code: {ProfileData.data.empCode}</h3>
          <h3>RM: {ProfileData.data.rm}</h3>
          <h3>State: {ProfileData.data.state}</h3>
          <h3>Territory: {ProfileData.data.territory}</h3>
        </div>
      </div>
    </div>
  );
};

const mainContainerStyle = {
  background: "linear-gradient(to right, #4d0054, #91009e)",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
  color: "white",
  margin: "170px",
  padding: "50px",
};

const centerContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const leftContainerStyle = {
  flex: 1,
  marginRight: "20px",
};

const rightContainerStyle = {
  flex: 2,
};

export default Profile;
