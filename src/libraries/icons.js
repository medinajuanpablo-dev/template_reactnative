import React from 'react';

import { ReactComponent as view_tile } from '../assets/icons/view-tile.svg';
import { ReactComponent as thumbs_up } from '../assets/icons/thumbs-up.svg';
import { ReactComponent as close } from '../assets/icons/close.svg';
import { ReactComponent as dashboard } from '../assets/icons/dashboard.svg';
import { ReactComponent as repost } from '../assets/icons/repost.svg';
import { ReactComponent as user } from '../assets/icons/user.svg';
import { ReactComponent as user_group } from '../assets/icons/user-group.svg';
import { ReactComponent as calculator } from '../assets/icons/calculator.svg';
import { ReactComponent as home } from '../assets/icons/home.svg';
import { ReactComponent as document } from '../assets/icons/document.svg';
import { ReactComponent as cog } from '../assets/icons/cog.svg';
import { ReactComponent as shield } from '../assets/icons/shield.svg';
import { ReactComponent as cheveron_right } from '../assets/icons/cheveron-right.svg';
import { ReactComponent as cheveron_left } from '../assets/icons/cheveron-left.svg';
import { ReactComponent as cheveron_down } from '../assets/icons/cheveron-down.svg';
import { ReactComponent as checkmark } from '../assets/icons/checkmark.svg';
import { ReactComponent as save_disk } from '../assets/icons/save-disk.svg';
import { ReactComponent as download } from '../assets/icons/download.svg';
import { ReactComponent as edit_pencil } from '../assets/icons/edit-pencil.svg';
import { ReactComponent as trash } from '../assets/icons/trash.svg';
import { ReactComponent as information_solid } from '../assets/icons/information-solid.svg';
import { ReactComponent as information_outline } from '../assets/icons/information-outline.svg';
import { ReactComponent as document_add } from '../assets/icons/document-add.svg';
import { ReactComponent as close_solid } from '../assets/icons/close-solid.svg';
import { ReactComponent as close_outline } from '../assets/icons/close-outline.svg';
import { ReactComponent as add_solid } from '../assets/icons/add-solid.svg';
import { ReactComponent as add_outline } from '../assets/icons/add-outline.svg';
import { ReactComponent as add_square_outline } from '../assets/icons/add-square-outline.svg';
import { ReactComponent as plus } from '../assets/icons/plus.svg';
import { ReactComponent as remove_square_outline } from '../assets/icons/remove-square-outline.svg';
import { ReactComponent as view_show } from '../assets/icons/view-show.svg';
import { ReactComponent as pin } from '../assets/icons/pin.svg';
import { ReactComponent as clean_inside } from '../assets/icons/car-clean-inside.svg';
import { ReactComponent as clean_outside } from '../assets/icons/clean-outside.svg';
import { ReactComponent as gout } from '../assets/icons/gout.svg';
import { ReactComponent as time } from '../assets/icons/time-circle.svg';
import { ReactComponent as clean_complete } from '../assets/icons/clean-complete.svg';
import { ReactComponent as my_washes_circle } from '../assets/icons/my-washes-circle.svg';
import { ReactComponent as my_washes } from '../assets/icons/my-washes.svg';
import { ReactComponent as help } from '../assets/icons/help.svg';
import { ReactComponent as phone } from '../assets/icons/phone.svg';
import { ReactComponent as arrow_left } from '../assets/icons/arrow-left.svg';
import { ReactComponent as arrow_right } from '../assets/icons/arrow-right.svg';
import { ReactComponent as dots_vertical } from '../assets/icons/dots-vertical.svg';
import { ReactComponent as user_info } from '../assets/icons/user-info.svg';
import { ReactComponent as notification } from '../assets/icons/notification.svg';
import { ReactComponent as language } from '../assets/icons/language.svg';
import { ReactComponent as terms } from '../assets/icons/terms.svg';
import { ReactComponent as helpme } from '../assets/icons/help.svg';
import { ReactComponent as logout } from '../assets/icons/logout.svg';
import { ReactComponent as chat_alt } from '../assets/icons/chat-alt.svg';
import { ReactComponent as location } from '../assets/icons/location.svg';
import { ReactComponent as calendar } from '../assets/icons/calendar.svg';
import { ReactComponent as cancel } from '../assets/icons/cancel.svg';
import { ReactComponent as menu } from '../assets/icons/menu.svg';

// stroke="none" fill="currentColor"

const iconMap =  {
  view_tile,
  thumbs_up,
  home,
  close,
  dashboard,
  repost,
  user,
  user_group,
  calculator,
  document,
  cog,
  shield,
  cheveron_right,
  cheveron_left,
  cheveron_down,
  checkmark,
  save_disk,
  download,
  edit_pencil,
  trash,
  information_solid,
  information_outline,
  document_add,
  close_solid,
  close_outline,
  add_solid,
  add_outline,
  add_square_outline,
  remove_square_outline,
  plus,
  view_show,
  pin,
  clean_inside,
  clean_outside,
  gout,
  time,
  clean_complete,
  my_washes_circle,
  my_washes,
  help,
  phone,
  arrow_left,
  arrow_right,
  dots_vertical,
  user_info,
  notification,
  language,
  terms,
  helpme,
  logout,
  chat_alt,
  location,
  calendar,
  cancel,
  menu
};

const Icon = ({ name, size, color, ...rest }) => {
  const Icon = iconMap[name];
  if (typeof Icon === 'undefined') return null;
  return <Icon color={color} style={{ width: size, height: size }} {...rest} />;
};

export default Icon;

