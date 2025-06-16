import { DateTime } from "luxon";
import { useEffect } from "react";
import { theme } from "../styles/theme";

export function useOutsideClicker(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const stringSearch = (items, str, field, delay = 500) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          items.filter((item) =>
            !!field
              ? item[field].toLowerCase().includes(str.toLowerCase())
              : item.includes(str)
          )
        ),
      delay
    )
  );
};

export const getDate = (datestr) => {
  let date = new Date(datestr);

  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const langs = {
  bn: { nativeName: "বাংলা" },
  en: { nativeName: "English" },
};

export const IMGDIMENTION = {
  banner: { width: 800, height: 400 },
  en: { nativeName: "English" },
};

export const IMGSTTYPE = {
  sibling: "sibling",
  array: "array",
  home_sc3_limit: 3,
  lbl_flashsale: "Flash Sale"
};

export const TEMPCONST = {
  dayleft: -1,
  "trail_notify_msg": "Select a Pakage and pay membership fee.",
  "package_notify_msg": "You have chosen ",
  "payment_status_notify_msg": "You have paid membership fee, waiting for apporval.",
  "package_expired_notify_msg": "Your membership expired, Please pay membership fee."
}

export const formatGridDate = (str, isTime) => {
  var date = DateTime.fromFormat(str, "yyyy-MM-dd").set({ hour: 23, minute: 59, second: 59 });
  return isTime ? date.toFormat("dd MMM yyyy hh:mm a") : date.toFormat("dd MMM yyyy");
}

export const daysLeftCount = (str) => {
  const date1 = DateTime.fromFormat(str, "yyyy-MM-dd");
  return parseInt(date1.diff(DateTime.now(), 'days').toObject().days) + 1;
}

export const formatPubDateTime = (str) => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() - h);
    return this;
  }
  return DateTime.fromJSDate(new Date(str))
    .setLocale(localStorage.i18nextLng)
    .toFormat("hh:mm a, dd MMM yyyy")
}

export const formatGridDatetime = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd HH:mm").toFormat("hh:mm a, dd MMM yyyy")
}

export const formatGridTimeStamp = (str) => {
  var date = '---';
  try {
    date = DateTime.fromFormat(str, "yyyy-MM-dd HH:mm:ss").toFormat("hh:mm:ss a, dd MMM yyyy")
  } catch (error) {
    date = str;
  }
  return date;
}

export const getFinanCialYear = (size) => {
  var fnYear = [];
  var currentMonth = DateTime.now().month;
  for (let i = 1; i <= size; i++) {
    var nextYear = currentMonth > 5 ? DateTime.now().plus({ year: 1 }) : DateTime.now();
    var cYear = nextYear.minus({ year: i });
    fnYear.push(cYear.toFormat("yyyy") + "-" + cYear.plus({ year: 1 }).toFormat("yy"))
  }
  return (fnYear);
};

export const getBackYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth - i)
  }
  return (ttYear);
};

export const getDDNumber = (size) => {
  var ttYear = [];
  for (let i = 0; i <= size; i++) {
    ttYear.push(i + 1);
  }
  return (ttYear);
};

export const getHideNumber = (number) => {
  return number.substring(0, 9) + "***" + number.substring(number.length - 2, number.length);
};

export const getHideEmail = (number) => {
  var indx = number.indexOf("@");
  return number.substring(0, 3) + "***" + number.substring(indx, number.length);
};

export const getNextYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth + i)
  }
  return (ttYear);
};

export const getCurrentYear = () => {
  var currentMonth = DateTime.now().year;
  return (currentMonth);
};

export const getBNFont = (font, lang, number = 3, type = "inc") => {
  var fontInt = parseInt(font?.split("px")[0]);
  var chFont = fontInt ? fontInt + 1 + "px" : theme.fontSize.smFont;
  var bnFont = fontInt ? type == "decr" ? (fontInt - number + "px") : (fontInt + number + "px") : theme.fontSize.smFont;
  return localStorage.i18nextLng == 'en' ? font : lang ? bnFont : chFont;
};


export const getBNNumber = (paramstr, isFormat) => {
  var retStr = paramstr || "";
  var enData = retStr;
  var finalEnlishToBanglaNumber = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
  for (var x in finalEnlishToBanglaNumber) {
    retStr = retStr.toString().replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
  }
  var d11 = retStr.length == 11 && retStr.substring(0, 5).concat("-") + retStr.substring(5, retStr.length);
  var d14 = retStr.length == 14 && retStr.substring(0, 0).concat("(") + retStr.substring(0, 3).concat(") ") + retStr.substring(3, 8).concat("-") + retStr.substring(8, retStr.length)
  return localStorage?.i18nextLng == "bn" ? isFormat ? retStr.length == 14 ? d14 : retStr.length == 11 ? d11 : retStr || "NaN" : retStr : enData;
}

