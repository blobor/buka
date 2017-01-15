/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { MuiThemeProvider } from 'material-ui/styles'
import { getMuiTheme } from 'app/core/mui-theme'
import { About } from 'app/about'

describe('About', () => {
  it('should renders correctly', () => {
    const muiTheme = getMuiTheme()
    const mockProps = {
      appVersion: '0.0.1'
    }

    const tree = renderer.create(
      <MuiThemeProvider muiTheme={muiTheme}>
        <About {...mockProps} />
      </MuiThemeProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
