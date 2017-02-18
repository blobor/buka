/* eslint-env jest */

import React from 'react'
import moment from 'moment'
import renderer from 'react-test-renderer'
import { MuiThemeProvider } from 'material-ui/styles'
import { getMuiTheme } from 'app/core/mui-theme'
import SkipassCard from 'app/skipasses/SkipassCard.component'

jest.mock('app/helpers/date', () => ({
  getAdoptedDateString: date => date.toISOString()
}))

describe('SkipassCard', () => {
  it('should renders correctly', () => {
    const skipass = {
      ticketNumber: '01-1614 7133 5345 3531 0476-4',
      name: '5 днів СЕЗОН (ВСЕF)',
      purchaseDate: moment.utc('2015-03-09').toDate(),
      cardNumber: '01-2167-30-92545',
      lifts: [],
      isUnUsed: false,
      balance: 0,
      syncDate: moment.utc('2017-01-09').toDate(),
      updateDate: moment.utc('2017-01-09').toDate()
    }
    const onRemoveSkipass = jest.fn()
    const muiTheme = getMuiTheme()

    const tree = renderer.create(
      <MuiThemeProvider muiTheme={muiTheme}>
        <SkipassCard skipass={skipass} onRemoveSkipass={onRemoveSkipass} />
      </MuiThemeProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
