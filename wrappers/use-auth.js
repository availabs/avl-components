import React from "react"

import { connect } from "react-redux"

const FAKE_USER = {
  groups: [],
  authLevel: 5,
  authed: false,
  id: "fake-user-id"
}

export default Component => {
  const mapStateToProps = state => ({ user: { ...FAKE_USER } })
  return connect(mapStateToProps, null)(Component);
}
