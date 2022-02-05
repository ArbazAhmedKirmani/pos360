import { message } from "antd";

/**
 *
 * @param {string} type type of message (success, error, info, loading)
 * @param {string} message content written in the message
 * @param {string} key key to load next content in the same message box
 */
export const showLinkedMessage = (type, msg, key) => {
  message[type]({ content: msg, key });
};
