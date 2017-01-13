/* eslint-env jest */

import React from 'react'
import moment from 'moment'
import renderer from 'react-test-renderer'
import { MuiThemeProvider } from 'material-ui/styles'
import { getMuiTheme } from '../../src/app/core/mui-theme'
import SkipassGridList from '../../src/app/skipasses/SkipassGridList.component'

jest.mock('../../src/app/helpers/date', () => ({
  getAdoptedDateString: date => date.toISOString()
}))

describe('SkipassGridList', () => {
  it('should renders correctly', () => {
    const skipasses = [{
      ticketNumber: '01-1614 7133 5345 3531 0476-4',
      name: '5 днів СЕЗОН (ВСЕF)',
      purchaseDate: moment.utc('2015-03-09').toDate(),
      cardNumber: '01-2167-30-92545',
      lifts: [],
      isUnUsed: false,
      balance: 0,
      syncDate: moment.utc('2017-01-09').toDate(),
      updateDate: moment.utc('2017-01-09').toDate()
    }, {
      ticketNumber: '26-1614 7097 9217 9800 3595-2',
      name: '1 День (ДОР)',
      purchaseDate: moment.utc('2011-01-30').toDate(),
      cardNumber: '26-2167-19-35623',
      lifts: [],
      isUnUsed: false,
      balance: 0,
      syncDate: moment.utc('2017-01-09').toDate(),
      updateDate: moment.utc('2017-01-09').toDate()
    }]
    const onRemoveSkipass = jest.fn()
    const muiTheme = getMuiTheme()

    const tree = renderer.create(
      <MuiThemeProvider muiTheme={muiTheme}>
        <SkipassGridList skipasses={skipasses} onRemoveSkipass={onRemoveSkipass} />
      </MuiThemeProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
