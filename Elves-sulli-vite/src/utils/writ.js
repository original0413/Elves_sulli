// 将传入对象作为原型
function create (obj) {
  function Fn(){}
  Fn.prototype = obj
  return Fn()
}

// instanceof
function myInstanceof (left, right) {
  let proto = Object.getPrototypeOf(left), prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

/**
 *  new()
 * （1）首先创建了一个新的空对象
 * （2）设置原型，将对象的原型设置为函数的 prototype 对象。
 * （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
 * （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
 * */
function objectFactory1() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
// objectFactory(构造函数, 初始化参数);


// myPromise
const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

function MyPromise (fn) {
  const self = this
  this.state = PENDING
  // 用户保存resolve / reject传入的值
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve (value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVE
        self.value = value
        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }

  function reject (value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECT
        self.value = value
        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === 'function'
    ? onResolved
    : function (value) {
        return value
      }

  onRejected = typeof onRejected === 'function'
    ? onRejected
    : function (error) {
        throw error
      }

  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }

  if (this.state === RESOLVE) {
    onResolved(this.value)
  }

  if (this.state === REJECT) {
    onRejected(this.value)
  }

}