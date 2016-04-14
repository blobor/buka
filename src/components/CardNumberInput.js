import React from 'react';
import InputMask from 'inputmask-core';
import TextField from 'material-ui/lib/text-field';

const ENTER_KEY = 'Enter';
const BACKSPACE_KEY = 'Backspace';
const KEYCODE_Y = 89;
const KEYCODE_Z = 90;
const PATTERN = '11-1111-11-11111';

class CardNumberInput extends React.Component {
  constructor() {
    super();

    this.state = {
      isValid: false,
      text: ''
    }

    this.handlePaste = this.handlePaste.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const selection = this.props.value ? this.props.value.length : 0;
    let options = {
      pattern: PATTERN,
      placeholderChar: ' ',
      value: this.props.value,
      selection: {
        start: selection,
        end: selection
      }
    }
    this.mask = new InputMask(options);

    const value = getDisplayMaskValue(this.mask);
    this.setState({
      text: value,
      isValid: isValidValue(value, this.mask)
    }, () => triggerOnchange(this.state, this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const selection = nextProps.value ? nextProps.value.length : 0;

      this.mask.setValue(nextProps.value);
      this.mask.setSelection({
        start: selection,
        end: selection
      })

      const value = getDisplayMaskValue(this.mask);
      this.setState({
        text: value,
        isValid: isValidValue(value, this.mask)
      }, () => triggerOnchange(this.state, this.props));
    }
  }

  handleChange(event) {
    const maskValue = this.mask.getValue()
    const elementValue = event.target.value;
    if (elementValue !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (elementValue.length < maskValue.length) {
        const sizeDiff = maskValue.length - elementValue.length
        this.mask.setSelection(getElementSelection(event.target));
        this.mask.selection.end = this.mask.selection.start + sizeDiff
        this.mask.backspace()
      }
      const value = getDisplayMaskValue(this.mask);
      this.setState({
        text: value,
        isValid: isValidValue(value, this.mask)
      }, () => triggerOnchange(this.state, this.props));
    }
  }

  handlePaste(event) {
    event.preventDefault();

    this.mask.setSelection(getElementSelection(event.target));
    if (this.mask.paste(event.clipboardData.getData('text'))) {
      const value = getDisplayMaskValue(this.mask);
      this.setState({
        text: value,
        isValid: isValidValue(value, this.mask)
      }, () => triggerOnchange(this.state, this.props));
    }
  }

  handleKeyDown(event) {
    if (isUndoEvent(event)) {
      event.preventDefault()
      if (this.mask.undo()) {
        const value = getDisplayMaskValue(this.mask);
        this.setState({
          text: value,
          isValid: isValidValue(value, this.mask)
        }, () => triggerOnchange(this.state, this.props));
      }
      return;
    } else if (isRedoEvent(event)) {
      event.preventDefault()
      if (this.mask.redo()) {
        const value = getDisplayMaskValue(this.mask);
        this.setState({
          text: value,
          isValid: isValidValue(value, this.mask)
        }, () => triggerOnchange(this.state, this.props));
      }
      return;
    }

    if (event.key === BACKSPACE_KEY) {
      event.preventDefault();

      this.mask.setSelection(getElementSelection(event.target));
      if (this.mask.backspace()) {
        const value = getDisplayMaskValue(this.mask);
        this.setState({
          text: value,
          isValid: isValidValue(value, this.mask)
        }, () => triggerOnchange(this.state, this.props));
      }
    }
  }

  handleKeyPress(event) {
    if (event.metaKey || event.altKey || event.ctrlKey || event.key === ENTER_KEY) {
      return
    }

    event.preventDefault();

    this.mask.setSelection(getElementSelection(event.target));
    if (this.mask.input(event.key)) {
      const value = getDisplayMaskValue(this.mask);
      this.setState({
        text: value,
        isValid: isValidValue(value, this.mask)
      }, () => triggerOnchange(this.state, this.props));
    }
  }

  render() {
    return <TextField type="text"
      {...this.props}
      floatingLabelText="Card Number"
      hintText={PATTERN.replace(/1/g, 'X')}
      size={this.mask.pattern.length}
      maxLength={this.mask.pattern.length}
      onChange={this.handleChange}
      onPaste={this.handlePaste}
      onKeyDown={this.handleKeyDown}
      onKeyPress={this.handleKeyPress}
      value={this.state.text} />
  }
}

CardNumberInput.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
}

function getElementSelection(element) {
  return {
    start: element.selectionStart,
    end: element.selectionEnd
  }
}

function getDisplayMaskValue(mask) {
  return mask
    .getValue()
    .slice(0, mask.selection.end);
}

function isValidValue(value, mask) {
  return value &&
    value !== mask.emptyValue &&
    value.length === mask.pattern.length;
}

function triggerOnchange(state, props) {
  if (props.onChange) {
    props.onChange({
      text: state.text,
      isValid: state.isValid
    });
  }
}

function isUndoEvent(event) {
  return (event.ctrlKey || event.metaKey) && event.keyCode === (event.shiftKey ? KEYCODE_Y : KEYCODE_Z);
}

function isRedoEvent(event) {
  return (event.ctrlKey || event.metaKey) && event.keyCode === (event.shiftKey ? KEYCODE_Z : KEYCODE_Y);
}

export default CardNumberInput;