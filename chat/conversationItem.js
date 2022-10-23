class ConversationIem {
  id;
  name;
  users;
  container = document.createElement("div");
  txtName = document.createElement("div");
  txtNoOfUsers = document.createElement("div");
  constructor(id, name, users) {
    this.id = id;
    this.name = name;
    this.users = users;

    this.txtName.innerHTML = name;
    this.txtName.classList.add("txtName_conversation");
    this.txtNoOfUsers.innerHTML = `Number of users in the conversation: ${users.length}`;
    this.txtNoOfUsers.classList.add("txtNoOfUsers_conversation");

    this.container.appendChild(this.txtName);
    this.container.append(this.txtNoOfUsers);
    this.container.classList.add("container-Conversationitem");
  }
  setOnclickItem = (listener) => {
    this.container.onclick = () => {
      listener(this.id, this.name, this.users);
    };
  };

  setUsers = (users) => {
    this.users = users;
    this.txtNoOfUsers.innerHTML = `(${users.length})`;
  };
  setActiveHighlight = (isHightLight) => {
    if (isHightLight) {
      this.container.style.background = "#ccc";
      this.container.style.color = "#fff";
    } else {
      this.container.style.background = "#fff";
      this.container.style.color = "#000";
    }
  };
}
export { ConversationIem };
