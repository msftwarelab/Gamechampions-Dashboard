import { getFileContents } from "../utils";

export const defaultPathConfig = {
  view: "index",
  inlineStyles: getFileContents(
    ["/inline.css"],
    `/../../${process.env.OUTPUT_FOLDER}`
  ),
  remoteStyles: [
    "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.google.com/specimen/M+PLUS+Rounded+1c?icon.style=Outlined&subset=japanese&noto.script=Hira",
    "https://fonts.google.com/noto/specimen/Noto+Sans+KR?icon.style=Outlined&subset=korean&noto.script=Kore",
    "/vendor.css",
    "/style.css"
  ],
  vendorScripts: [`/vendors~${process.env.BUILD_ID}-main.js`],
  remoteScripts: [
    `/${process.env.BUILD_ID}-main.js`,
    "https://cdn.syspay.com/js/syspay.tokenizer-current.js",
    "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
  ]
};

export const expressConfig = {
  environment: process.env.NODE_ENV,
  isHttps: process.env.IS_HTTPS
};
