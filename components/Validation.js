export const validationLogin = {
  email: {
    presence: true,
    email: {
      message: '^Please enter a valid email address'
    }
  },
    
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters'
    }
  }
}


export const validationSignUp = {
  email: {
    presence: true,
    email: {
      message: '^Please enter a valid email address'
    }
  },
  
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters'
    }
  },

  phone: {
    numericality: {
      onlyInteger: true,
      message: '^Phone Number can contains only numbers'
    },

    length: {
      is: 10,
      message: '^Please enter a valid phone Number'
    }
  }
}