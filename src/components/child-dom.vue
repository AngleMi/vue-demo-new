<template>
    <div>
        <p>我是子组件,我是父组件传过来的值foo:{{foo}}</p>
        <child-dom-child v-bind="$attrs" v-on="$listeners"></child-dom-child>
    </div>
</template>
<script>
import childDomChild from './child-dom-child.vue'
export default {
  name: 'childDom',
  props: ['foo'],
  inheritAttrs: false,
  components: { childDomChild }
}
</script>
