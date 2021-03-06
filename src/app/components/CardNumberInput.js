import React, { Component } from 'react'
import times from 'lodash.times'
import isNil from 'lodash.isnil'
import omit from 'lodash.omit'
import InputMask from 'inputmask-core'
import TextField from 'material-ui/TextField'

const ENTER_KEY = 'Enter'
const BACKSPACE_KEY = 'Backspace'
const KEYCODE_Y = 89
const KEYCODE_Z = 90
const PATTERN = '11-1111-11-11111##'
const OPTIONAL_CHAR = '#'

class CardNumberInput extends Component {
  constructor () {
    super()

    this.state = {
      text: ''
    }

    this.mask = null
    this.minLength = 0
    this.maxLength = Number.MAX_SAFE_INTEGER
    this.handlePaste = this.handlePaste.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBeforeInput = this.handleBeforeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    const selection = this.props.value ? this.props.value.length : 0
    const options = {
      pattern: PATTERN,
      placeholderChar: ' ',
      value: this.props.value,
      selection: {
        start: selection,
        end: selection
      },
      formatCharacters: {
        [OPTIONAL_CHAR]: {
          validate: char => isNil(char) || /[\s\d]/.test(char)
        }
      }
    }
    this.mask = new InputMask(options)
    this.minLength = this.mask.pattern.pattern.filter(char => char !== OPTIONAL_CHAR).length
    this.maxLength = this.mask.pattern.pattern.length

    const value = getDisplayMaskValue(this.mask)
    this.setState({
      text: value
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.text !== nextProps.value) {
      const selection = nextProps.value ? nextProps.value.length : 0

      this.mask.setValue(nextProps.value)
      this.mask.setSelection({
        start: selection,
        end: selection
      })

      const value = getDisplayMaskValue(this.mask)
      this.setState({
        text: value
      })
    }
  }

  getErrorText () {
    return this.props.isValid ? null : ' '
  }

  handleChange (event) {
    const maskValue = getDisplayMaskValue(this.mask)
    const elementValue = event.target.value

    if (elementValue !== maskValue) {
      const sizeDiff = Math.abs(maskValue.length - elementValue.length)

      // Cut, delete operations will have shortened the value
      // or if browser don't support 'KeyboardEvent.key' property
      if (elementValue.length < maskValue.length) {
        updateMaskSelection(this.mask, event.target)
        this.mask.selection.end = this.mask.selection.start + sizeDiff
        this.mask.backspace()
      // in case browser don't support 'beforeInput' event
      } else if (elementValue.length > maskValue.length) {
        times(sizeDiff, i => {
          this.mask.input(elementValue[elementValue.length - sizeDiff - i])
        })
      }

      const value = getDisplayMaskValue(this.mask)
      this.setState({
        text: value
      }, () => triggerOnchange(this.state, this.props))
    }
  }

  handlePaste (event) {
    event.preventDefault()

    updateMaskSelection(this.mask, event.target)
    let pastedValue = getTextFromClipboardData(event)

    if (this.mask.paste(pastedValue)) {
      const value = getDisplayMaskValue(this.mask)
      this.setState({
        text: value
      }, () => triggerOnchange(this.state, this.props))
    }
  }

  handleKeyDown (event) {
    if (isUndoEvent(event)) {
      event.preventDefault()

      if (this.mask.undo()) {
        const value = getDisplayMaskValue(this.mask)
        this.setState({
          text: value
        }, () => triggerOnchange(this.state, this.props))
      }
      return
    } else if (isRedoEvent(event)) {
      event.preventDefault()

      if (this.mask.redo()) {
        const value = getDisplayMaskValue(this.mask)
        this.setState({
          text: value
        }, () => triggerOnchange(this.state, this.props))
      }
      return
    }

    if (event.key === BACKSPACE_KEY) {
      event.preventDefault()

      updateMaskSelection(this.mask, event.target)
      if (this.mask.backspace()) {
        const value = getDisplayMaskValue(this.mask)
        this.setState({
          text: value
        }, () => triggerOnchange(this.state, this.props))
      }
    }
  }

  handleBeforeInput (event) {
    if (event.metaKey || event.altKey || event.ctrlKey || event.key === ENTER_KEY) {
      return
    }

    event.preventDefault()

    updateMaskSelection(this.mask, event.target)
    if (this.mask.input(event.data)) {
      const value = getDisplayMaskValue(this.mask)
      this.setState({
        text: value
      }, () => {
        this.refs.textField.input.selectionStart = this.mask.selection.start
        this.refs.textField.input.selectionEnd = this.mask.selection.end
        triggerOnchange(this.state, this.props)
      })
    }
  }

  render () {
    const fieldProps = omit(this.props, 'isValid')

    return <TextField type='text'
      {...fieldProps}
      ref='textField'
      floatingLabelText='Card Number'
      hintText={PATTERN.replace(/[1#]/g, 'X')}
      size={this.mask.pattern.length}
      maxLength={this.mask.pattern.length}
      onChange={this.handleChange}
      onPaste={this.handlePaste}
      onKeyDown={this.handleKeyDown}
      onBeforeInput={this.handleBeforeInput}
      errorText={this.getErrorText()}
      value={this.state.text} />
  }
}

CardNumberInput.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
}

function getDisplayMaskValue (mask) {
  if (!mask.value.includes(mask.pattern.placeholderChar)) {
    return mask.getValue()
  }

  return mask
    .getValue()
    .slice(0, mask.selection.end)
}

function triggerOnchange (state, props) {
  if (props.onChange) {
    props.onChange({
      text: state.text
    })
  }
}

function isUndoEvent (event) {
  return (event.ctrlKey || event.metaKey) && event.keyCode === (event.shiftKey ? KEYCODE_Y : KEYCODE_Z)
}

function isRedoEvent (event) {
  return (event.ctrlKey || event.metaKey) && event.keyCode === (event.shiftKey ? KEYCODE_Z : KEYCODE_Y)
}

function getTextFromClipboardData (event) {
  let result

  // IE
  if (window.clipboardData) {
    result = window.clipboardData.getData('Text')
  } else {
    result = (event.originalEvent || event).clipboardData.getData('text/plain')
  }

  return result
}

function updateMaskSelection (mask, element) {
  mask.selection = {
    start: element.selectionStart,
    end: element.selectionEnd
  }
}

export default CardNumberInput
