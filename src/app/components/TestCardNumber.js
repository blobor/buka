import React from 'react'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import { NavigationMoreVert } from 'material-ui/svg-icons'

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
      onChange={onChange}
      iconButtonElement={
        <IconButton>
          <NavigationMoreVert />
        </IconButton>
      }
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
      { renredCardNumbers() }
    </IconMenu>
  )
}

export default TestCardNumber
