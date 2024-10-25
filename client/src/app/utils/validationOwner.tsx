export const validateSignup = (signupValues: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
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

  // Firstame validation
  if (!signupValues.firstname) {
    errors = { ...errors, firstname: "Name is required" };
  } else if (signupValues.firstname.length > 20) {
    errors = { ...errors, firstname: "Name must be 20 characters or less" };
  }


  // Address validation
  if (!signupValues.address) {
    errors = { ...errors, address: "Address is required" };
  }

  // Birthdate valitadion
  if (!signupValues.birthdate) {
    errors = { ...errors, birthdate: "Birthdate is required" };
  }

  // Lastname validation
  if (!signupValues.lastname) {
    errors = { ...errors, lastname: "Lastname is required" };
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
