import { format, addMinutes, subMinutes, parse, parseISO, formatDistance } from 'date-fns';
import publicIp from 'public-ip';
import config from '../config';


export const vehicleString = ({ brand, model, color = '',  patent = ''}) => {
  return `${capitalize(brand)} ${capitalize(model)} ${color} ${patent}`;
}

export const id = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

//generates random id;
export const guid = () => {
  return id() + id() + '-' + id() + '-' + id() + '-' + id() + '-' + id() + id() + id();
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
};

export const validateEmail = (email = null) => {
  if (email === null) return false;
  // const re    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validatePassword = (pass = null) => {
  if (pass === null) return false;
  return pass.length > 3;
};

export const validateStringNotEmpty = (str = null) => {
  if (str === null) return false;
  return str.length > 0;
};

export const validateOnlyNumber = (num = null, allowNegative = false) => {
  // const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;  // For phonenumber //TODO: test it
  // allowNegative /^-? 
  const regex = /^(?:\d+)(?:(\.|,)\d+)?$/
  return regex.test(num);
  // if (num === null) return false;
  // return !isNaN(num);
};

export const parseOnlyLetterAndSpace = str => str.replace(/[^A-Za-z ]/g, '');

export const parseLength = (str, length) => str.substring(0, length);

export const validateAtLeastLength = (str, length) => str && str.trim().length >= length;

export const validateIsfilled = expression => expression && (expression.length > 0 || expression > 0);

export const validateIsTrue = expression => expression;

export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

export const optionSelectGenerator = (array = [], type = 'vector') => {
  let options = [];
  array.forEach(e => {
    if (type === 'vector') {
      options.push({label: e, value: e});
    }
  });
  return options;
}


export const toDate = (dateStr, separator = '/') => {
  const parts = dateStr.split(separator);
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export const fromISO = (dateISO, separator = '/') => {
  const parts = dateISO.substring(0,10).split('-');
  return `${parts[2]}${separator}${parts[1]}${separator}${parts[0]}`;
}

export const fromISOtoDate = (dateISO, tz = true) => {
  let date = new Date(dateISO);
  let userTimezoneOffset = 0;
  if (tz === false) userTimezoneOffset = new Date(date).getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}

export const isDate = (val) => {
  return val && Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val);
}

export const isEmptyObject = (obj) => {
  if (typeof obj === 'undefined') {
    return true;
  } else if (isObject(obj)) {
    return Object.entries(obj).length === 0;
  }
  return false;
};

export const isObject = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') return true;
  // ref: https://medium.com/javascript-in-plain-english/javascript-check-if-a-variable-is-an-object-and-nothing-else-not-an-array-a-set-etc-a3987ea08fd7
  // alternatives: if (obj && obj.constructor.name === 'Object') return true;
  return false;
};

export const isNotSetOrTrue = (str) => {
  if (typeof str === 'undefined' || str === null || (typeof str === 'boolean' && str )) {
    return true;
  } else if (typeof str === 'boolean' && str === false) {
    return false;
  }
  return false;
};

export const isEmptyOrUndefined = (str) => {
  if (typeof str === 'undefined' || !str || str.length === 0) {
    return true;
  } 
  return false;
};

export const normalize = (str, key=false) => {
  try {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if(key) str = str.replace(/ +/g, "_");
  } catch(e) {
    console.log('>>ERROR normalizing:', e.message);
  }
  return str;
}

export const isJSON = (str) => {
  try {
    const json = JSON.parse(str);
    if (json && isObject(json)) return true;
  } catch (e) {
    return false;
  }
  return false;
};

export const isFunction = (val) => {
  //If our variable is an instance of "Function"
  if (val instanceof Function) {
      return true;
  }
  return false;
}

export const getOwner = (user) => {
  //return id to save in owner field
  let owner;
  if (user) {
    let account = user.accounts.filter(acc => acc.ownership === config.USER_ACCOUNTS.TYPES.OWNER);
    owner = config.USER_ACCOUNTS_INTEGRATED && account.length ? account[0].id : user.id;
  }
  return owner;
}

