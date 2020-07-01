import { CHATS_LOAD, CHATS_SEND, CHAT_ADD } from "actions/chats";
import update from "react-addons-update";

const dataBackend = {
  "1": {
    name: "😸 Chat",
    messages: [
      {
        text: "Hi! Share your happy news here",
        author: "Bot",
      },
    ],
  },
  "2": {
    name: "🙀 Chat",
    messages: [
      {
        text: "Hi! Share your shocking news here",
        author: "Bot",
      },
    ],
  },
  "3": {
    name: "😽 Chat",
    messages: [
      {
        text: "Hi 💋",
        author: "Bot",
      },
    ],
  },
};

const initialState = {
  entries: {}, //Chats
  loading: false,
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: dataBackend,
      };
    case CHAT_ADD:
      const { name, chatId } = action.payload;
      return update(state, {
        entries: {
          $merge: {
            [chatId]: {
              messages: [{ text: "Hello there", author: "Bot" }],
              name,
            },
          },
        },
      });
    case CHATS_SEND:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                { text: action.payload.text, author: action.payload.author },
              ],
            },
          },
        },
      });
    default:
      return state;
  }
};
