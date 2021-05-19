class Ball{
  constructor(x,y,radius,color,ctx,canvas,angle,speed){
    //获取屏幕高度，宽度
    let systeminfo = wx.getSystemInfoSync()
    this.screenWidth = systeminfo.screenWidth //屏幕宽度px
    this.screenHeight = systeminfo.screenHeight //屏幕高度px
    this.windowWidth = systeminfo.windowWidth //可用屏幕宽度px
    this.windowHeight = systeminfo.windowHeight //可用屏幕高度px
    this.ballArray = [] //构造小球参数
    this.x = x //x坐标
    this.y = y //y坐标
    this.radius = radius //半径
    this.color = color //颜色
    this.ctx = ctx //传入画笔
    this.canvas = canvas //画布
    this.angle = angle //角度
    this.speed = speed //速度
    this.renderCount = 0
  }
  //绘画小球
  draw(){
    this.ctx.beginPath()
    this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2)
    this.ctx.fillStyle=this.color
    this.ctx.fill()
  }
  //运动
  update (){
    this.x = (Math.sin(this.angle) * this.speed) + this.x
    this.y =  (Math.cos(this.angle) * this.speed) + this.y + (this.renderCount * 0.3)
    this.renderCount++
    this.draw()
    return this.y
  }
}
class Fuck{
  constructor(res,e){
    //获取屏幕高度，宽度
    let systeminfo = wx.getSystemInfoSync()
    this.screenWidth = systeminfo.screenWidth //屏幕宽度px
    this.screenHeight = systeminfo.screenHeight //屏幕高度px
    this.windowWidth = systeminfo.windowWidth //可用屏幕宽度px
    this.windowHeight = systeminfo.windowHeight //可用屏幕高度px
    this.clickX = e.changedTouches[0].clientX //点击坐标x
    this.clickY = e.changedTouches[0].clientY //点击坐标y
    this.canvas = res[0].node
    this.ctx = this.canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    this.canvas.width = this.windowWidth * dpr
    this.canvas.height = this.windowHeight * dpr
    this.ctx.scale(dpr, dpr)
    this.ballArray = [] //构造小球参数
  }
  randomArray(range){
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }
  //获取随机颜色
  randomColor(){
    const range = ['1', '2', '3', '4', '5', '6', '7', '8','9','0','A','B','C','D','E','F']
    return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
  }
  //随机范围
  randomRange(start, end) {
    return (end - start) * Math.random() + start
}
  //循环小球
  animate(Y){
    //解决方案：this.animate.bind(this)
    //链接：https://blog.csdn.net/biubiubiuPlus/article/details/114316605
    var id =  this.canvas.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0,0,this.windowWidth,this.windowHeight )
    for(var b=0 ;b<this.ballArray.length; b++){
      var Y = this.ballArray[b].update()
    }
    this.id = id
    console.log(this.id);
    if (Y>this.screenHeight*1.3){
      console.log(this.id);
      this.canvas.cancelAnimationFrame(id)
    }
    return this.id
}
  run(){
    //this.ctx.clearRect(0,0,this.screenWidth * this.dpr,this.screenHeight * this.dpr)
    const Y = 0
    var id = this.animate(Y)
    console.log("这是"+id);
    this.canvas.cancelAnimationFrame(id-1)
    for (var i = 0 ;i<12; i++){
      let radius = Math.random()*5
      let x = Math.random() * 4+radius+this.clickX
      let y = Math.random() * 4+radius+this.clickY
      let color = this.randomColor()
      let ctx = this.ctx
      let canvas = this.canvas
      let range = this.randomRange(Math.PI - 1, Math.PI + 1)
      let speed = this.randomRange(1, 6)
      this.ballArray.push(new Ball(x,y,radius,color,ctx,canvas,range,speed))
    }
    // const Y = 0
    // var id = this.animate(Y)
  }
}
module.exports = {Fuck}