<template>
  <treeselect
    :multiple="false"
    :options="departmentOptions"
    :clearable="clearable"
    :flat="true"
    :default-expand-level="defaultExpandLevel"
    :always-open="alwaysOpen"
    :max-height="maxHeight"
    :clear-on-select="clearOnSelect"
    placeholder="请选择"
    style=""
    class=""
    @select = "handleSelect" />

</template>

<script>
  import { getVisibleDepartmentTreeStruct, getCanHandleDepartmentTreeStruct } from '@/api/department'
  import { loopTree } from '@/utils'
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'LoadDepartment',
    components: { Treeselect },
    props: {
      id: { // operatorId 或 ticketId
        type: Number,
        default: null
      },
      clearable: {
        type: Boolean,
        default: false
      },
      allDepartment: {
        type: Boolean,
        default: true
      },
      alwaysOpen: {
        type: Boolean,
        default: true
      },
      clearOnSelect: {
        type: Boolean,
        default: true
      }
    },
    data() {
      console.log(window.innerHeight)
      return {
        departmentOptions: undefined,
        defaultExpandLevel: 6,
        departmentId: undefined,
        closeOnSelect: true,
        maxHeight: window.innerHeight,
        screenHeight: window.innerHeight
      }
    },
    watch: {
      id(newVal, oldVal) {
        this.getDepartment()
      },
      screenHeight(val) {
        this.screenHeight = val
        this.maxHeight = this.screenHeight - 150
      }
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.screenHeight = window.innerHeight
        })()
      }
    },
    created() {
      this.getDepartment()
    },
    methods: {
      getDepartment() {
        if (this.allDepartment) {
          getVisibleDepartmentTreeStruct().then(response => {
            this.departmentOptions = response.data
          })
        } else {
          getCanHandleDepartmentTreeStruct(this.id).then(response => {
            this.departmentOptions = loopTree(response.data)
          })
        }
      },
      handleSelect(val) {
        this.$emit('selectDepartment', { id: this.id, departmentId: val.id })
      }
    }

  }
</script>

<style scoped>

</style>
