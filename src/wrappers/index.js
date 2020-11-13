import withTheme from "./with-theme"
import withAuth from "./with-auth"
import connect from "./connect"
import reduxFalcor from "./redux-falcor"
import withRouter from "./with-router"
import showLoading from "./show-loading"
import shareProps from "./share-props"

export default {
  "with-theme": withTheme,
  "with-auth": withAuth,
  connect,
  "redux-falcor": reduxFalcor,
  "with-router": withRouter,
  "show-loading": showLoading,
  "share-props": shareProps
}
export {
  withTheme,
  withAuth,
  connect,
  shareProps,
  showLoading
}
