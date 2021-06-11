/**
 * Title : index <br>
 * Company : 北京华宇元典信息服务有限公司 <br>
 * Description : - . -
 *
 *
 * @author  stupid
 * @version
 * @date    2021/6/8 17:29
 */

const unique = (arr) => {
  const res = new Map()
  return arr.filter(item => !res.has(item.id) && res.set(item.id, 1))
}

/** 反转字符  */
const reverse = str => str.split('').reverse().join('')
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
const addTwoNumbers = function(l1, l2) {
  let head = null, tail = null;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  return head;
}
