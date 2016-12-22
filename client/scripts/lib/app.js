/*
this js file boots first in the client side
this initilise the app and modules.
*/

// Libs

import 'angular-animate';
import 'angular-meteor-auth'
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-moment'
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import Routes from '../routes';
import { Meteor } from 'meteor/meteor';
import ChatsCtrl from '../controllers/chats.controller';
import CalendarFilter from '../filters/calender.filter';
import ChatCtrl from '../controllers/chat.controller';
import InputDirective from '../directives/input.directive';
import LoginCtrl from '../controllers/login.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';


// App
const App = 'Whatsapp';

// Modules
Angular.module(App, [
  'angular-meteor',
  'angularMoment',
  'ionic',
  'angular-meteor.auth'
]);
new Loader(App)
  .load(ChatsCtrl)
  .load(ChatCtrl)
  .load(CalendarFilter)
  .load(InputDirective)
  .load(ConfirmationCtrl)
  .load(LoginCtrl)
  .load(ProfileCtrl)
  .load(SettingsCtrl)
  .load(Routes);
// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}
function onReady() {
  Angular.bootstrap(document, [App]);
}

