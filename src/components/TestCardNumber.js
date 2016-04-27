import React, { Component } from 'react';
import { faintBlack, cyan500 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';

const TEST_CARD_NUMBERS = [
  '01-2167-30-92545'
];

export default class TestCardNumber extends Component {

  constructor() {
    super();

    this.state = {
      cardNumber: ''
    };
  }

  renredCardNumbers() {
    return TEST_CARD_NUMBERS.map((number, index) => <MenuItem key={index} value={number} primaryText={number} />);
  }

  render() {
    return (
        <IconMenu
          className='buka-cardnumber__help'
          iconButtonElement={<IconButton><ActionHelpOutline color={faintBlack} hoverColor={cyan500} /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          {this.renredCardNumbers()}
        </IconMenu>
    );
  }
}