<template>
  <div @click="chooseCommunity" class="community-item i-class" data-val="item">
    <div class="group-img">
      <img class="group-head" :src="item.headImg||item.disUserHeadImg"
           v-if="item.headImg||item.disUserHeadImg"/>
      <img class="group-head" src='@/assets/images/head-bitmap.png' v-else/>
      <span class="rest" v-if="item.rest==1">{{$t('host.xiuxi')}}</span>
    </div>
    <div class="item-center">
      <div class="community-title">
        <span class="span">{{item.communityName}}</span>
        <span class="em" :style="{'color':skin.color}" v-if="item.distance">{{$t('host.juli')}}&nbsp;{{item.distance}}</span>
      </div>
      <div class="group-master">
        {{groupInfo.owner_name}}：{{item.realName||item.disUserName}}
        <img class="right-arrow" src='@/assets/images/community-right-arrow.png'/>
      </div>
      <div class="community-address" v-if="hiddenDetails==0">{{item.fullAddress||item.communityAddress}}</div>

      <div class="community-date" v-for="(item,index) in item.times">
        {{item.md}}({{ $t('week.'+item.week_key) }}) :
        <span class="span" v-if="item.times.length>0">
          <span class="span" v-if="item.times[0]"> {{item.times[0]}}</span>
          <span class="span" v-if="item.times[1]"> , {{item.times[1]}}</span>
          <span class="span" v-if="item.times[2]"> , {{item.times[2]}}</span>
        </span>
        <span class="span" v-else>{{$t('host.meishijian')}}</span>
      </div>

    </div>


  </div>

</template>

<script>
  import utils from '../../utils/index'
  var  location = require("../../utils/Location");
  export default {
    name: 'i-community-item',
    props:{
      item: {
        type: Object,
        default: {
          rest: 0
        }
      },
      city: Object,
      isOld: true,
      groupInfo: {
        type: Object,
        default:()=> {
          return {
            group_name: 'Estate',
            owner_name: 'Host'
          };
        }
      },
      hiddenDetails: {
        type: Number,
        default: 0
      },
      skin: {
        type: Object
      }
    },
    methods: {
      chooseCommunity: function(e) {
        var app = this.$getApp();
        var t = this.item;

        var i = t.disUserHeadImg || t.headImg || "", n = t.disUserName || t.realName || "", a = {
          communityId: t.communityId,
          communityName: t.communityName,
          disUserName: n,
          disUserHeadImg: i,
          communityAddress: t.communityAddress,
          distance: t.distance,
          fullAddress: t.fullAddress || t.communityAddress
        }, m = this.city;
        utils.changeCommunity(a, m);
      }
    }
  }
</script>

<style scoped>
  .community-item {
    box-sizing: border-box;
    display: flex;
    padding: 7vw 4vw;
  }

  .community-item .group-head {
    width: 10vw;
    height: 10vw;
    border-radius: 10vw;
  }

  .community-item .community-title {
    font-size: 4vw;
    line-height: 4vw;
    height: 4vw;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .community-item .community-title .span {
    color: #444;
    font-weight: 500;
  }

  .community-item .community-title .em {
    color: #ff5344;
    font-size: 2.6vw;
    line-height: 2.6vw;
    white-space: nowrap;
  }

  .community-item .community-address {
    font-size: 3vw;
    line-height: 4vw;
    color: #666;
    width: 70vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .community-item .community-date {
    margin-top: 0.5vw;
    font-size: 3.8vw;
    line-height: 4.2vw;
    color: #aaa;
    width: 70vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .community-item .group-master {
    width: 100%;
    font-size: 4vw;
    line-height: 4vw;
    color: #aaa;
    position: relative;
    margin-bottom: 1vw;
  }

  .community-item .group-master .right-arrow {
    position: absolute;
    right: 0;
    top: 0;
    width: 2vw;
    height: 4vw;
  }

  .group-img {
    position: relative;
    width: 14vw;
    height: 14vw;
    border-radius: 10vw;
    margin-right: 3.3vw;
    overflow: hidden;
  }

  .rest {
    position: absolute;
    left: 0;
    bottom: 1vw;
    right: 0;
    font-size: 3vw;
    background: rgba(255, 83, 68, 0.8);
    text-align: center;
    color: #fff;
    padding: 0.1vw 0 0.1vw;
  }
</style>
