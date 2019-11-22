<template>
   <i-modal
    v-model="modalShow"
    :mask-closable="false"
    title="这是一个用于练习父子组件传值的表单"
    footer-hide
     @on-visible-change="handleModalShow"
    >
      <i-form ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
        <i-formItem label="Name" prop="name">
          <i-input v-model="formInfo.name" placeholder="Enter your name"/>
        </i-formItem>
        <i-formItem label="Gender" prop="gender">
          <i-radioGroup v-model="formInfo.gender">
            <i-radio label="male">Male</i-radio>
            <i-radio label="female">Female</i-radio>
          </i-radioGroup>
        </i-formItem>
        <i-formItem label="Desc" prop="desc">
          <i-input
            v-model="formInfo.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          />
        </i-formItem>
        <i-formItem>
          <i-button type="primary" @click="handleSubmit('formInfo')">Submit</i-button>
          <i-button @click="handleReset('formInfo')" style="margin-left: 8px">Reset</i-button>
        </i-formItem>
      </i-form>
    </i-modal>
</template>
<script>
export default {
  name: 'formModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    value (newValue) {
      this.modalShow = newValue
    }
  },
  computed: {},
  data () {
    return {
      modalShow: null,
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleModalShow (currentModalShow) {
      this.$emit('input', currentModalShow)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modalShow = false
        } else {
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
