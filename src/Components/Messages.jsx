import { message } from "antd";

/**
 *
 * @param {string} type type of message (success, error, info, loading)
 * @param {string} content content written in the message
 * @param {string} key key to load next content in the same message box
 */
export const openLinkedMessage = (type, content, key) => {
  message[type]({ content: content, key });
};