export const getValueByLang = (strData, prlang) => {
  var data = JSON.parse(strData);
  var lang = localStorage.getItem("i18nextLng") || "en";
  return data[prlang || lang];
}


export const getRandomNumberArray = ({ size = 10, digits = 3 }) => {
  return Array.apply(null, { length: size || 100 }).map(function () {
    return Math.floor(Math.random() * Math.pow(10, digits) + Math.pow(10, digits)).toString().slice(-digits);
  });
}

export const getTextToImage = ({ width, height, color, text = "Image" }) => {
  const canvas = document.createElement('canvas');
  canvas.width = width || 100;
  canvas.height = height || 60;
  canvas.style.background = "white";
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color || 'black';
  ctx.font = 'bold 20px monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fontStyle = 'oblique';
  ctx.lineWidth = 5;
  ctx.strokeStyle = color || "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const bitImg = canvas.toDataURL('image/png');
  // const a = document.createElement('a')
  // a.href = bitImg;
  // a.download = text+'.jpg'
  // a.click();
  return bitImg;
}

export const getStampImage = ({ width, height, color, text = "Image" }) => {
  const canvas = document.createElement('canvas');
  canvas.width = width || 100;
  canvas.height = height || 60;
  canvas.style.background = "white";
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color || 'black';
  ctx.font = 'bold 3rem Courier';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fontStyle = 'oblique';
  ctx.lineWidth = 5;
  ctx.strokeStyle = color || "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  const BG = new Image();
  BG.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png"
  BG.onload = () => { ctx.drawImage(BG, 0, 0); }
  ctx.mixBlendMod = 'multiply';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const bitImg = canvas.toDataURL('image/png');
  const a = document.createElement('a')
  a.href = bitImg;
  a.download = text + '.jpg'
  a.click();
  //return bitImg;
}
export const getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}

export const checkNumber = (key) => {
  return key >= 0 && key <= 9 || key == "Delete" || key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight"
}

