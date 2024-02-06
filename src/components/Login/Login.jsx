import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import AuthContext from "../../Store/AuthContex";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  // if (action.type === "USER_INPUT") {
  //   return { value: action.val, isValid: action.val.includes("@") };
  // }
  // if (action.type === "INPUT_BLUR") {
  //   return { value: state.value, isValid: state.value.includes("@") };
  // }
  // return { value: "", isValid: false };
  switch (action.type) {
    case "USER-INPUT": {
      return { ...state, value: action.val };
    }
    case "INPUT-BLUR": {
      return {
        ...state,
        isValid: state.value.includes("@"),
      };
    }
    default:
      return { value: "", isValid: false };
  }
};

const passReducer = (state, action) => {
  // if (action.type === "USER_INPUT") {
  //   return { value: action.val, isValid: action.val.trim().length > 6 };
  // }
  // if (action.type === "INPUT_BLUR") {
  //   return { value: state.value, isValid: state.value.trim().length > 6 };
  // }
  // return { value: "", isValid: false };
  switch (action.type) {
    case "USER-INPUT": {
      return {
        ...state,
        value: action.val,
        isValid: action.val.trim().length > 6,
      };
    }
    case "INPUT-BLUR": {
      return {
        ...state,
        vlaue: state.value,
        isValid: state.value.trim().length > 6,
      };
    }
    default:
      return { value: "", isValid: false };
  }
};

const Login = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [emailState, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passState, dispachPass] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailState.isValid && passState.isValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailState.value, passState.value]);

  const emailChangeHandler = (event) => {
    dispachEmail({ type: "USER-INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispachPass({ type: "USER-INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispachEmail({ type: "INPUT-BLUR" });
  };

  const validatePasswordHandler = () => {
    dispachPass({ type: "INPUT-BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.action}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
