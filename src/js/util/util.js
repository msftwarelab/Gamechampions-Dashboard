import {
  PAGE_SIZE_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME
} from "~service/constants";

export const languages = ["en", "es", "fr", "de", "it", "pt", "nl", "kp", "jp"];

export function isElementInViewport(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) { // eslint-disable-line
    el = el[0];
  }

  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}

export function getLanguageFromUrl(url) {
  const regex = new RegExp(languages.join("|"), "gi");
  const matchedLanguages = url && url.match(regex);
  return matchedLanguages && matchedLanguages.length
    ? matchedLanguages[0]
    : null;
}

export function getLanguageFromUrlWithDefault(url) {
  const language = getLanguageFromUrl(url);
  return language || "en";
}

export function getRouteWithoutLanguage(url) {
  if (!url) {
    return url;
  }

  let replacedUrl = url;

  languages.forEach(language => {
    if (url.indexOf(`/${language}`) !== -1) {
      replacedUrl = replacedUrl.replace(`/${language}`, "");
      return false;
    }
  });

  if (!replacedUrl.length || replacedUrl[0] != "/") {
    replacedUrl += "/";
  }

  return replacedUrl;
}

export function toQueryString(obj) {
  let str = [];
  for (let p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    let context = this;
    let args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function returns a universally unique identifier (note this is not RFC4122 compliant)
export function getUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      ?.substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// retrieves a parameter from the query string by name
export function getParameterByName(name, string) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(string || location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return "";
  }
}

// append key=value to query string
export function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export function removeQueryParameter(uri, key) {
  // prefer to use l.search if you have a location/link object
  let prefix = encodeURIComponent(key) + "=";
  let pars = uri.split(/[&;]/g);
  // reverse iteration as may be destructive
  for (let i = pars.length; i-- > 0; ) {
    // idiom for string.startsWith
    if (pars[i].lastIndexOf(prefix) !== -1) {
      pars.splice(i, 1);
    }
  }
  uri = pars.length > 0 ? pars.join("&") : "";
  return uri;
}

export function setCookie(cname, cvalue, exdays) {
  if (typeof window !== "undefined") {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}

export function getCookie(cname) {
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c?.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c?.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export function getReturnUrl({
  location = {},
  previousLocation = {},
  selectedLanguage = "en"
}) {
  const { state = {} } = location;

  if (state.returnUrl) {
    return state.returnUrl;
  } else if (
    previousLocation.pathname &&
    previousLocation.pathname != location.pathname
  ) {
    return previousLocation.pathname;
  }
  return "/" + selectedLanguage;
}

export function onChangePaginationClick(e, pageSizeValue, callback) {
  e.preventDefault();

  // retrieve page number, page size and search string from the URL query string
  let page = getParameterByName(PAGE_QUERY_PARAM_NAME, e.target.href) || 1;
  const pageSize =
    getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, e.target.href) ||
    pageSizeValue;

  // add page number and page size to the URL
  window.history.pushState(null, "", e.target.href);

  // retrieve the data
  return callback({ page, pageSize });
}

export function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function stringStripHtml(html) {
  return html.replace(/(<([^>]+)>)/gi, "");
}
