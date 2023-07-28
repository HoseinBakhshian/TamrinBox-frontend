import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const Card = (props) => {
  const { name, master, members, thumbnail, _id } = props;

  return (
    <div className="card card-shadow text-center align-self-stretch" >
      <div className="img-wrapper">
        <img src={thumbnail} alt="nlp" className="card-img img" />
      </div>
      <div className="card-body">
        <h5 className="card-title  fw-bold mt-2">{name}</h5>
        <p className="card-text  mb-1">{master}</p>
      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <div>
          <i className="bi bi-person-fill"></i>
          <span>{members}عضو</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
