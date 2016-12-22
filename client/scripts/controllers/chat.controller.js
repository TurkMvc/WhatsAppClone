/*
Controller for chat page which shich details the chat.
*/
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats ,Messages} from '../../../lib/collections';
import Ionic from 'ionic-scripts';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.chatId = this.$stateParams.chatId;
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;
    this.helpers({
      messages(){
      	return Messages.find({chatId :this.chatId});
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }
  sendMessage()
  {
    /*
    this method send the message where 
    newMessage method is created as globaly in lib folder that is 
    which can acces from both client and servere. 
    */
      if (_.isEmpty(this.message)) return;
    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      chatId: this.chatId
    });

    delete this.message;
  }

  inputUp()
  {
    /*
    this method make the keyboard up
    when moved
    */

    if(this.isIOS){
      this.keyboardHeight=216;
    }
    this.scrollBottom(true);
  }

  inputDown()
  {
    /*
    this method make the keyboard down
    after clicking 
    */
    if(this.isIOS){
      this.keyboardHeight=0;
    }
    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

    closeKeyboard () {
     /*
     this method close the keyboard
     */ 
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

    scrollBottom(animate) {
      /*
      this method gives the 
      input keyboard scroll effect
      */
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }



}

ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams','$ionicScrollDelegate','$timeout'];

