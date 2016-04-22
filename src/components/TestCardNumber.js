import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import { faintBlack, cyan500 } from 'material-ui/styles/colors';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';

const TEST_CARD_NUMBER = '01-2167-30-92545';

export default class TestCardNumber extends Component {

  constructor() {
    super();

    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div className='buka-cardnumber__help'>
        <ActionHelpOutline
          onClick={this.handleTouchTap}
          color={faintBlack}
          hoverColor={cyan500} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}>
          <p>{`Test card number: ${TEST_CARD_NUMBER}`}</p>
        </Popover>
      </div>);
  }
}