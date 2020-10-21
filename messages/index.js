import React from 'react';
import { connect } from 'react-redux';

import { dismissSystemMessage } from './reducer';

import {
	SystemMessage,
	ConfirmMessage
} from "./SystemMessage"

import "./messages.css"

const SystemMessages = ({ messages, dismissSystemMessage }) =>
	!messages.length ? null :
	<div className="system-message-container">
		{
			messages.map((message, i) =>
				message.onConfirm ?
					<ConfirmMessage key={ message.id } top={ i * 3 } { ...message }
						dismissSystemMessage={ dismissSystemMessage }/> :
					<SystemMessage key={ message.id } top={ i * 3 } { ...message }
						dismissSystemMessage={ dismissSystemMessage }/>
			)
		}
	</div>

const mapStateToProps = state => ({
  messages: state.messages
})
export default connect(mapStateToProps, { dismissSystemMessage })(SystemMessages);
