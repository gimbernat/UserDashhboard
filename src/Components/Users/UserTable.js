import React from 'react'
import User from "./User"
import "./UserTable.css"

const UserTable = (props) => {
  const mappedUsers = props.filteredUsers.map(user => {
    const {picture,name,fathersLastName,mothersLastName,email,roleId,active} = user;   //Destructuring 
   
    return (
      <User
          picture={picture}
          name={name}
          fathersLastName={fathersLastName}
          mothersLastName={mothersLastName}
          email={email}
          roleId={roleId}
          active={active}
          key={email}
      />
    );
  });

  return (
    <table>
    <thead>
      <tr>
        <th></th>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>Correo</th>
        <th>Rol</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {mappedUsers}
    </tbody>
  </table>
  )
}




export default UserTable