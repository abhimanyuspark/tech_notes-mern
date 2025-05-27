export const validation = (data) => {
  const errors = {};

  // Check if email is provided and valid
  // if (data.hasOwnProperty("email")) {
  //   if (!data.email.trim()) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Email is invalid";
  //   }
  // }

  // Check if title is provided
  if (data.hasOwnProperty("title")) {
    if (!data.title.trim()) {
      errors.title = "Title is required";
    }
  }

  // Check if text is provided
  if (data.hasOwnProperty("text")) {
    if (!data.text.trim()) {
      errors.text = "Text is required";
    }
  }

  // Check if user name is provided
  if (data.hasOwnProperty("username")) {
    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (/^[A-z]{3,20}$/.test(data.username)) {
      errors.username = "Username must contain at least one letter, one number";
    }
  }

  // Check if password is provided and meets length criteria
  if (data.hasOwnProperty("password")) {
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8 || data.password.length > 10) {
      errors.password = "Password must be between 8 to 10 characters long";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%]{8,10}$/.test(data.password)
    ) {
      errors.password = "Password must contain at least one letter, one number";
    }
  }

  if (data.hasOwnProperty("roles")) {
    if (data.roles.length === 0) {
      errors.roles = "Roles are required";
    }
  }

  return errors;
};
