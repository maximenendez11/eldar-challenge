import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./UsersTable.css";
import Container from "@mui/material/Container";
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UsersTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", phone: "", username: "" });
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Nuevo estado para controlar el diálogo de añadir

  const simulatedData = [
    { id: 1, name: "Max", email: "maxi@gmail.com", phone: "1137028383", username: "Buenos Aires" },
    { id: 2, name: "John", email: "john@gmail.com", phone: "1234567890", username: "Rosario" },
    { id: 3, name: "Jane", email: "jane@gmail.com", phone: "0987654321", username: "Córdoba" },
    { id: 4, name: "Sara", email: "sara@gmail.com", phone: "1122334455", username: "Mendoza" },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(response.data.length === 0 ? simulatedData : response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setData(simulatedData);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddEmployee = async () => {
    if (user.role === "admin" && newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.username) {
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", newEmployee, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        setData([...data, response.data]);
        setNewEmployee({ name: "", email: "", phone: "", username: "" });
        handleCloseAdd();
      } catch (error) {
        console.error("Error al añadir el usuario:", error);
      }
    }
  };

  const handleOpenEdit = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditUser(null);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (user.role === "admin" && editUser) {
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, editUser, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        setData(data.map((emp) => (emp.id === editUser.id ? editUser : emp)));
        handleCloseEdit();
      } catch (error) {
        setData(data.map((emp) => (emp.id === editUser.id ? editUser : emp)));
        handleCloseEdit();
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewEmployee({ name: "", email: "", phone: "", username: "" });
  };

  const handleAddChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          {user.role === "admin" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenEdit(params.row)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="userTableApp">
      <section className="userTableSection">
      <h1>Grilla de empleados</h1>
      <h2>Bienvenido usuario: {user.username}. Su rol es de: {user.role}</h2>

      {user.role === "admin" && (
        <Button variant="contained" color="primary" onClick={handleOpenAdd} style={{ marginBottom: "20px" }}>
          Añadir Empleado
        </Button>
      )}

      <Container>
        <div style={{ height: "auto", width: "100%", marginTop: "20px", backgroundColor: "white" }}>
          <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection disableSelectionOnClick />
        </div>
      </Container>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Añadir Nuevo Empleado</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={newEmployee.name}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={newEmployee.email}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={newEmployee.phone}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={newEmployee.username}
            onChange={handleAddChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddEmployee} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={editUser?.name || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editUser?.email || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={editUser?.phone || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={editUser?.username || ""}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      </section>
     
    </div>
  );
};

export default UsersTable;
