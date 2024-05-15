import { Conversation, Message } from "../models/!modelExports.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    console.log(newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    // await Promise.all(await conversation.save(), await newMessage.save());

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log("ERROR IN SEND_MESSAGE!!: ", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // console.log(userToChatId + "\n" + senderId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // if (conversation) {
    //   console.log(conversation);
    // } else {
    //   console.log("\nEmpty!!");
    // }

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("ERROR IN GET_MESSAGE!!: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
