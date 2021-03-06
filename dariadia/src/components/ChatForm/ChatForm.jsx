import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

export class ChatForm extends Component {
  state = {
    chatName: "",
  };

  static propTypes = {
    onSend: PropTypes.func.isRequired,
  };

  handleInputChange = (event) => {
    this.setState({
      chatName: event.target.value,
    });
  };

  handleAddChat = () => {
    const { onSend } = this.props;

    if (typeof onSend === "function") {
      onSend(this.state);

      this.setState({ chatName: "" });
    }
  };

  handleEnterCtrlDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.handleAddChat();
    }
  };

  render() {
    const { chatName } = this.state;

    return (
      <>
        <FormControl>
          <InputLabel htmlFor="my-input">chat name</InputLabel>
          <Input
            id="my-input"
            value={chatName}
            aria-describedby="my-helper-text"
            onChange={this.handleInputChange}
            onKeyDown={this.handleEnterCtrlDown}
          />
          <FormHelperText id="my-helper-text">
            Please enter a new chat name
          </FormHelperText>
        </FormControl>
        <Fab variant="round" color="primary" onClick={this.handleAddChat}>
          <SendIcon />
        </Fab>
      </>
    );
  }
}
