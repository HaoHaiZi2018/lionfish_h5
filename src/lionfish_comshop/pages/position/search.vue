<template>
  <div class="page">
    <div class="header-content">
      <div class="search-content">
        <div class="city-content">
          <img class="position-search-icon" src="@/assets//images/icon-search.png"/>
        </div>
        <input @keypress="subInput" v-model="inputValue" class="ipt-class"
               :placeholder="$t('host.shurushequming')" type="search"/>

        <div class="search-icon2" @click="clearSearch">
          <img style="width: 4vw;height: 4vw;margin-top: 2vw"
                 src="@/assets/images/img-close.png"/>
        </div>
      </div>
    </div>
    <i-community-item :city="city" class="item-border" :groupInfo="groupInfo" :item="item" :skin="skin"
                      v-for="(item,index) in communities" :key="item.id"></i-community-item>
    <i-load-more iClass="load-more" :loading="loadMore" :tip="inputValue?tip:'请输入'+groupInfo.group_name+'名'"
                 v-if="!noResult"></i-load-more>
    <div class="no-result" v-if="noResult&&tip">
      <img src="@/assets//images/noData.png"/>
      {{tip}}
    </div>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import status from '../../utils/index.js'

  var app, wx

  export default {
    mixins: [GlobalMixin],
    name: 'position-search',
    data() {
      return {
        communities: [],
        city: {
          districtName: ''
        },
        cityName: '',
        inputValue: '',
        loadMore: !1,
        noResult: !0,
        latitude: '',
        longitude: '',
        hasRefeshin: !1,
        pageNum: 1,
        groupInfo: {
          group_name: '社区',
          owner_name: '团长'
        },
        tip: ''
      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx
      wx.setNavigationBarTitle({
        title: 'Community',
        showLogo: false,
        showMore: false,
        showBack: true
      })
      const t = this.$route.query

      this.onLoad(t)
    },
    methods: {
      onLoad: function(t) {
        var a = this
        status.setNavBgColor()
        var e = wx.getStorageSync('city'), i = wx.getStorageSync('shopname')
        i && wx.setNavigationBarTitle({
          title: i,
          showLogo: false,
          showMore: false,
          showBack: true
        }), status.setGroupInfo().then(function(t) {
          a.groupInfo = t
        }), (
          a.city = e,
            a.cityName = e.districtName
        )
      },
      onReady: function() {
      },
      onInput: function(t) {
        console.log(t.value)
        this.inputValue = t.value
      },
      subInput: function() {
        if (event.keyCode == 13) { //如果按的是enter键 13是enter
          this.communities = [];
          this.pageNum = 1
          this.hasRefeshin = !1
          if (/^\d{6}$/.test(this.inputValue)) {
            var t = wx.getStorageSync('token'),i = this, n = this.inputValue
            app.util.request({
              url: 'entry/wxapp/index',
              data: {
                controller: 'index.load_address',
                token: t,
                zipCode:n
              },
              dataType: 'json',
              success: function(t) {
                var data = t
                console.log(data.results[0])
                if (data.found > 0) {
                  var result = data.results[0]
                  i.load_gps_community_list('',result.LATITUDE,result.LONGITUDE)
                }
              }
            })

          }else{
            this.load_gps_community_list()
          }
        }

      },
      clearSearch: function() {
        this.inputValue = "";
      },
      load_gps_community_list: function(n,a,e) {
        if(a == null || a == undefined){
          a = wx.getStorageSync('latitude');
        }
        if(e == null || e == undefined){
          e = wx.getStorageSync('longitude')
        }
        if(n == null || n == undefined){
          n = this.inputValue;
        }

        var t = wx.getStorageSync('token') , i = this
        i.hasRefeshin || ((
          i.hasRefeshin = !0,
            i.loadMore = !0
        ), app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.load_gps_community',
            token: t,
            inputValue: n,
            pageNum: i.pageNum,
            longitude: e,
            latitude: a
          },
          dataType: 'json',
          success: function(t) {

            if (0 == t.code) {
              var a = i.communities.concat(t.list)
              i.communities = a
              i.pageNum = i.pageNum + 1
              i.loadMore = !1
              i.hasRefeshin = !1
              i.tip = ''
            } else {
              1 == t.code ? (
                i.loadMore = !1,
                  i.tip = 'Please try again'
              ) : t.code
            }
          }
        }))
      },
      onShow: function() {
      },
      onHide: function() {
      },
      onUnload: function() {
      },
      onPullDownRefresh: function() {
      },
      onReachBottom: function() {
        this.load_gps_community_list()
      }
    }
  }
</script>

<style scoped>
  .page {
    background: #fff;
  }

  .search-icon2 {
    position: absolute;
    right: 20px;
    margin-left: 13px;
    margin-right: 6px;
  }


  .no-result {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #666;
    font-size: 3vw;
    padding-top: 40vw;
  }

  .no-result img {
    width: 25vw;
    height: 25vw;
    margin-bottom: 3vw;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vw;
    border-bottom: 0.1vw solid rgba(0, 0, 0, 0.1);
  }

  .search-content {
    width: 85vw;
    height: 8vw;
    border-radius: 6vw;
    background: #f8f8f8;
    position: relative;
    line-height: 6vw;
    display: flex;
  }

  .search-content .city-content {
    height: 9vw;
    padding: 0 2vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 2.6vw;
    color: #444;
    white-space: nowrap;
    font-weight: bold;
  }

  .search-content .city-content .position-search-icon {
    width: 2.8vw;
    height: 2.8vw;
    margin-right: 2vw;
    margin-left: 2vw;
    margin-top: -1vw;
  }

  .search-content .city-content .bottom-arrow {
    width: 1vw;
    height: 1vw;
    margin-left: 2vw;
  }

  .search-content .search-ipt {

    flex: 1;
  }

  .search-content .ipt-class {
    line-height: 6vw;
    margin-top: 1vw;
    background: #f8f8f8;
    width: 70vw;
    height: 6vw;
    font-size: 3vw;
    color: #444;
    border: none;
    outline: none;
  }

  .search-content .input-placeholder {
    color: #999;
  }

  .load-more {
    padding: 4vw 0;
  }
</style>
