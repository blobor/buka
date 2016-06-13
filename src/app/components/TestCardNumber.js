import React from 'react'
import { faintBlack, cyan500 } from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton/IconButton'
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline'

const TEST_CARD_NUMBERS = [
  '01-2167-30-92545',
  '26-2167-19-35623',
  '29-2167-26-31433'
]

const renredCardNumbers = () => {
  return TEST_CARD_NUMBERS
    .map((number, index) => <MenuItem key={index} value={number} primaryText={number} />)
}

const TestCardNumber = ({ onChange }) => {
  return (
    <IconMenu
      className='buka-cardnumber__help'
      onChange={onChange}
      iconButtonElement={<IconButton><ActionHelpOutline color={faintBlack} hoverColor={cyan500} /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        {renredCardNumbers()}
    </IconMenu>
  )
}

export default TestCardNumber
