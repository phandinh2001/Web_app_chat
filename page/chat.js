import { ConversationList } from "../chat/conversationList.js";
import { Conversationinfo } from "../chat/conversationInfo.js";
import { Composer } from "../chat/composer.js";
import { MessageList } from "../chat/messageList.js";
import { UserList } from "../chat/userList.js";
class Chat {
  activeConversation;
  subscribeConversationMessages = null;

  container = document.createElement("div");

  conversationList = new ConversationList();
  conversationInfo = new Conversationinfo();

  conposer = new Composer();
  messageList = new MessageList();
  userList = new UserList();

  constructor() {
    this.container.appendChild(this.conversationList.container);
    this.container.classList.add("container");
    this.conversationList.setOnConversationItemClick(
      this.setActiveConversation
    );
    this.conversationList.container.classList.add("left-content");

    const divContent = document.createElement("div");
    divContent.classList.add("right-content");

    this.container.appendChild(divContent);
    divContent.appendChild(this.conversationInfo.container);

    const divMainContent = document.createElement("div");
    divContent.appendChild(divMainContent);
    divMainContent.classList.add("right-main-content");

    const divMessage = document.createElement("div");

    divMainContent.appendChild(divMessage);
    divMessage.appendChild(this.messageList.container);
    divMessage.appendChild(this.conposer.container);

    divMainContent.appendChild(this.userList.container);
    this.subscribeConversation();
  }
  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.conversationInfo.setName(conversation.name);
    this.conversationList.setStyleAvtiveConversation(conversation);

    this.conposer.setActiveConversation(conversation);
    console.log("123", conversation);
    this.userList.setActiveConversation(conversation);

    this.messageList.clearMessage();
    this.subscribeConversationMessageList();
  };
  // listener
  subscribeConversationMessageList = () => {
    if (this.subscribeConversationMessages !== null) {
      this.subscribeConversationMessages();
    }
    //Connect to listen
    this.subscribeConversationMessages = db
      .collection("messages")
      .where("conversationId", "==", this.activeConversation.id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          this.messageList.addMessage(change.doc.data());
        });
      });
  };

  subscribeConversation = () => {
    db.collection("conversations").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New conversation: ");
          this.conversationList.handleCreateConversationAdded(
            change.doc.id,
            change.doc.data().name,
            change.doc.data().users
          );
        }
        if (change.type === "modified") {
          console.log("Modified conversation: ");
          this.conversationList.handleConversationUpdate(
            //update conversation info
            change.doc.id,
            change.doc.data().name,
            change.doc.data().users
          );
          //update list users
          this.userList.setActiveConversation({
            id: change.doc.id,
            name: change.doc.data().name,
            users: change.doc.data().users,
          });
        }
        if (change.type === "removed") {
          console.log("Remove conversation: ");
          this.conversationList.removerItem(change.doc.id);
        }
      });
    });
  };
}

export { Chat };
