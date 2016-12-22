/*
first js run in the server side.
here we insert the data into collections of mongo db.
this collections stored as messages and chat.
*/

import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
Meteor.startup(function() {
  if (Chats.find().count() !== 0) return;
  Messages.remove({});
  const messages = [
    {
      text: 'Hi',
      timestamp: Moment().subtract(1, 'hours').toDate()
    },
    {
      text: 'Hey, it\'s me',
      timestamp: Moment().subtract(2, 'hours').toDate()
    },
    {
      text: 'Cool',
      timestamp: Moment().subtract(1, 'days').toDate()
    },
    {
      text: 'Common man',
      timestamp: Moment().subtract(4, 'days').toDate()
    },
    {
      text: 'whats up',
      timestamp: Moment().subtract(2, 'weeks').toDate()
    }
  ];
  messages.forEach((m) => {
    Messages.insert(m);
  });
   const chats = [
    {
      name: 'ameen',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
    },
    {
      name: 'rock',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/2.jpg'
    },
    {
      name: 'ronaldo',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/3.jpg'
    },
    {
      name: 'messi',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/4.jpg'
    },
    {      
      name: 'ozil',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/5.jpg'
    }
  ];
  chats.forEach((chat) => {
    const message = Messages.findOne({ chatId: { $exists: false } });
    chat.lastMessage = message;
    const chatId = Chats.insert(chat);
    Messages.update(message._id, { $set: { chatId } });
  });
});

