import React from 'react';
import { connect } from 'react-redux';

import { Button } from "components/avl-components/components"
import { useTheme } from "components/avl-components/wrappers/with-theme"

import { dismissSystemMessage } from './reducer';

const Message = ({ message, top, type, show, dismiss, confirm = null }) => {
  const theme = useTheme();
  return (
    <div className={ `bg-white system-message rounded ${ show }` }
      style={ { top: `${ top }rem` } }>
      <div className={ `
          bg-opacity-25 ${ theme[`bg${ type }`] }
          rounded px-6 py-2 text-large
        ` }>
        <div className="flex justify-center">
          <span className="mr-4">{ message }</span>
          <Button onClick={ dismiss } buttonTheme="buttonSmallPrimary">
            dismiss
          </Button>
          { !confirm ? null :
            <span className="ml-2">
              <Button onClick={ confirm } buttonTheme="buttonSmallSuccess">
                confirm
              </Button>
            </span>
          }
        </div>
      </div>
    </div>
  )
}

class SystemMessage extends React.Component {
	state = { show: "init" }
  timeout = null
	componentDidMount() {
		setTimeout(this.setState.bind(this), 250, { show: "show" });
		if (this.props.duration) {
			this.timeout = setTimeout(this.dismiss.bind(this), this.props.duration);
		}
	}
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
	dismiss() {
		this.setState({ show: "hide" });
		setTimeout(this.props.dismissSystemMessage, 500, this.props.id);
		setTimeout(this.props.onDismiss, 500);
	}
	render() {
		return (
      <Message { ...this.props } { ...this.state }
        dismiss={ e => this.dismiss(e) }/>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = {
  dismissSystemMessage
};

const ConnectedSystemMessage = connect(mapStateToProps, mapDispatchToProps)(SystemMessage);
export { ConnectedSystemMessage as SystemMessage };

class ConfirmMessage extends SystemMessage {
	dismiss() {
		this.setState({ show: "hide" });
		setTimeout(this.props.dismissSystemMessage, 500, this.props.id);
		setTimeout(this.props.onDismiss, 500);
	}
	confirm() {
		this.setState({ show: "hide" });
		setTimeout(this.props.dismissSystemMessage, 500, this.props.id);
		setTimeout(this.props.onConfirm, 500);
	}
	render() {
		return (
      <Message { ...this.props } { ...this.state }
        dismiss={ e => this.dismiss(e) }
        confirm={ e => this.confirm(e) }/>
		)
	}
}

const ConnectedConfirmMessage = connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage);
export { ConnectedConfirmMessage as ConfirmMessage };