export const checkAnyNumber = (event) => {
  var val = event.target.value;
  var key = event.key;
  return key >= 0 && key <= 9 || key == "Delete" || key == "." && !val.includes(".") && val.length != 0 || key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight"
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const getNumber = (x) => {
  return x.replace(/[^0-9.]/g, '')
}

export const copyText = (text = "") => {
  if (window.navigator.clipboard) {
    window.navigator.clipboard.writeText(text)
  } else {
    const input = document.createElement('textarea')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
}
export const PAYMETHODLIST = [
  {
    "method_id": "bKash",
    "method_name": "bKash"
  },
  {
    "method_id": "NAGAD",
    "method_name": "NAGAD"
  },
  {
    "method_id": "Rocket",
    "method_name": "Rocket"
  },

  {
    "method_id": "UPay",
    "method_name": "UPay"
  },
  {
    "method_id": "MCash",
    "method_name": "MCash"
  },
  {
    "method_id": "Cash",
    "method_name": "Cash"
  },


];


export const PaySTATUSLIST = [

  {
    "status_id": "Approved",
    "status_name": "Approved"
  },
  {
    "status_id": "Pending",
    "status_name": "Pending"
  },
  {
    "status_id": "Canceled",
    "status_name": "Canceled"
  },
];

export const STATUSLIST = [

  {
    "status_id": "Booked",
    "status_name": "Booked"
  },
  {
    "status_id": "Canceled",
    "status_name": "Canceled"
  },
];

export const PRDSECTORLIST = [
  {
    "sector_id": "trandy",
    "sector_name": "Trandy Collection"
  },
  {
    "sector_id": "most_fvrt",
    "sector_name": "Most Popular"
  },
];

export const VISIBLELIST = [
  {
    "id": "yes",
    "value": "yes"
  },
  {
    "id": "no",
    "value": "no"
  },
];

export const IMGTAGLIST = [
  {
    "id": "photo",
    "value": "Photo"
  },
  {
    "id": "logo",
    "value": "Logo"
  },

];

export const MENUPOSLIST = [
  {
    "id": "header",
    "value": "Header"
  },
  {
    "id": "footer",
    "value": "Footer"
  },
  {
    "id": "none",
    "value": "None"
  },

];

export const CATFORLIST = [
  {
    "type_id": "BIZ",
    "type_name": "Commercial"
  },
  {
    "type_id": "IND",
    "type_name": "Inidividual"
  },
  {
    "type_id": "N/A",
    "type_name": "N/A"
  }
];

export const SUPPORTCNTDATA = [
  {
    "id": 1,
    "status": "Active",
    "type": "mobile",
    "name": "biz_mobile",
  },
  {
    "id": 2,
    "status": "Active",
    "type": "mobile",
    "name": "biz_cp_mobile",
  },
  {
    "id": 3,
    "status": "Active",
    "type": "email",
    "name": "biz_email",
  },
  {
    "id": 4,
    "status": "Active",
    "type": "email",
    "name": "biz_cp_email",
  }
]

export const SUPPORTDATA = [
  {
    "id": 1,
    "status": "Active",
    "type": "mobile",
    "name": "biz_mobile",
  },
  {
    "id": 2,
    "status": "Active",
    "type": "mobile",
    "name": "biz_cp_mobile",
  },
  {
    "id": 3,
    "status": "Active",
    "type": "email",
    "name": "biz_email",
  },
  {
    "id": 4,
    "status": "Active",
    "type": "email",
    "name": "biz_cp_email",
  },
  {
    "id": 5,
    "status": "Active",
    "type": "address",
    "name": "biz_address",
  }
]

export const IMPORTANTLINK = [
  {
    "id": 1,
    "status": "Active",
    "name": "Cookies Policy",
    "link": "",
  },
  {
    "id": 2,
    "status": "Active",
    "name": "Privacy Policy",
    "link": "",
  },
  {
    "id": 3,
    "status": "Active",
    "name": "Terms & Condition",
    "link": "",
  },
  {
    "id": 4,
    "status": "Active",
    "name": "FAQs",
    "link": "",
  },
]

export const SOCIALLINK = [
  {
    "icon_id": 1,
    "status": "Active",
    "name": "Facebook",
    "icon": "facebook",
    "hvcolor": "white",
    "hvback": "blue",
    "color": "black",
    "hover": "true",
    "type": "icon",
    "link": "https://www.facebook.com",
  },
  {
    "icon_id": 2,
    "status": "Active",
    "name": "Twitter",
    "icon": "twitter",
    "color": "black",
    "hvcolor": "white",
    "hvback": "#0dbbe0",
    "hover": "true",
    "type": "icon",
    "link": "https://www.twitter.com",
  },
  {
    "icon_id": 3,
    "status": "Active",
    "name": "Instagram",
    "icon": "instagram",
    "color": "white",
    "hvcolor": "red",
    "hvback": "red",
    "hover": "true",
    "type": "icon",
    "link": "https://www.instagram.com/",
  },
  {
    "icon_id": 4,
    "status": "Active",
    "name": "YouTube",
    "icon": "youtube",
    "color": "white",
    "hvcolor": "red",
    "hvback": "red",
    "hover": "true",
    "type": "icon",
    "link": "https://www.youtube.com/",
  },
  {
    "icon_id": 5,
    "status": "Active",
    "name": "Linked In",
    "icon": "linkedin",
    "color": "black",
    "hvcolor": "white",
    "hvback": "#1bbc9b",
    "hover": "true",
    "type": "icon",
    "link": "https://www.linkedin.com/",
  },
  {
    "icon_id": 6,
    "status": "Active",
    "name": "Google",
    "icon": "google",
    "color": "black",
    "hvcolor": "white",
    "hvback": "red",
    "hover": "true",
    "type": "file",
    "link": "https://www.google.com/search?q=biz360expo.com",
  },
  {
    "icon_id": 7,
    "status": "Active",
    "name": "WhatsApp",
    "icon": "whatsapp",
    "color": "black",
    "hvcolor": "white",
    "hvback": "green",
    "hover": "true",
    "type": "file",
    "link": "https://www.google.com/search?q=biz360expo.com",
  },
  {
    "icon_id": 8,
    "status": "Active",
    "name": "Telegram",
    "icon": "telegram",
    "color": "black",
    "hvcolor": "white",
    "hvback": "#0dbbe0",
    "hover": "true",
    "type": "file",
    "link": "https://t.me/biz360expo",
  },
  {
    "icon_id": 9,
    "status": "Active",
    "name": "Messenger",
    "icon": "messenger",
    "color": "black",
    "hvcolor": "white",
    "hvback": "#448AFF",
    "hover": "true",
    "type": "file",
    "link": "https://m.me/biz360expo",
  },

]