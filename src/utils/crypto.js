import CryptoJS from "crypto-js";

var iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 偏移量

export let encrypt = (text, key) => {
  key = CryptoJS.enc.Utf8.parse(key); // 秘钥

  var srcs = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.AES.encrypt(srcs, key, { iv: iv }).toString();
};

export let decrypt = (text, key) => {
  key = CryptoJS.enc.Utf8.parse(key); // 秘钥
  var bytes = CryptoJS.AES.decrypt(text.toString(), key, { iv: iv });
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};

export let md5 = text => {
  return CryptoJS.MD5(text).toString();
};
