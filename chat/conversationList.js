import { CreateConversationForm } from "../chat/creatConversationForm.js";
import { ConversationIem } from "./conversationItem.js";
class ConversationList {
  container = document.createElement("div");
  btnCreatConversation = document.createElement("button");
  createConversationForm = new CreateConversationForm();
  onConversationItemClick;
  conversations = [];

  constructor() {
    this.btnCreatConversation.innerHTML = "+ Create Conversation Form";
    this.btnCreatConversation.addEventListener("click", this.handleVisible);
    this.container.appendChild(this.btnCreatConversation);
    this.container.appendChild(this.createConversationForm.container);
  }
  setOnConversationItemClick = (listener) => {
    this.onConversationItemClick = listener;
  };

  handleCreateConversationAdded = (id, name, users) => {
    const conversation = new ConversationIem(id, name, users);
    conversation.setOnclickItem((id, name, users) => {
      this.onConversationItemClick({
        id: id,
        name: name,
        users: users,
      });
    });
    this.conversations.push(conversation);
    this.container.appendChild(conversation.container);
  };

  setStyleAvtiveConversation = (conversation) => {
    this.conversations.forEach((item) => {
      if (item.id === conversation.id) {
        item.setActiveHighlight(true);
      } else {
        item.setActiveHighlight(false);
      }
    });
  };

  removerItem = (id) => {
    //Update array
    const index = this.conversations.findIndex((item) => item.id === id);
    const conversation = this.conversations.find((item) => item.id === id);
    this.conversations.splice(index, 1);
    //update ui
    conversation.container.remove();
  };

  handleVisible = () => {
    this.createConversationForm.container.style = "visible";
  };
  handleConversationUpdate = (id, name, users) => {
    this.conversations.forEach((conversation) => {
      if (conversation.id === id) {
        conversation.setUsers(users);
      }
    });
  };
}
export { ConversationList };
