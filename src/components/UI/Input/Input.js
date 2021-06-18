import React from 'react';
import classes from './Input.module.css';

function Input(props) {
    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.type}>{props.type.replace(/\b\w/g,l=>l.toUpperCase())}</label>
            <input
            className={classes.input}
            type={props.type}
            id={props.type}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            />

        </div>
    )
}

export default Input
