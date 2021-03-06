import React, { Component } from "react";
import UserTable from "./UserTable";
import UserData from "../../assets/users.json";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import UsersMain from "./UsersMain";
import UserCards from "./UserCards";
import Modal from "../../Ui/Modal";
import "./Users.css";
import { Pagination } from "./Pagination/Pagination";
import { FilterSection } from "./FilterSection";
import { ReactComponent as Square } from "../../assets/svg/square.svg";
import { ReactComponent as List } from "../../assets/svg/list.svg";

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function compareNeg(a, b) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

class Users extends Component {
  mappedUsers = UserData.users.map(user => {
    return user;
  });

  state = {
    viewMode: "cards",
    searchTerm: "",
    users: this.mappedUsers,
    filteredUsers: this.mappedUsers,

    activeCategory: "",
    currentPage: 1,
    usersPerPage: 8
  };

  // ========================================================
  // Methods
  // =======================================================

  handleInputChange = e => {
    this.setState({ searchTerm: e.target.value });
    this.filterUsers(e.target.value);
  };

  handleViewChange = mode => {
    this.setState({ viewMode: mode });
  };

  /*=================Filtering and Sorting =================== */
  sortAscending = () => {
    const filteredUsers = this.state.filteredUsers;
    filteredUsers.sort(compare);
    this.setState({ filteredUsers: filteredUsers });
  };
  sortDescending = () => {
    const filteredUsers = this.state.filteredUsers;
    filteredUsers.sort(compareNeg);
    this.setState({ filteredUsers: filteredUsers });
  };

  showAll = () => {
    this.setState({ filteredUsers: this.state.users });
  };

  filterUsers = searchTerm => {
    const filteredUsers = this.state.users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    this.setState({ filteredUsers: filteredUsers });
  };

  includesCategory = category => {
    const filteredByCategory = this.state.users.filter(user => {
      const categoryNum = parseInt(category, 10);
      return user.roleId === categoryNum;
    });
    this.setState({ filteredUsers: filteredByCategory });
  };

  handleRoleChange = e => {
    this.includesCategory(e.target.value);
  };

  /*=================Pagination=================== */

  paginate = pageNumber => {
    const pageNum = parseInt(pageNumber, 10);

    this.setState({ currentPage: pageNum });
  };

  handleUserCount = e => {
    const userCount = parseInt(e.target.value, 10);
    this.setState({ usersPerPage: userCount });
  };

  /*=================CRUD=================== */

  submitForm = userData => {
    this.setState({ filteredUsers: [...this.state.filteredUsers, userData] });
  };

  editUserSubmit = user => {
    const filteredUsers = this.state.filteredUsers;
    console.log(filteredUsers[user.id])
    filteredUsers[user.id] = user;
    this.setState({ filteredUsers: filteredUsers });
  };

  deleteUser = user => {
    console.log("Deleting" + user);
    const users = this.state.filteredUsers.filter(u => u.email !== user);
    this.setState({ filteredUsers: users });
  };

  toggleActive = user => {
    const filteredUsers = this.state.filteredUsers;
    console.log(filteredUsers[user.id] )
    filteredUsers[user.id] = user;  // User that will be Edited
    this.setState({ filteredUsers: filteredUsers });
 }

  render() {
    const indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const useresfiltrados = this.state.filteredUsers;
    const filteredUsers = useresfiltrados.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

    /*=================View Mode=================== */

    const checkViewMode = () => {
      if (this.state.viewMode === "cards") {
        return (
          <UserCards
            deleteUser={this.deleteUser}
            openModal={this.openModal}
            filteredUsers={filteredUsers}
            editUserSubmit={this.editUserSubmit}
          />
        );
      } else {
        return <UserTable filteredUsers={filteredUsers}      toggleActive={this.toggleActive} />;
      }
    };

    return (
      /*=================Modal=================== */

      <div>
        {this.state.modalOpen ? (
          <div>
            <Modal submitForm={this.submitForm} openModal={this.openModal} />
            <Backdrop click={this.openModal} />
          </div>
        ) : null}
        <UsersMain
          deleteUser={this.deleteUser}
          openModal={this.openModal}
          filteredUsers={filteredUsers}
          submitForm={this.submitForm}
          editUserSubmit={this.editUserSubmit}
        />

        {/*=================Filters and Sorting=================== */}

        <div className="filter-bar">
          <div className="filter-bar-left">
            <input
              onChange={this.handleInputChange}
              className="filter-input search-input"
              type="text"
              placeholder="Búsqueda"
            />

            <form value={this.state.activeCategory} defaultValue="Hey">
              <select
                onChange={this.handleRoleChange}
                className="filter-input"
                value={this.state.activeCategory}
                name=""
                id=""
              >
                <option value={1}>Owner</option>
                <option value={2}>Admin</option>
                <option value={3}>Staff</option>
              </select>
            </form>

            <form value={this.state.usersPerPage} defaultValue="Hey">
              <select
                onChange={this.handleUserCount}
                className="filter-input"
                value={this.state.usersPerPage}
                name=""
                id=""
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
            </form>
            <div onClick={this.sortAscending} className="filter-input">
              Ordenar de A-Z
            </div>
            <div onClick={this.sortDescending} className="filter-input">
              Ordenar de Z-A
            </div>
          </div>

          {/*=================View Mode =================== */}
          <div className="filter-bar-right">
            <span>
              <div className="view-mode-icon">
                <List onClick={() => this.handleViewChange("table")} />
              </div>
              <div className="view-mode-icon">
                <Square onClick={() => this.handleViewChange("cards")} />
              </div>
            </span>
          </div>
        </div>
        {checkViewMode()}

        {/*=================Pagination=================== */}

        <Pagination
          currentPage={this.state.currentPage}
          paginate={this.paginate}
          usersPerPage={this.state.usersPerPage}
          totalUsers={this.state.filteredUsers.length}
        />
      </div>
    );
  }
}

export default Users;
