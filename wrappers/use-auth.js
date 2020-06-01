// import React from "react"

import { connect } from "react-redux"

const FAKE_USER = {
  groups: ["AVAIL"],
  authLevel: 5,
  authed: true,
  id: 389
}

export default Component => {
  const defaultProps = Component.defaultProps || {},
    mapStateToProps = (state, props) => ({ user: { ...FAKE_USER }, ...defaultProps, ...props });
  return connect(mapStateToProps, null)(Component);
}
