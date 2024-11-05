export const validateSignup = (signupValues: {
    firstname: string;
    lastname: string;
    birthdate: Date;
    email: string;
    password: string;
    address: string;
    fee: number;
    descripcion: string;
  }) => {
    let errors = {};
  
    // Email validation
    if (!signupValues.email) {
      errors = { ...errors, email: "Email is required" };
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(signupValues.email)
    ) {
      errors = { ...errors, email: "Email is invalid" };
    }
  
    // Password validation
    if (!signupValues.password) {
      errors = { ...errors, password: "Password is required" };
    } else {
      if (signupValues.password.length < 6) {
        errors = {
          ...errors,
          password: "Password must be at least 6 characters",
        };
      }
      if (!/[a-z]/.test(signupValues.password)) {
        errors = {
          ...errors,
          password: "Password must contain at least one lowercase letter",
        };
      }
      if (!/\d/.test(signupValues.password)) {
        errors = {
          ...errors,
          password: "Password must contain at least one number",
        };
      }
    }
  
    // Firstname validation
    if (!signupValues.firstname) {
      errors = { ...errors, firstname: "Name is required" };
    } else if (signupValues.firstname.length > 20) {
      errors = { ...errors, firstname: "Name must be 20 characters or less" };
    }
  
    // Address validation
    if (!signupValues.address) {
      errors = { ...errors, address: "Address is required" };
    }
  
    // Birthdate validation
    if (!signupValues.birthdate) {
      errors = { ...errors, birthdate: "Birthdate is required" };
    }
  
    // Lastname validation
    if (!signupValues.lastname) {
      errors = { ...errors, lastname: "Lastname is required" };
    }
  
    // Fee validation
    if (!signupValues.fee && signupValues.fee !== 0) {
      errors = { ...errors, fee: "Fee is required" };
    } else if (signupValues.fee < 0) {
      errors = { ...errors, fee: "Fee cannot be negative" };
    }
  
    // Descripcion validation
    if (!signupValues.descripcion) {
      errors = { ...errors, descripcion: "Description is required" };
    } else if (signupValues.descripcion.length < 10) {
      errors = { ...errors, descripcion: "Description must be at least 10 characters" };
    }
  
    return errors;
  };
  
  export const validateSignin = (signinValues: {
    email: string;
    password: string;
  }) => {
    let errors = {};
    if (!signinValues.email) {
      errors = { ...errors, email: "Email is required" };
    }
    if (!signinValues.password) {
      errors = { ...errors, password: "Password is required" };
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(signinValues.email)) {
      errors = { ...errors, email: "Email is invalid" };
    }
    if (signinValues.password.length < 6) {
      errors = { ...errors, password: "Password must be at least 6 characters" };
    }
    if (!/[a-z]/.test(signinValues.password)) {
      errors = {
        ...errors,
        password: "Password must contain at least one lowercase letter",
      };
    }
    if (!/\d/.test(signinValues.password)) {
      errors = {
        ...errors,
        password: "Password must contain at least one number",
      };
    }
  
    return errors;
  };
  