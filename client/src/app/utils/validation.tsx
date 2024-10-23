export const validateSignup = (signupValues: {
  email: string;
  password: string;
  name: string;
  phone: string;
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

  // Name validation
  if (!signupValues.name) {
    errors = { ...errors, name: "Name is required" };
  } else if (signupValues.name.length > 20) {
    errors = { ...errors, name: "Name must be 20 characters or less" };
  }

  // Phone validation
  if (!signupValues.phone) {
    errors = { ...errors, phone: "Phone is required" };
  } else if (!/^\d+$/.test(signupValues.phone)) {
    errors = { ...errors, phone: "Phone number must contain only numbers" };
  }

  // Address validation
  if (!signupValues.address) {
    errors = { ...errors, address: "Address is required" };
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
