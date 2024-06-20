/**
 * 将时间戳格式化为特定的时间格式
 * @param {Number} timeStamp 时间戳
 * @param {Boolean} clock 是否显示时分秒
 * @returns {String} 格式化后的日期
 */
export default function (timeStamp, clock = false) {
  const time = new Date(+timeStamp);
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;
  let day = time.getDate();
  day = day >= 10 ? day : `0${day}`;
  if (!clock) return `${year}-${month}-${day}`;
  let hour = time.getHours();
  hour = hour >= 10 ? hour : `0${hour}`;
  let minute = time.getMinutes();
  minute = minute >= 10 ? minute : `0${minute}`;
  let second = time.getSeconds();
  second = second >= 10 ? second : `0${second}`;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
