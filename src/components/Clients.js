import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ClientContext from "../context/ClientContext";

function Clients() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sortByDate, setSortByDate] = useState(false); // New state for sorting

  const { clients, username, showDetails, deleteClient, showClientStatus, clientEdit } = useContext(ClientContext);

  const [items, setItems] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    console.log("Trigger Clients");
    if (sortByDate) {
      setItems(sortClientsByDate(clients));
    } else {
      setItems(clients);
    }
  }, [selectedDate, deleteClient, clients, sortByDate]);

  // Filter Client
  const filterClients = (client) => {
    if (selectedStatus && client.state !== selectedStatus) {
      return false;
    }
    if (selectedDate) {
      const clientDate = new Date(client.date);
      const selectedDateObj = new Date(selectedDate);
      if (
        clientDate.getFullYear() !== selectedDateObj.getFullYear() ||
        clientDate.getMonth() !== selectedDateObj.getMonth() ||
        clientDate.getDate() !== selectedDateObj.getDate()
      ) {
        return false;
      }
    }
    return true;
  };

  // Sort clients by date in descending order (newest first)
  const sortClientsByDate = (clients) => {
    const sortedClients = [...clients]; // Make a copy of the original array
    return sortedClients.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  


  // Formats english date to german Date
  const formatGermanDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("de-DE", options);
  };

  const handleDetails = (id) => {
    showDetails(id);
    if(clientEdit.edit === true) {
      console.log(clientEdit);
      navigate("/details");
     }
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 clients-title">
          <h1>Bestellungen</h1>
        </div>
        <div className="box-filter">
          <label htmlFor="date-filter">Filter nach Datum:</label>
          <input type="date" id="date-filter" className="date-filter" onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <div className="box-filter">
          <label htmlFor="status-filter">Filter nach Status:</label>
          <select id="status-filter" className="status-filter" onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Alle</option>
            <option value="IN_PROGRESS">Bestellt</option>
            <option value="BILL_SEND">Rechnung verschickt</option>
            <option value="PAYED">Bezahlt</option>
            <option value="PRINT_ORDERED">Print bestellt</option>
            <option value="SEND">Versendet</option>
          </select>
        </div>
        <div className="box-filter">
          <div className="checkbox-rect">
          <input type="checkbox" id="date-sort" className="checkbox" checked={sortByDate} onChange={() => setSortByDate(!sortByDate)} />
          <label htmlFor="date-sort" >Neueste zuerst</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul>
            {items ? items.filter(filterClients).map((client) => (
              <li className={
              client.state === "SEND"
              ? "table table-finished"
              : "table"} key={client.id}>
                <div className="clients-infobox">
                  <br />
                  <span>Name: {client.firstname} {client.lastname}</span>
                  <br />
                  <span>Datum: {formatGermanDate(client.date)}</span>
                  <br />
                  <span>Bestellung: {client.orders}</span>
                  <br />
                  <span>Status: {showClientStatus(client.state)}</span>
                  <br />
                </div>

                  <button className="btn btn-primary" onClick={() => handleDetails(client.id)}>
                    Details
                  </button>

               {username === "Sonja" && <button className="btn btn-danger" onClick={() => { if(window.confirm('Bestellung löschen?')){ deleteClient(client.id)}} }>Löschen</button>} 
              </li>
            )) : <p>Keine Bestellungen</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Clients;
