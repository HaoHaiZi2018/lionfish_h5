import { Dialog, Toast } from 'vant'
import GetSystemInfoSyncResult from '@/lionfish_comshop/utils/GetSystemInfoSyncResult'
import axios from 'axios'
import store from '../store/'
import router from '../../router/'

export default {

  showToast: function(option) {
    Toast(option.title)
  },
  showLoading: function(option) {
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  },
  hideLoading: function() {

  },
  getStorageSync: function(k) {
    const v = window.localStorage.getItem(k) || '{}'
    if (v != '{}' && v != 'undefined') {
      return JSON.parse(v)
    }
    return {}
  },
  navigateTo: function(o) {
    router.push(o.url)
  },
  setStorageSync: function(k, v) {
    window.localStorage.setItem(k, JSON.stringify(v))
  },
  removeStorageSync: function(k) {
    this.setStorageSync(k, undefined)
  },
  clearStorageSync: function() {
    window.localStorage.clear()
  },
  setNavigationBarColor: function(option) {
    console.log(this)
    store.dispatch('app/setNavBgColor', option.backgroundColor)
    store.dispatch('app/setNavFontColor', option.frontColor)
  },
  setNavigationBarTitle: function(option) {
    store.dispatch('app/setToolbarTitle', option.title)
    if (option.showLogo) {
      store.dispatch('app/showToolbarLogo')
      store.dispatch('app/hideToolbarBack')
    } else {
      store.dispatch('app/hideToolbarLogo')
      if (option.showBack) {
        store.dispatch('app/showToolbarBack')
      } else {
        store.dispatch('app/hideToolbarBack')
      }
    }
    option.showMore ? store.dispatch('app/showToolbarMore') : store.dispatch('app/hideToolbarMore')
  },
  getLogManager: function() {
    return true
  },
  request: function(option) {
    axios({
      method: option.method,
      url: option.url,
      data: option.data,
      responseType: option.responseType
    }).then(function(res) {
      option.success(res)
    }).catch(function(res) {
      option.error(res)
    })
  },
  setStorage: function(option) {
    this.setStorageSync(option.key, option.data)
  },
  hideTabBar: function() {
    return true
  },
  redirectTo: function(option) {
    router.replace(option.url)
  },
  switchTab: function(option) {
    router.push(option.url)
  },
  pageScrollTo: function() {
    window.scrollTo(0, 130)
  },
  getScrollHeight: function() {

  },

  getSystemInfoSync: function() {
    return GetSystemInfoSyncResult
  },
  showModal: function(option) {
    Dialog.confirm({
      title: option.title,
      message: option.content,
      showCancelButton: option.showCancelButton
    }).then(() => {
      option.success({ confirm: true })
    }).catch(() => {
      option.success({ confirm: false })
    })
  },
  getLocation: function(option) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(option.success, option.fail)
    } else {
      this.showModal({
        title: '提示',
        content: '请开启地位权限',
        showCancel: !1
      })
    }
  },

  navigateBack: function() {
    router.go(-1)
  }

}

