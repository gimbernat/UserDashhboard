import React, { Component } from "react";
import { ReactComponent as Points } from "../../assets/svg/points.svg";
import { ReactComponent as ToggleOn } from "../../assets/svg/toggle_on.svg";
import { ReactComponent as ToggleOff } from "../../assets/svg/toggle_off.svg";
class User extends Component {
  state = {
    userData:this.props
  };
  componentDidMount(){

    console.log(this.props.active)
    if (this.props) {
      this.setState({userData:this.props})
    }
  }

  // toggleActive = () => {
  //   const {active} = this.state.userData.active

  //   this.setState(pr)

  //   console.log(active)

   
  // }
  toggleActive = () => {
    this.setState({
      userData: {
            ...this.state.userData,
            active: !this.state.userData.active
      }
  })
    this.props.toggleActive(this.state.userData);
};

  render() {
  
    const {
      picture,
      name,
      fathersLastName,
      mothersLastName,
      email,
      roleId,
      active
    } = this.props;
    const isActive = this.state.userData.active ? <ToggleOn /> : <ToggleOff />;

    return (
      <tr className="user-row">
        <td>
          <Points />
        </td>
        <td>
          <img className="user-picture" src={picture} alt="" />
        </td>
        <td>{name}</td>
        <td>{fathersLastName}</td>
        <td>{mothersLastName}</td>
        <td>{email}</td>
        <td>{roleId}</td>
        <td onClick={this.toggleActive}>{isActive}</td>
      </tr>
    );
  }
}
export default User;
