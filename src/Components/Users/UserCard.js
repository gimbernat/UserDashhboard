import React, { Component } from "react";
import { ReactComponent as Points } from "../../assets/svg/points.svg";
import { ReactComponent as ToggleOn } from "../../assets/svg/toggle_on.svg";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";
import { ReactComponent as Eye } from "../../assets/svg/eye.svg";
import Backdrop from "./Backdrop/Backdrop";
import "./UserCard.css";
import Modal from "../../Ui/Modal";
export class UserCard extends Component {
  state = {
    isShowing: false
  };
  openModal = () => {
    this.setState({ isShowing: !this.state.isShowing });
  };
  

  isModalShowing() {
    if (this.state.isShowing) {
      return (
        <React.Fragment>
          <Backdrop click={this.openModal} />
          <Modal
            editUserSubmit={this.props.editUserSubmit}
            openModal={this.props.openModal}
            closeModal={this.props.openModal}
            userData={this.props}
          />
        </React.Fragment>
      );
    }
  }

  deleteUser = user => {
    this.props.deleteUser(this.props.email);
  };


  render() {
    const {
      picture,
      name,
      fathersLastName,
      mothersLastName,
      email,
      roleId
    } = this.props;

    return (
      <div className="user-card shadow">
        {this.isModalShowing()}
        <div className="user-card-inner">
          <div className="user-card-top">
            <div id="top-left-points">
              <Points />
            </div>
            <img className="user-picture-lg" src={picture} alt="" />
            <p>
              <span>{`${name}  ${fathersLastName} ${mothersLastName}  `} </span>
            </p>
            <p className="text-center cut-text">{email}</p>
            <p>{roleId}</p>
            <hr />
          </div>
          <div className="user-card-bottom">
            <ToggleOn style={{ marginLeft: "10%" }} />
            <div className="user-card-buttons">
              <Eye onClick={this.openModal} />
              <Trash onClick={this.deleteUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
