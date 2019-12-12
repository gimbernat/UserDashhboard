import React, { Component } from "react";
import Backdrop from "./Backdrop/Backdrop";
import Modal from "../../Ui/Modal";


export default class UsersMain extends Component {
  state = {
    isModalShowing: false
  };
  openModal = () => {
    this.setState({ isModalShowing: !this.state.isModalShowing });
  };

  isModalShowing() {
    if (this.state.isModalShowing) {
      return (
        <React.Fragment>
          <Backdrop click={this.openModal} />
          <Modal
            editMode={true}
            editUserSubmit={this.props.editUserSubmit}
            openModal={this.props.openModal}
            closeModal={this.props.openModal}
            userData={this.props}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <section className="users-main">
        <div className="users-main-left container">
          <h1>Usuarios</h1>
          <p className="subtitle">Encuentra y Administra los Usuarios</p>
        </div>
        <div className="users-main-right">
          <div onClick={this.props.openModal} className="button center shadow">
            Agregar un Usuario
          </div>
        </div>
      </section>
    );
  }
}
