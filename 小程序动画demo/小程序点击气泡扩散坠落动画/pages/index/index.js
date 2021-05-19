Page({
  onLoad: function () {
   //获取屏幕高度，宽度
   var systeminfo = wx.getSystemInfoSync()
   var windowWidth = systeminfo.windowWidth //可用屏幕宽度px
   var windowHeight = systeminfo.windowHeight //可用屏幕高度px
   this.setData({
    windowWidth:windowWidth,
    windowHeight:windowHeight,
    fuckbox:`width: ${windowWidth}px; height: ${windowHeight}px;`,
    fucks: `width:${windowWidth}px;height:${windowHeight}px;`
   })

  },
  fuck:function(e){
    wx.vibrateShort({style:"heavy"})
    const query = wx.createSelectorQuery()
      query.select('#fuck')
      .fields({ node: true, size: true })
      .exec(
        (res)=>{
          var Fuck = require("../../fuck").Fuck
          var bitch= new Fuck(res,e)
          bitch.run()
        }
        )
      }
})