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

export const formatGridDate = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd").toFormat("dd MMM yyyy")
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
export const getBNFont = (font, lang, number=3 , type="inc") => {
  var fontInt = parseInt(font?.split("px")[0]);
  var chFont = fontInt ? fontInt + 1 + "px" : theme.fontSize.smFont;
  var bnFont = fontInt ? type=="decr"? (fontInt - number + "px"): (fontInt + number + "px") : theme.fontSize.smFont;
  return localStorage.i18nextLng == 'en' ? font : lang ? bnFont : chFont;
};

export const getHideEmail = (number) => { 
  var indx = number.indexOf("@");
  return  number.substring(0,3)+"***"+number.substring(indx, number.length);
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

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getValueByLang = (strData, prlang) => {
  var data = JSON.parse(strData);
  var lang = localStorage.getItem("i18nextLng") || "en";
  return data[prlang || lang];
}

export const getParts = (length) => {
  const sum = 100;
  var left = Math.ceil(sum / length),
    right = Math.floor(sum / length),
    first = (sum - right * length) / right;

  return Array.from({ length }, (_, i) => i < first ? left + "%" : right + "%");
}

export const getTextToImage = ({ width, height, text = "Image" }) => {
  const canvas = document.createElement('canvas');
  canvas.width = width || 100;
  canvas.height = height || 60;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.font = 'bold 20px monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fontStyle = 'oblique';
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL('image/png');
}

export const porfileData = {
  "footerpanel": {
    "support": {
      "title": "Contact"
    },
    "app_link": {
      "status": "active",
      "app_store": "https://play.google.com",
      "google_play": "https://appstore.appleid.com",
    },
    "important_link": {
      "title": "Legal",
      "link": [
        {
          "status": "active",
          "name": "Cookies Policy",
          "link": "https://google.com",
        },
        {
          "status": "active",
          "name": "Privacy Policy",
          "link": "https://google.com",
        },
        {
          "status": "active",
          "name": "Terms & Condition",
          "link": "https://google.com",
        },
        {
          "status": "active",
          "name": "FAQs",
          "link": "https://google.com",
        },
      ]
    },
    "social_media": {
      "title": "Connect With US",
      "link": [
        {
          "icon_id": 1,
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
          "status": "active",
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
    }

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

export const CATFORLIST = [
  {
    "type_id": "BIZ",
    "type_name": "Commercial"
  },
  {
    "type_id": "IND",
    "type_name": "Personal"
  },
  {
    "type_id": "BOTH",
    "type_name": "Both"
  }
];

export const RESDATA = {
  "data": {
    "footerpanel": {
      "support": {
        "title": "Contact"
      },
      "app_link": {
        "status": "active",
        "app_store": "https://play.google.com",
        "google_play": "https://appstore.appleid.com"
      },
      "important_link": {
        "title": "Legal",
        "link": [
          {
            "status": "active",
            "name": "Cookies Policy",
            "link": "https://google.com"
          },
          {
            "status": "active",
            "name": "Privacy Policy",
            "link": "https://google.com"
          },
          {
            "status": "active",
            "name": "Terms & Condition",
            "link": "https://google.com"
          },
          {
            "status": "active",
            "name": "FAQs",
            "link": "https://google.com"
          }
        ]
      },
      "social_media": {
        "title": "Connect With US",
        "link": [
          {
            "icon_id": 1,
            "status": "active",
            "name": "Facebook",
            "icon": "facebook",
            "hvcolor": "white",
            "hvback": "blue",
            "color": "black",
            "hover": "true",
            "type": "icon",
            "link": "https://www.facebook.com"
          },
          {
            "icon_id": 2,
            "status": "active",
            "name": "Twitter",
            "icon": "twitter",
            "color": "black",
            "hvcolor": "white",
            "hvback": "#0dbbe0",
            "hover": "true",
            "type": "icon",
            "link": "https://www.twitter.com"
          },
          {
            "icon_id": 3,
            "status": "active",
            "name": "Instagram",
            "icon": "instagram",
            "color": "white",
            "hvcolor": "red",
            "hvback": "red",
            "hover": "true",
            "type": "icon",
            "link": "https://www.instagram.com/"
          },
          {
            "icon_id": 4,
            "status": "active",
            "name": "YouTube",
            "icon": "youtube",
            "color": "white",
            "hvcolor": "red",
            "hvback": "red",
            "hover": "true",
            "type": "icon",
            "link": "https://www.youtube.com/"
          },
          {
            "icon_id": 5,
            "status": "active",
            "name": "Linked In",
            "icon": "linkedin",
            "color": "black",
            "hvcolor": "white",
            "hvback": "#1bbc9b",
            "hover": "true",
            "type": "icon",
            "link": "https://www.linkedin.com/"
          },
          {
            "icon_id": 6,
            "status": "active",
            "name": "Google",
            "icon": "google",
            "color": "black",
            "hvcolor": "white",
            "hvback": "red",
            "hover": "true",
            "type": "file",
            "link": "https://www.google.com/search?q=biz360expo.com"
          },
          {
            "icon_id": 7,
            "status": "active",
            "name": "WhatsApp",
            "icon": "whatsapp",
            "color": "black",
            "hvcolor": "white",
            "hvback": "green",
            "hover": "true",
            "type": "file",
            "link": "https://www.google.com/search?q=biz360expo.com"
          },
          {
            "icon_id": 8,
            "status": "active",
            "name": "Telegram",
            "icon": "telegram",
            "color": "black",
            "hvcolor": "white",
            "hvback": "#0dbbe0",
            "hover": "true",
            "type": "file",
            "link": "https://t.me/biz360expo"
          },
          {
            "icon_id": 9,
            "status": "active",
            "name": "Messenger",
            "icon": "messenger",
            "color": "black",
            "hvcolor": "white",
            "hvback": "#448AFF",
            "hover": "true",
            "type": "file",
            "link": "https://m.me/biz360expo"
          }
        ]
      }
    },
    "basic_info": {
      "biz_email": "fahim@google.com",
      "biz_mobile": "01701701701",
      "show_popup": "No",
      "biz_address": "House: 11, Road: 12, Shekertek, Adabor",
      "biz_name": "Fahim Bakery Limited",
      "fullname": "Khondokar Fahim"
    },
    "menu_list": [
      {
        "menu_name": "{\"bn\": \"হোম\", \"en\": \"Home\"}",
        "page_name": "/p/fahim/",
        "menu_id": 1
      },
      {
        "menu_name": "{\"bn\": \"আমার সম্পর্কে\", \"en\": \"About Me\"}",
        "page_name": "/p/fahim/about-us",
        "menu_id": 2
      },
      {
        "menu_name": "{\"bn\": \"যোগাযোগ করুন\", \"en\": \"Contact Us\"}",
        "page_name": "/p/fahim/contact-us",
        "menu_id": 3
      }
    ],
    "language_list": [
      {
        "language_code": "bn",
        "language_name": "বাংলা"
      },
      {
        "language_code": "en",
        "language_name": "English"
      }
    ],
    "home":   {
      "navpanel": {
        "logo": 'http://192.168.1.195:8081/biz360_files/com/group/biz360expo.jpg'
      },
      "bodypanel": {
        "title": 'Hi',
        "subtitle": 'This is your homepage'
      }
    },
  },
  "tag": "success",
  "type": "get_member_home_content"
}

export   const MODULES = [
  { "module_id": 200, "page_name": "/about", "module_name_en": "At a Glance" },
  { "module_id": 300, "page_name": "/services", "module_name_en": "Product and Service" },
  { "module_id": 400, "page_name": "/technology",  "module_name_en": "Competency" },
  { "module_id": 500, "page_name": "/clients",  "module_name_en": "Proud to Serve" },
  { "module_id": 400, "page_name": "/contact", "module_name_en": "Get in Touch" },
  { "module_id": 400, "page_name": "/careers", "module_name_en": "Career", }
];