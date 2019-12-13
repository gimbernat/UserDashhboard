import React, { Component } from "react";
import Backdrop from "./Backdrop/Backdrop";
import Modal from "../../Ui/Modal";

export default class UsersMain extends Component {
  state = {
    isModalShowing: false
  };
  openModal = () => {
    console.log("opening modal");
    this.setState({ isModalShowing: !this.state.isModalShowing });
  };

  isModalShowing() {
    if (this.state.isModalShowing) {
      return (
        <React.Fragment>
          <Backdrop click={this.openModal} />
          <Modal
            editMode={false}
            submitForm={this.props.submitForm}
            editUserSubmit={this.props.editUserSubmit}
            toggleModal={this.openModal}
            userData={this.props}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <section className="users-main">
        {this.isModalShowing()}
        <div className="users-main-left container">
          <h1>Usuarios</h1>
          <p className="subtitle">Encuentra y Administra los Usuarios</p>
        </div>
        <div className="users-main-right">
          <div onClick={this.openModal} className="button center shadow">
            Agregar un Usuario
          </div>
        </div>
      </section>
    );
  }
}
