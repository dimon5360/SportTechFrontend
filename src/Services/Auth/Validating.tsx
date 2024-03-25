

function passwordValidating(password: string) {

    const minNumberOfChars = 6;
    const maxNumberOfChars = 16;
    const regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (password.length < minNumberOfChars || password.length > maxNumberOfChars){
        return false;
    }
    if (!regularExpression.test(password)) {
        alert("password should contain at least one number and one special character");
        return false;
    }
    return true
}

function emailValidating(email: string) {

    const regularExpression = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email.length === 0){
        return false;
    }
    if (!regularExpression.test(email)) {
        alert("email doesn't match to template");
        return false;
    }
    return email.length !== 0
}


export function credentialValidating(email: string, password: string) {

    if (!passwordValidating(password)) {
      alert("Password validating failed")
      return false
    }

    if (!emailValidating(email)) {
      alert("Email validating failed")
      return false
    }
    return true
  }
