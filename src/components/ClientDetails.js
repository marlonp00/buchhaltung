import React, { useState, useEffect, useContext } from "react";
import ClientContext from "../context/ClientContext";
import { useNavigate } from "react-router-dom";




function ClientDetails() {

  const [client, setClient] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [changedStatus, setChangedStatus] = useState(false);


  const { clientEdit, formatGermanDate, handleStatus, showClientStatus } = useContext(ClientContext);
  const navigate = useNavigate();




  useEffect(() => {
    setClient(clientEdit);

  
    setChangedStatus(false);


  }, [changedStatus]);

  const handleChangeStatus = () => {
   
    if(selectedState !== client.item[0].state) {
      client.item[0].state = selectedState;
      handleStatus(client.item[0].id, selectedState);
    }

    setChangedStatus(true);
   
  };

 

  


  return (
    <div className="wrapper">
      {client && (
        <div className={client.item[0].state === "SEND" ? "card card-finished" : "card"}>
          <div className="card-body">
            <h2 className="card-title">{`${client.item[0].firstname} ${client.item[0].lastname}`}</h2>
            <p className="card-text">
              <strong>Datum:</strong> {formatGermanDate(client.item[0].date)}
            </p>
            <p className="card-text">
              <strong>Status:</strong> {showClientStatus(client.item[0].state)}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {client.item[0].mail}
            </p>
            <p className="card-text">
              <strong>Telefon:</strong> {client.item[0].phone}
            </p>
            <p className="card-text">
              <strong>Adresse:</strong> {client.item[0].address + ', ' + client.item[0].plz}
            </p>
            <p className="card-text">
              <strong>Bestellung:</strong> {client.item[0].orders}
            </p>
            <div className="card-status">
              <label htmlFor="state" className="state-title"><h4>Wähle einen Status</h4></label>
              <select id="state" value={selectedState} onChange={(e) => setSelectedState(String(e.target.value))}>
                <option value="IN_PROGRESS">Bestellt</option>
                <option value="BILL_SEND">Rechnung verschickt</option>
                <option value="PAYED">Bezahlt</option>
                <option value="PRINT_ORDERED">Print bestellt</option>
                <option value="SEND">Versendet</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary-light" onClick={handleChangeStatus}>
              Status ändern
            </button>
          
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Zurück
            </button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default ClientDetails;
