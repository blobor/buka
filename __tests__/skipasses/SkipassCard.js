import React from 'react'
import renderer from 'react-test-renderer'
import { MuiThemeProvider } from 'material-ui/styles'
import { getMuiTheme } from '../../src/app/core/mui-theme'
import SkipassCard from '../../src/app/skipasses/SkipassCard.component'

describe('SkipassCard', () => {
  it('should renders correctly', () => {
    const skipass = {
      cardNumber: '01-2167-30-92545',
      ticketNumber: '01-1614 7133 5345 3531 0476-4',
      name: '5 днів СЕЗОН (ВСЕF)',
      purchaseDate: new Date('2015-03-09'),
      lifts: [],
      isUnUsed: false,
      balance: 0,
      syncDate: new Date('2017-01-09'),
      updateDate: new Date('2017-01-09')
    }
    const onRemoveSkipass = jest.fn()
    const muiTheme = getMuiTheme()

    const tree = renderer.create(
      <MuiThemeProvider muiTheme={muiTheme}>
        <SkipassCard skipass={skipass} onRemoveSkipass={onRemoveSkipass} />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })
})