

function passwordValidating(password: string) {

    const minNumberofChars = 6;
    const maxNumberofChars = 16;
    const regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (password.length < minNumberofChars || password.length > maxNumberofChars){
        return false;
    }
    if (!regularExpression.test(password)) {
        alert("password should contain atleast one number and one special character");
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


export function creadentialValidating(email: string, password: string) {

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
