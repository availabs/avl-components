import { connect } from "react-redux"
import { reduxFalcor } from "utils/redux-falcor"

export default (Component, options = {}) => {
  const {
    mapStateToProps = () => ({}),
    mapDispatchToProps = null
  } = options;
  const mS2P = (state, props) => ({
    ...mapStateToProps(state, props),
    falcorCache: state.falcorCache
  })
  return connect(mapStateToProps, mapDispatchToProps)(reduxFalcor(Component));
}
