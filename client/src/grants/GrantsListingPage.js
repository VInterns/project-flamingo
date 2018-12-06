import { connect } from "react-redux";
import type { Dispatch } from "redux";

import GrantsListingComponent from "./GrantsListingComponent";
import { logout, loadGrants, selectGrant } from "../actions";
import type { State } from "../reducers";
import type { Grant } from "./models";

const mapStateToProps = (state: State): any => ({
  isAuthenticated: state.isAuthenticated,
  account: state.account,
  grants: state.grants
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  loadGrants: () => dispatch(loadGrants()),
  logout: () => dispatch(logout()),
  selectGrant: (grant: Grant) => dispatch(selectGrant(grant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GrantsListingComponent);
