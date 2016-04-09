import React from 'react';
import InputMask from 'inputmask-core';

class CardNumberInput extends React.Component {
  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let options = {
      pattern: '11-1111-11-11111',
      placeholderChar: ' '
    }

    this.mask = new InputMask(options);
  }

  handleChange(event) {
    let value = event.target.value;

    if (this.props.update) {
      this.props.update(value);
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Backspace') {
      event.preventDefault();

      this.mask.selection = getElementSelection(event.target);
      if (this.mask.backspace()) {
        event.target.value = getDisplayMaskValue(this.mask);
      }
    }
  }

  handleKeyPress(event) {
    event.preventDefault();

    this.mask.selection = getElementSelection(event.target);
    if (this.mask.input(event.key)) {
      event.target.value = getDisplayMaskValue(this.mask);
    }
  }

  render() {
    return <input type="text"
      size={this.mask.pattern.length}
      maxLength={this.mask.pattern.length}
      onKeyDown={this.handleKeyDown}
      onKeyPress={this.handleKeyPress}
      onChange={this.handleChange} />
  }
}

CardNumberInput.propTypes = {
  update: React.PropTypes.func
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

export default CardNumberInput;