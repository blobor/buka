import { fullWhite } from 'material-ui/styles/colors'
import { getMuiTheme as getTheme } from 'material-ui/styles'

export const getMuiTheme = userAgent => {
  return getTheme({
    userAgent: userAgent,
    textField: {
      hintColor: '#565656'
    },
    svgIcon: {
      color: fullWhite
    }
  })
}