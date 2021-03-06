import { connect } from "react-redux";
import { type Dispatch } from "redux";

import { type State } from "../state/reducers";
import { loadUsers, logout, addUser, deleteUser } from "../state/actions";
import UsersListingComponent from "./UsersListingComponent";

import { type User } from "./models";

const mapStateToProps = (state: State): any => ({
  isAthenticated: state.isAuthenticated,
  account: state.account,
  users: state.users
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  loadUsers: () => dispatch(loadUsers()),
  logout: () => dispatch(logout()),
  addUser: (user: User, errorMessage: string) =>
    dispatch(addUser(user, errorMessage)),
  deleteUser: (userId: number, errorMessage: string) =>
    dispatch(deleteUser(userId, errorMessage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListingComponent);
