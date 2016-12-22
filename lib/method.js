/*
store the chat and date in the mongo db collections
Message and Chats.
*/
import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';

Meteor.methods({
  newMessage(message) {
  if(!this.userId)
  {
  	throw new Meteor.Error('not-logged-in','must be logged in to send message');
  }   	
  
  message.timestamp = new Date();
  const messageId = Messages.insert(message);
  Chats.update(message.chatId, { $set: { lastMessage: message } });
  return messageId;
  },

  updateName(name)
  {
  	if(!this.userId)
  	{
  		throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
  	}

  	check(name, String);

  	if(name.length===0)
  	{
  		throw new Meteor.Error('name required','must provide a user name');
  	}

  	return Meteor.users.update(this.userId, {$set : {'profile.name' : name }});
  }
});

