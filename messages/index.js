import React from 'react';
import { connect } from 'react-redux';

import {
	SystemMessage,
	ConfirmMessage
} from "./SystemMessage"

import "./messages.css"

const SystemMessages = ({ messages }) =>
	!messages.length ? null :
	<div className="system-message-container">
		{
			messages.map((message, i) =>
				message.onConfirm ?
					<ConfirmMessage key={ message.id } top={ i * 3 } { ...message }/> :
					<SystemMessage key={ message.id } top={ i * 3 } { ...message }/>
			)
		}
	</div>

const mapStateToProps = state => ({
  messages: state.messages
})
export default connect(mapStateToProps, null)(SystemMessages);
