import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './lang/cn'
import en from './lang/en'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'cn',
  messages: {
    'en': Object.assign(en, enLocale),
    'cn': Object.assign(cn, zhLocale)
  }
})
