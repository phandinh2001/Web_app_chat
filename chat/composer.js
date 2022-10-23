class Composer {
  activeConversation = null;
  container = document.createElement("div");
  form = document.createElement("form");
  input = document.createElement("input");
  btnEmotion = document.createElement("button");

  constructor() {
    this.input.type = "text";
    this.input.placeholder = "Type a message  ...";
    this.btnEmotion.innerHTML = "💖";

    this.container.appendChild(this.form);
    this.form.appendChild(this.input);
    this.form.appendChild(this.btnEmotion);

    this.form.addEventListener("keypress", this.hanldeSendMessage);
    this.btnEmotion.addEventListener("click", this.hanldeSendEmotion);
  }
  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
  };

  hanldeSendMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      //check authention
      /*
    - user is login
    - active conversation not equal null
   */
      if (
        !firebase.auth().currentUser.email ||
        !this.activeConversation ||
        !this.input.value
      ) {
        //Alert
        /*
            ...
        */
        alert("Chọn hội thoại đi cu!");

        return;
      } else {
        //send message
        db.collection("messages").add({
          content: this.input.value,
          sender: firebase.auth().currentUser.email,
          conversationId: this.activeConversation.id,
        });
      }
    }
  };

  hanldeSendEmotion = (event) => {
    event.preventDefault();
    if (!firebase.auth().currentUser.email || !this.activeConversation) {
      alert("Chọn hội thoại đi cu!");
      return;
    } else {
      db.collection("messages").add({
        content: this.btnEmotion.innerHTML,
        sender: firebase.auth().currentUser.email,
        conversationId: this.activeConversation.id,
      });
    }
  };
}

export { Composer };
