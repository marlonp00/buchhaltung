import { createContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const ClientContext = createContext();

export const ClientProvider = ({children}) => {

  const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [clientEdit, setClientEdit] = useState({
        item: {},
        edit: false
    });
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
      getClients();
      if(clientEdit.edit === true) {
        console.log(clientEdit);
        navigate("/details");
       }
    }, [selectedDate, selectedStatus, clientEdit]);
  
    const getClients = async () => {
      let url = `${apiUrl}/clients`;
      if (selectedDate) {
        url += `?date=${selectedDate}`;
      }
      if (selectedStatus) {
        url += `${selectedDate ? '&' : '?'}state=${selectedStatus}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // log the response data to the console
      setClients(data);
    };

    const handleUserName = (user) => {
      setUsername(user);
    } 
    const handlePassword = (pass) => {
      setPassword(pass);
    } 

    

    const showClientStatus =  (clientState) => {
      switch(clientState) {
        case "IN_PROGRESS" :
         return "Bestellt";  
        case "BILL_SEND" :
         return "Rechnung verschickt";
         case "PAYED" :
          return  "Bezahlt";
          case "PRINT_ORDERED" :
            return  "Print bestellt";
          case "SEND" :
            return  "Versendet";
        default : return "In Bearbeitung";
      }
    }


    const showDetails = async (editId) => {
       const editClient = clients.filter(client => client.id === editId);
      
       await setClientEdit({item: editClient, edit:true});
      
    }

  
   // Update the client's status in the local state
const handleStatus = async (clientId, selectedState) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${clientId}`, {
      method: "PUT",
      body: JSON.stringify({ state: selectedState }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update client status");
    }
    const updatedClient = await response.json();
    // Update the client's status in the local state
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === clientId) {
          return { ...client, state: updatedClient.state };
        } else {
          return client;
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
};

    // deletes Client
    const deleteClient = async (id) => {

      try {
        const response = await fetch(`${apiUrl}/clients/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredClients = clients.filter((client) => client.id !== id);
          setClients(filteredClients);
        } else {
          throw new Error("Failed to delete Order");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Formats english date to german Date
    const formatGermanDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      };
      return date.toLocaleDateString("de-DE", options);
    };
  
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
  
    return (
      <ClientContext.Provider value={{
        clients: clients,
        clientEdit: clientEdit,
        username: username,
        password: password,
        handleStatus: handleStatus,
        deleteClient: deleteClient,
        filterClients: filterClients,
        formatGermanDate: formatGermanDate,
        setSelectedDate: setSelectedDate,
        setSelectedStatus: setSelectedStatus,
        showDetails: showDetails,
        showClientStatus: showClientStatus,
        handleUserName: handleUserName,
        handlePassword: handlePassword
    }}>
        {children}
    </ClientContext.Provider> 
    )
}

export default ClientContext;