export const capitalize = (string) => {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const capitalizeFrase = (string) => {
  if (typeof string !== 'string') return ''
  return string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');  
}

export const dateComponents = (date) => {
  if (!isDate(date)) return null;
  let response = [];
  response.push({ short: format(date, 'd') });
  response.push({ short: format(date, 'cccc') });
  response.push({ short: format(date, 'MMM'), long: format(date, 'MMMM') });
  response.push({ dateOnly: format(date, 'yyyy-MM-d') });
  return response;
}

export const timeDistance = (from, to, locale) => {
  console.log('>>>> timeDistance', from, to);
  return formatDistance(to, from, { addSuffix: true, includeSeconds: true, locale });
}

export const changeTimeInDate = (time, day) => {
  return parse(time, 'HH:mm',  new Date(day));
}

export const now = (separator = '-', type = 'date') =>{
  const now = new Date();
  // const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  // const dateLocal = new Date(now.getTime() - offsetMs);
  const dateLocal = new Date(now.setHours(0,0,0,0));
  if (type === 'string') {
    return dateLocal.toISOString().slice(0, 19).replace(/-/g, separator).replace("T", " ");
  } else if (type === 'date') {
    return dateLocal;
  }
}

export const setTimeZeroDateWithTZ = (date, tz = true) => {
  const baseDate = new Date(date).setUTCHours(0,0,0,0);
  const dateZero = new Date(baseDate);
  const offsetMs = !tz ? 0 : new Date(baseDate).getTimezoneOffset() * 60 * 1000;
  return new Date(dateZero.getTime() + offsetMs);
}

export const months = (m = null) => {
  const month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
  return m !== null ? month[m] : month;
}

export const numToTime = (number) => {
  // Check sign of given number
  const sign = (number >= 0) ? 1 : -1;
  number = number * sign;

  let hour = Math.floor(number);
  let decpart = number - hour;

  let min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);
  let minute = Math.floor(decpart * 60);
  // Add padding if need
  return (sign === 1 ? '' : '-') + formatCompleteWith(hour, 2) + ':' + formatCompleteWith(minute, 2);
}

export const getTimeZone = () => {
  if (Intl) return Intl.DateTimeFormat().resolvedOptions().timeZone;
  return null;
}

export const getClientIp = async () => await publicIp.v4({
  fallbackUrls: [ 'https://ifconfig.co/ip' ]
});

export const getLatLng = (callback) => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (callback) callback({ lat, lng });
      },
      (err) => {
        console.log('ERROR WITH GEOLOCATION', err);
        if (callback) callback(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      } 
    );
  } else {
    console.log('NO HTML GEOLOCATION');
    if (callback) callback(null);
  }  
}

export const formatCompleteWith = (str, len = 0, char = '0') => {
  const length = len === 0 ? str.toString().length : len;
  return char.repeat(length - str.toString().length) + str.toString();
}

export const formatAddressFromGoogle = (address, number) => {
  return `${address.components[1].short_name} ${number ? number : address.components[0].short_name}`;
}

export const formatMoney = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log('FORMATMONEY error:', e)
  }
};

export const formatPhoneNumber = (phoneNumberString) => {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null
}

export const formatTax = (str) => {
  if (isEmptyOrUndefined(str)) return null;
  let match = str.match(/^(\d{2})(\d{8})(\d{1})$/);
  if (match) {
    return [match[1], match[2], match[3]].join('-');
  }
  return null
}

export const searchJSON = (json, root, search) => {
  // console.log('json', json, search);
  if (!isObject(search)) return false;
  if (isObject(json)) {
    let json_root = '';
    if (!root.startsWith('$')) return false;
    if (root.startsWith('$.')) {
      json_root = root.substring(2, root.length);
    }
    const json_root_array = json_root !== '' ? json_root.split('.') : [];
    const search_names = Object.keys(search);
    const search_values = Object.values(search);
    // console.log('JSON', json_root, json_root_array, search_names, search_values);
    if (json_root_array.length) {
      let level = 0;
      for (let i = 0; i < json_root_array.length; i++) {
        const el = json_root_array[i];
        if (json.hasOwnProperty(el)) {
          // console.log('JSON HAS', el, level);
          if (level === json_root_array.length -1 ) {
            // console.log('LAST LEVEL');
            for (let j = 0; j < search_names.length; j++) {
              const name = search_names[j];
              const value = search_values[j];
              // console.log('SEARCH', name, value, json[el]);
              if (! Array.isArray(json[el])) {
                if (json[el].hasOwnProperty(name) && json[el][name] === value) {
                  // console.log('FOUND', level, name, value);
                  return true;
                }
              } else {
                const result = json[el].filter((el) => {
                  console.log('EL', el)
                  return el.hasOwnProperty(name) && el[name] === value;
                });
                // console.log('RESULT', result, result.length);
                if (result.length) { 
                  return result;
                  break;
                } else {
                  return false;
                }
              }
            }
            level++
          }
        }
      };
    }
    return true
  }
  return false
}

export const complexAPIObjectToFormValues = (obj) => {
  let response = { ...obj };
  Object.keys(obj).forEach((k) => {
    // console.log('object key', k, obj[k], isObject(obj[k]) );
    if (isObject(obj[k])) {
      response[k] = obj[k].id;
    }
  });
  return response;
}

