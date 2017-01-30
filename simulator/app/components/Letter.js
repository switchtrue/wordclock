// @flow
import React, { Component } from 'react';
import styles from './Letter.css';


export default class Letter extends Component {
  render() {
    // Ensure that the letters are always at least a bit visible.
    const r = this.props.color[0] > 40 ? this.props.color[0] : 40;
    const g = this.props.color[1] > 40 ? this.props.color[1] : 40;
    const b = this.props.color[2] > 40 ? this.props.color[2] : 40;

    const inlineStyles = {
      color: `rgb(${r}, ${g}, ${b})`,
      textShadow: `rgb(${r}, ${g}, ${b}) 0 0 20px`
    }

    let displayValue;
    if (this.props.mode === 'LETTER') {
      displayValue = this.props.letter;
    } else if (this.props.mode === 'IDX') {
      displayValue = this.props.idx;
    }

    return (
      <div className={styles.letterContainer} style={inlineStyles}>
        {displayValue}
      </div>
    );
  }
}
