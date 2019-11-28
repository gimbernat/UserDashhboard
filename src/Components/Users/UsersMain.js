import React, { Component } from "react";

export default class UsersMain extends Component {
  render() {
    return (
      <section className="users-main">
        <div className="users-main-left container">
          <h1>Usuarios</h1>
          <p className="subtitle">Encuentra y Administra los Usuarios</p>
        </div>
        <div className="users-main-right">
          <div onClick={this.props.openModal}  className="button center shadow">
            Agregar un Usuario
          </div>
        </div>
      </section>
    );
  }
}
