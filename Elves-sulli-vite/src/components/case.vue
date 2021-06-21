<template>
  <div></div>
</template>

<script>
import { onMounted, reactive, computed } from "vue";

export default {
  setup (props, { emit } ) {
    onMounted(() => {
      console.log('1')
    })
    const state = reactive({
      case: '',
      sortCase: computed(() => state.case.toLowerCase())
    })

    const addCase = () => {
      emit('addNewCase', state)
    }
    // 数组对象去重
    const unique = (arr) => {
      const res = new Map()
      return arr.filter(item => !res.has(item.id) && res.set(item.id, 1))
    }
    // 深拷贝
    const deepClone = (target) => {
      if (typeof target === 'object' && target !== null){
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (let i in target) {
          if (target.hasOwnProperty(i)) {
            cloneTarget[i] = deepClone(target[i])
          }
        }
        return cloneTarget
      } else {
        return target
      }
    }
    // 浅拷贝
    const shallClone = (target) => {
      if (typeof target === 'object' && target !== null) {
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (let i in target) {
          if (target.hasOwnProperty(i)) {
            cloneTarget[i] = target[i]
          }
        }
        return cloneTarget
       } else {
        return target
      }
    }
    // 数组降维 （递归）
    const arrReduction = (arr) => {
      return arrReductionRecursive(arr, [])
    }
    const arrReductionRecursive = (arr, result = []) => {
      arr.forEach(item => {
        item instanceof Array ? arrReductionRecursive(item, result) : result.push(item)
      })
      return result
    }

    // observer

    return {
      state,
      arrReduction,
      shallClone,
      deepClone,
      addCase,
      unique
      // battle
    }
  }
}
</script>