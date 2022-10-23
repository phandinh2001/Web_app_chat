import { InputCommon } from "../common/inputCommon.js";
import { setScreen } from "../index.js";
import { Login } from "./login.js";
class Register {
  container = document.createElement("div");
  title = document.createElement("h3");
  form = document.createElement("form");

  inputEmail = new InputCommon(
    "Email:",
    "email",
    "Enter your email",
    "inputEmailRegister"
  );

  inputPassword = new InputCommon(
    "Password:",
    "password",
    "Enter your password",
    "inputPasswordRegister"
  );

  inputComfirmPassword = new InputCommon(
    "Confirm Password:",
    "password",
    "Enter your confirm password",
    "inputComfirmPassword"
  );

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Register";
    this.title.classList.add("title_register");

    this.container.appendChild(this.form);

    this.form.appendChild(this.title);
    this.form.classList.add("form_register");
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);
    this.form.appendChild(this.inputComfirmPassword.container);

 

    this.btnRegister.classList.add("btnRegister");
    this.btnLogin.classList.add("btnGotoLogin");
    this.btnLogin.innerHTML = "Go to Login";
    this.btnLogin.addEventListener("click", this.handleRedirectLogin);

    this.btnRegister.innerHTML = "Register";
    this.btnRegister.addEventListener("click", this.handleRegister);

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }

  handleRedirectLogin = () => {
    e.preventDefault();
    const loginScreen = new Login();
    setScreen(loginScreen.container);
  };

  handleRegister = (e) => {
    e.preventDefault();
    // Get value
    const email = this.inputEmail.getValue();
    const password = this.inputPassword.getValue();

    // check email and password is empty
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(`User ${email} is created`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(
          "Bạn chưa nhập đầy đủ thông tin, chưa thể đăng kí tài khoản"
        );
      });
  };
}
export { Register };
