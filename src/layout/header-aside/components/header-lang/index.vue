<template>
  <el-dropdown placement="bottom" size="small" @command="handleChange">
    
    <el-button class="d2-mr btn-text can-hover" type="text" >
    <d2-icon name="globe" style="font-size: 18px;"><span class="btn-text"> {{ $t('pub.lang') }}</span></d2-icon>
  </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="cn">
        <d2-icon :name="iconName('cn')" class="d2-mr-5"/>中文
      </el-dropdown-item>
      <el-dropdown-item command="en">
        <d2-icon :name="iconName('en')" class="d2-mr-5"/>English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import util from '@/libs/util.js'
export default {
  name: 'd2-header-lang',
  computed: {
    ...mapState('d2admin/lang', [
      'value'
    ])
  },
  watch: {
    // 注意 这里是关键
    // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
    value: {
      handler (val, oldVal) {
        // https://github.com/d2-projects/d2-admin/pull/129
        if (oldVal) {
          // 这个情况在已经加载完页面 用户改变了尺寸时触发
          this.$ELEMENT.lang = val
          // 由于已经加载过设置 需要清空缓存设置
          this.pageKeepAliveClean()
          // 由于已经加载过设置 需要刷新此页面
          this.$router.replace('/refresh')
        } else {
          // 这个情况在刷新页面时触发
          this.$ELEMENT.lang = val
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'd2admin/page/keepAliveClean'
    }),
    ...mapActions({
      langSet: 'd2admin/lang/set'
    }),
    handleChange (value) {
      this.langSet(value)
      this.$i18n.locale = value
      util.cookies.set('lang', this.$i18n.locale)
      location.reload();
    },
    iconName (name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    }
  }
}
</script>
