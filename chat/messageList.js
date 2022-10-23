import { MessageItem } from "./messageItem.js";
class MessageList {
  container = document.createElement("div");

  constructor() {}

  addMessage = (message) => {
    const messageItem = new MessageItem(message.sender, message.content );
    this.container.appendChild(messageItem.container);
  };
  clearMessage = () => {
    this.container.innerHTML = "";
  };
}
export { MessageList };
