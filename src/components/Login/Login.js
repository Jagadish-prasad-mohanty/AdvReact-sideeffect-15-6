import React, { useReducer, useState, useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import ContextProvider from '../../store/ContextProvider';

const emailReducer= (state,action) =>{
  
  if (action.type==="USER_INPUT"){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if (action.type==="INPUT_BLUR"){
    return {value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
}

const passwordReducer =(state,action) =>{
  if (action.type=== 'PASS_INPUT'){
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if (action.type=== 'INPUT_BLUR'){
    return {value:state.value,isValid:state.value.trim().length>6}
  }
  return {value:'',isValid:false}
}
const Login = () => {
  const emailRef=useRef();
  const passwordRef=useRef();

  const ctx=useContext(ContextProvider)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmailState]= useReducer(emailReducer,{value:'',isValid:null})

  const [passwordState,dispatchPasswordState]=useReducer(passwordReducer,{value:'',isValid:null})


  const {isValid:emailIsValid}=emailState
  const {isValid:passwordIsValid}=passwordState
  useEffect(()=>{
    const timmer=setTimeout(() => {
      console.log("checked validity");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500); 

    return ()=>{
      clearTimeout(timmer);
      console.log("CLICKED");
    }
  }, [emailIsValid,passwordIsValid] )

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmailState({type:'USER_INPUT',val:event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({type:'PASS_INPUT',val:event.target.value})
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length> 6
    // )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));  
    dispatchEmailState({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({type:"INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid)
      ctx.onLogin(emailState.value, passwordState.value);
    else if(!emailIsValid){
      emailRef.current.focus();
    }
    else
      passwordRef.current.focus();
  };

  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
        ref={emailRef}
            isValid={passwordState.isValid}
            type="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
          ref={passwordRef}
            isValid={passwordState.isValid}
            type="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
