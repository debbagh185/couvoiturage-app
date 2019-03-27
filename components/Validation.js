const validation = {
    email: {
      presence: true,
      email: {
        message: 'Please enter a valid email address'
      }
    },
    
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: 'Your password must be at least 6 characters'
      }
    }
  }
  
  export default validation;