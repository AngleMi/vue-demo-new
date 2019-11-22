<template>
  <div :style="{fontSize:postFontSize+'em'}">
    <blog-post v-for="post in posts" :key="post.id" :post="post" @enlarge-text="changeText"></blog-post>
    <v-model-component v-model="text"></v-model-component>
    <normal-props-emit :title="message" @changeButtonValue="handleChangeButtonValue"></normal-props-emit>
    <i-button type="primary" @click="setModalShow">点击打开模态框</i-button>
     <form-modal
     ref="formModal"
     v-model="formModal"
     :formInfo="formInfo"
     ></form-modal>
     <alert-box>Something bad happened.</alert-box>
     <div class="dynamic-component-demo">
         <button
         v-for="tab in tabs"
         :key="tab"
         :class="['tab-button',{active:currentTab === tab}]"
         @click="currentTab = tab"
         >{{tab}}</button>
         <component :is="currentTabComponent" class="tab"></component>
     </div>
     <base-input
        v-model="username"
        required
        placeholder="Enter your username"
    >
    </base-input>
    <base-checkbox v-model="lovingVue"></base-checkbox>
    <child-dom :foo="foo" :bar="bar" @updateData="handleUpdatedata"></child-dom>
    <base-layout>
        <template v-slot:header>
            <h1>Here might be a page title</h1>
        </template>
        <template v-slot:default="{user}">
            {{user.lastName}}
        </template>
        <template v-slot:footer>
            <p>Here's some contact info</p>
        </template>
    </base-layout>
    <transition-demo1></transition-demo1>
    <anchored-heading :level="2">标题22<span>hahhah</span></anchored-heading>
    <anchored-heading :level="3">标题33</anchored-heading>
    <div>----以下是路由练习----</div>
      <router-link to="/foo">Go to Foo</router-link>
      <br/>
      <router-link to="/bar">Go to Bar</router-link> <br/>
      <router-link to="/user/1">Go to user1</router-link> <br/>
      <router-link to="/user/2">Go to user2</router-link>
      <router-view/>
  </div>
</template>
<script>
import blogPost from '../components/blog-post.vue'
import vModelComponent from '../components/v-model-component.vue'
import normalPropsEmit from '../components/normal-props-emit.vue'
import formModal from '../components/form-modal.vue'
import alertBox from '../components/alert-box.vue'
import tabHome from '../dynamic components/home.vue'
import tabPosts from '../dynamic components/posts.vue'
import tabArchive from '../dynamic components/archive.vue'
import baseInput from '../components/base-input.vue'
import baseCheckbox from '../components/base-checkbox.vue'
import childDom from '../components/child-dom.vue'
import baseLayout from '../components/base-layout.vue'
import transitionDemo1 from '../components/transition-demo1.vue'
import mixin from '@/utils/mixin.js'

let getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text
  }).join('')
}
export default {
  name: 'index',
  mixins: [mixin],
  components: {
    blogPost,
    vModelComponent,
    normalPropsEmit,
    formModal,
    alertBox,
    tabHome,
    tabPosts,
    tabArchive,
    baseInput,
    baseCheckbox,
    childDom,
    baseLayout,
    transitionDemo1,
    'anchored-heading': {
      render: function (createElement) {
        // console.log(createElement)
        const headingId = getChildrenTextContent(this.$slots.default)
          .toLowerCase()
          .replace(/\W+/g, '-')
          .replace(/(^-|-$)/g, '')
        return createElement(
          'h' + this.level,
          [
            createElement('a', {
              attrs: {
                name: headingId,
                href: '#' + headingId
              }
            }, this.$slots.default)
          ]
        )
        // console.log(this.$slots.default)
        // return createElement(
        //   'h' + this.level, // 标签名称
        //   this.$slots.default // 子节点数组
        // )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    }
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  data () {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ],
      postFontSize: 1,
      text: 'hello world',
      message: 'click me',
      formModal: false,
      formInfo: {
        name: '',
        gender: '',
        desc: ''
      },
      tabs: ['Home', 'Posts', 'Archive'],
      currentTab: 'Home',
      username: '',
      lovingVue: true,
      foo: 'A传向B的值',
      bar: 'A传向C的值'
    }
  },
  created () {
    // console.log(this.message)
    // console.log(this.foo)
    // console.log('组件复用')
  },
  methods: {
    changeText: function (value) {
      this.postFontSize += value
    },
    handleChangeButtonValue (val) {
      this.message = val
    },
    setModalShow () {
      this.formModal = true
      this.$refs.formModal.$refs.formInfo.resetFields()
    },
    handleUpdatedata (val) {
    //   alert(val)
      // console.log(val)
    }
  }
}
</script>
<style>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
