import Vue from 'vue'
import Vuex from 'vuex'
// import lianXi from '@/common/store/lianxi.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'apple', done: true },
      { id: 2, text: 'orange', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // getTodoById: (state) => (id) => {
    //   return state.todos.find(todo => todo.id === id)
    // }
    getTodoById (state) {
      return (id) => { return state.todos.find(todo => todo.id === id) }
    }
  },
  mutations: {
    // increment: state => state.count++,
    // increment (state, n) {
    //   state.count += n
    // },
    increment (state, paload) {
      state.count += paload.amount
    },
    decrement: state => state.count--
  },
  actions: {
    incrementAsync ({ commit }, paload) {
      setTimeout(() => {
        commit('increment', paload)
      }, 1000)
    }
  }
})
