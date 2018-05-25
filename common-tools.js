'use strict';

const getNodeAttribute = (node, attr) => (node.getAttribute(attr) || '').replace(/\s/g, '').split(',');
const nodeHasAttribute = (node, attr, key) => getNodeAttribute(node, attr).indexOf(key) >= 0;

/**
 * getCntHeight - calculate height, width
 * @param {string} target - height, width 
 * @param {string} type - default(border), inner(padding), outer(margin)
 * @param {dom} el 
 */
const RECT_SIZE_DIRECTION = {
  height: ['top', 'bottom'],
  width: ['left', 'right']
};

const RECT_SIZE_TYPE = {
  inner: ['padding'],
  default: ['padding', 'border'],
  outer: ['padding', 'border', 'margin'],
};

function getRectSizeOf(target, type, el) {
  let style = window.getComputedStyle(el);
  return [target].concat((RECT_SIZE_TYPE[type] || [])
      .reduce((current, style) => current.concat((RECT_SIZE_DIRECTION[target] || [])
        .map(direction => style + '-' + direction)), [])
    )
    .map((key) => Number(style.getPropertyValue(key)))
    .reduce((a, b) => a + b, 0);
}

/**
 * getFormattedDate - get formatted date time
 * @param {date} date 
 * @param {string} format 
 */
function getFormattedDate(date, format) {
  date = date || new Date();
  format = format || 'yyyyMMdd';

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hour)
    .replace('mm', minute);
}
