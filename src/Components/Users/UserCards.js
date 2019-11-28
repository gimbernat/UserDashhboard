import React from "react";
import { UserCard } from "./UserCard";

export default function UserCards(props) {  
 
  const mappedUsers = props.filteredUsers.map((user , index) => {
    const {
      picture,
      name,
      fathersLastName,
      mothersLastName,
      email,
      roleId,
      active
    } = user; //Destructuring

    return (
      <UserCard
        picture={picture}
        name={name}
        fathersLastName={fathersLastName}
        mothersLastName={mothersLastName}
        email={email}
        roleId={roleId}
        active={active}

        key={index}
        id={index} 
        openModal={props.openModal} 
        closeModal = {props.closeModal}
        deleteUser={props.deleteUser}   
        editUserSubmit= {props.editUserSubmit}  
      />
    );
  });


  return (
  <div className="container">
  <div className="user-cards">

  </div>
  {mappedUsers}
  </div>);
}