export const getObjectWithJsonDataToFromValues = (obj , fields = []) => {
  let response = { ...obj };
  if (!obj) return response;
  if (obj && obj.hasOwnProperty('json_data')) {
    const json_data = obj.json_data;
    delete response.json_data;
    response = { ...response, ...json_data };
  }
  console.log('RESPONSE', response);
  if (fields.length) {
    response = Object.assign(
      ...Object.keys(response)
        .filter( key => fields.includes(key) === true)
        .map( key => ({ [key]: response[key] }) )
    );
  }
  return response;
}

export const chunkArray = (array, chunkSize) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)]
    .map((value, index) => {
      return array.slice(index * chunkSize, (index + 1) * chunkSize);
    })
}

export const currencyTranslate = (current, translation) => {
  return translation && translation[current] ? translation[current] : current;
}

export const permissionsCheck = (path, permissions, action = 'route') => {
  const route = path.substr(1, path.length).split('/');
  console.log('ROUTE & SUBROUTES', route);
  if (['login', 'logout', 'icons'].includes(route[0]) || route[0] === '') return true;

  function actionType(perm) {
    // console.log('ACTION TYPE', route.length, perm.action_type, action, ['delete', 'update', 'insert'].includes(action));
    if (action === 'route' && route.length === 1) {
      return (perm.action_type === 'read' || perm.action_type === 'write');
    }
    if (action === 'route' && route.length > 1 && route[1].includes('new')) {
      return (perm.action_type === 'write');
    }
    if (action === 'route' && route.length > 1 && route[1].includes(':id')) {
      return (perm.action_type === 'read' || perm.action_type === 'write');
    }
    if (action !== 'route' && ['delete', 'update', 'insert'].includes(action)) {
      return (perm.action_type === 'write');
    }

  }

  if ((!Array.isArray(permissions) || !permissions) && action === 'route') { 
    return true;
  } else if ((!Array.isArray(permissions) || !permissions) && ['delete', 'update', 'insert'].includes(action)) {
    return false;
  }
  const found = permissions.filter(p => 
    p.object_type === route[0] && actionType(p)
    // p.action_type === action
  );
  // console.log('FOUND PERMIS', found);
  return found.length > 0;
}



export const paginate = (
  totalItems,
  currentPage = 1,
  pageSize = 10,
  maxPages = 0
) => {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  maxPages = maxPages === 0 ? totalPages : maxPages;
  // ensure current page isn't out of range
  if (currentPage < 1) {
      currentPage = 1;
  } else if (currentPage > totalPages) {
      currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
  } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          // current page near the end
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
      } else {
          // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
      }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = 0;
  if (totalPages) {
    pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  } 

  const disablePrevious = currentPage === 1 ? true : false;
  const disableNext = currentPage === endPage ? true : false;

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    disablePrevious,
    disableNext,
    pages
  };
}


/* enumerateTimeSlots v0.0.4 */
export const enumerateTimeSlots = ({
  slot = null,
  wait = 0,
  start = null,
  end = null,
  timeOffset = 0,
  ampm = null
}) => {
  let timeSlots = [];
  if (slot === null) slot = 15;
  if (wait !== 0 ) slot = slot + wait;
  if (ampm === null) ampm = true;
  if (start === null) start = '00:00';
  if (end === null) end = '23:59';
  if (timeOffset === null) timeOffset = 0;


  const date = new Date();

  let startTime = parse(start, 'HH:mm',  date);
  let endTime = parse(end, 'HH:mm',  date);

  // console.log('BEFORE ', startTime, endTime);
  // console.log('TIMEOFFSET', timeOffset);

  if (timeOffset > 0) {
    // console.log('MAS');
    startTime = addMinutes(startTime, timeOffset);
    endTime = addMinutes(endTime, timeOffset);
  } else if (timeOffset < 0){
    // console.log('MENOS');
    startTime = subMinutes(startTime, timeOffset);
    endTime = subMinutes(endTime, timeOffset);
  }
  console.log('AFTER', startTime, endTime);

  let loop = 0;
  while (startTime <= endTime && loop <= 24) {
    // console.log('startTime', startTime);
    // console.log('endTime', endTime);
    let timeSlot = format(startTime, 'HH:mm');
    // console.log('SLOT', timeSlot);
    // if (ampm) timeSlot = moment(timeSlot, 'HH:mm').format('hh:mm A');
    timeSlots.push(timeSlot);
    startTime = addMinutes(startTime, slot);
    loop++;
  }
  return timeSlots;
};