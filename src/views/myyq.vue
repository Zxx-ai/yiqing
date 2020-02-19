<template>
  <div class="app">
    <div class="pege">
      <div class="pege-to">
        <img alt src="https://i.loli.net/2020/02/14/pOhn3cgb7uLqQvZ.png" />
        <p>{{title}}</p>
      </div>
      <div class="pege-box">
        <div class="quan">
          <span class="epidemic1">全国确诊</span>
          <div class="epidemic">
            <p>{{chinaTotal.confirm}}</p>
          </div>
          <div class="quantext">
            <p>较昨日</p>
            <p>+{{chinaAdd.confirm}}</p>
          </div>
        </div>

        <div class="quan">
          <span class="shadow">疑似病例</span>
          <div class="epidemic shadow">
            <p>{{chinaTotal.suspect}}</p>
          </div>
          <div class="quantext color2">
            <p>较昨日</p>
            <p>+{{chinaAdd.suspect}}</p>
          </div>
        </div>

        <div class="quan">
          <span class="shadow2">治愈人数</span>
          <div class="epidemic shadow2">
            <p>{{chinaTotal.heal}}</p>
          </div>
          <div class="quantext color3">
            <p>较昨日</p>
            <p>+{{chinaAdd.heal}}</p>
          </div>
        </div>

        <div class="quan">
          <span class="shadow3">死亡人数</span>
          <div class="epidemic shadow3">
            <p>{{chinaTotal.dead}}</p>
          </div>
          <div class="quantext color4">
            <p>较昨日</p>
            <p>+{{chinaAdd.dead}}</p>
          </div>
        </div>
      </div>

      <div class="time">
        <p>统计截止于</p>
        <span>{{lastUpdateTime}}</span>
        <p>更新于</p>
        <span>{{lastUpdateTime | timeFormat}}前</span>
      </div>

      <div class="loader"  type="button"  onclick="javascript:location.reload()">
       
          <span></span>
          <span></span>
          <span></span>
          <span></span>
     
      </div>

      <div class="dt">地图详情</div>
    </div>

    <!-- <iframe src="html5-map-distribute-animation/index.html" frameBorder="0" width="100%" scrolling="no"  height="900"></iframe> -->
  </div>
</template>
<script>
import httpJsonp from 'http-jsonp'
export default {
  filters: {
    timeFormat: function(msg, arg) {
      let timestamp = new Date().getTime()
      let __lasttime = msg.replace(/-/g, '/')
      let result = parseInt(timestamp - Date.parse(__lasttime))
      return parseInt(result / 1000 / 60) + '分钟'
    }
  },

  data() {
    return {
      title: '肺炎疫情星播报',
      isLoad: false,
      lastUpdateTime: null,
      chinaTotal: {},
      chinaAdd: {}
    }
  },
  created() {
    this.show()
    this.getdata()
  },

  methods: {
    show() {
      //author:caibaojian
      //website:http://caibaojian.com
      //weibo:http:weibo.com/kujian
      //兼容UC竖屏转横屏出现的BUG
      //自定义设计稿的宽度：designWidth
      //最大宽度:maxWidth
      //这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
      ;(function(designWidth, maxWidth) {
        var doc = document,
          win = window,
          docEl = doc.documentElement,
          remStyle = document.createElement('style'),
          tid
 
        function refreshRem() {
          var width = docEl.getBoundingClientRect().width
          maxWidth = maxWidth || 540
          width > maxWidth && (width = maxWidth)
          var rem = (width * 10) / designWidth
          remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'
        }

        if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(remStyle)
        } else {
          var wrap = doc.createElement('div')
          wrap.appendChild(remStyle)
          doc.write(wrap.innerHTML)
          wrap = null
        }
        //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
        refreshRem()

        win.addEventListener(
          'resize',
          function() {
            clearTimeout(tid) //防止执行两次
            tid = setTimeout(refreshRem, 300)
          },
          false
        )

        win.addEventListener(
          'pageshow',
          function(e) {
            if (e.persisted) {
              // 浏览器后退的时候重新计算
              clearTimeout(tid)
              tid = setTimeout(refreshRem, 300)
            }
          },
          false
        )

        if (doc.readyState === 'complete') {
          doc.body.style.fontSize = '16px'
        } else {
          doc.addEventListener(
            'DOMContentLoaded',
            function(e) {
              doc.body.style.fontSize = '16px'
            },
            false
          )
        }
      })(750, 750)
    },
    getdata() {
      //保留当前this指向
      let _self = this
      httpJsonp({
        url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
        callbackProp: 'callback',
        callback: function(res) {
          let data = JSON.parse(res.data)

          _self.chinaTotal = data.chinaTotal
          _self.lastUpdateTime = data.lastUpdateTime
          _self.chinaAdd = data.chinaAdd
          _self.isLoad = true
        },
        error: function(err) {},
        complete: function() {}
      })
    }
  }
}
</script>
<style scoped>
</style>
