import React from "react";
import { MdClose } from "react-icons/md";

const styles = {
  card: {
    position: "absolute",
    top: "85px",
    left: "0",
    width: "300px",
    height: "calc(100vh - 125px)",
    padding: "20px",
    backgroundColor: "#d8d8d8",
    overflowY: "auto",
  },
  cardCloseBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "30px",
    height: "30px",
    color: "#227c9d",
    backgroundColor: "#fef9ef",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #227c9d",
    cursor: "pointer",
  },
  // card::-webkit-scrollbar: {
  //   display: none;
  // },
  cardHeader: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  cardImg: {
    width: "120px",
    borderRadius: "1rem",
  },
  cardName: {
    marginTop: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cardRole: {
    margin: "1rem 0",
    fontSize: "1.2rem",
  },
  cardBody: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  cardItem: {
    width: "100%",
    margin: "0.5rem 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
  },
  cardItemLabel: {
    margin: "0.5rem 0",
    fontWeight: "bold",
  },
  cardItemValue: {
    textAlign: "justify",
  },
  cardItemImg: {
    width: "50px",
    height: "50px",
    margin: "0.2rem",
    borderRadius: "50%",
  },
  cardItemName: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
  },
  cardItemRole: {
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  },
};

const EmployeeDetailsCard = (props) => {
  return (
    <div style={styles.card}>
      <button style={styles.cardCloseBtn} onClick={props.handleClose}>
        <MdClose />
      </button>
      <div>
        <div style={styles.cardHeader}>
          <img
            style={styles.cardImg}
            src={props.employee.imageUrl}
            alt=""
          />
          <h2 style={styles.cardName}>{props.employee.name}</h2>
          <p cstyle={styles.cardRole}>{props.employee.positionName}</p>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.cardItem}>
            <p style={styles.cardItemLabel}>Phone:</p>
            <p style={styles.cardItemValue}>{props.employee.phone}</p>
          </div>
          <div style={styles.cardItem}>
            <p style={styles.cardItemLabel}>Email:</p>
            <p style={styles.cardItemValue}>{props.employee.email}</p>
          </div>
          <div style={styles.cardItem}>
            <p style={styles.cardItemLabel}>Ext:</p>
            <p style={styles.cardItemValue}>{props.employee.Ext}</p>
          </div>
          {props.employee.department && (
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Department:</p>
              <p style={styles.cardItemValue}>{props.employee.department}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;
