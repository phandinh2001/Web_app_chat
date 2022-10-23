import { InputCommon } from "../common/inputCommon.js";
import { setScreen } from "../index.js";
import { Register } from "./register.js";
class Login {
  container = document.createElement("div");
  title = document.createElement("h3");
  form = document.createElement("form");

  inputEmail = new InputCommon(
    "Email:",
    "email",
    "Enter your email",
    "inputEmail"
  );

  inputPassword = new InputCommon(
    "Password:",
    "password",
    "Enter your password",
    "inputPasswordLogin"
  );

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Login";
    this.title.classList.add("title_login");

    this.container.appendChild(this.form);
    this.container.classList.add("container_Login");

    this.form.appendChild(this.title);
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);
    this.form.classList.add("form_Login");

    this.btnLogin.innerHTML = "Login";
    this.btnLogin.addEventListener("click", this.handleLogin);
    this.btnLogin.classList.add("btnLogin");

    this.btnRegister.innerHTML = "Go to Register";
    this.btnRegister.addEventListener("click", this.handleRedirectRegister);
    this.btnRegister.classList.add("btnGotoRegister");

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }

  handleRedirectRegister = (e) => {
    e.preventDefault();
    const registerScreen = new Register();
    setScreen(registerScreen.container);
  };
  handleLogin = (e) => {
    e.preventDefault();
    //validation
    const emailValue = this.inputEmail.getValue();
    const passwordValue = this.inputPassword.getValue();
    if (!emailValue) {
      this.inputEmail.setErrorMessage("Email cannot be empty");
    } else {
      this.inputEmail.setErrorMessage("");
    }
    //Login
    firebase
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log("Dang nhap thanh cong");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
}
export { Login };
