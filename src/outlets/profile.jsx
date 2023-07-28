import React, { useContext, useEffect } from "react";
import Edit from "../componenet/edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../context/MainContext";

const Profile = () => {
  const { id, SetId } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id == "") {
      axios
        .get(`http://localhost:8000/users/getCurrentUserID`, { withCredentials: true })
        .then((res) => {
          if (res.data.authenticated) {
            SetId(res.data.id);
          } else {
            navigate("signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="">
      <Edit />
    </div>
  );
};

export default Profile;
