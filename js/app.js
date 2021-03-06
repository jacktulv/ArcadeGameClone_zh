// 这是我们的玩家要躲避的敌人
 var unitWidth=100;
 var unitHight=83;

var Enemy = function(y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x=-unitWidth;
    this.y=70*y;
    this.speed=speed;


    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite ='images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x+=(this.speed>100?this.speed:100+this.speed)*dt;
    // 觉得太难可以用这个速度 this.x+=100*dt;
    if(this.x>505){
      this.x=-unitWidth;
    }


};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(){
  this.x=202;
  this.y=400;
  this.move=[0,0];//第一个是x 偏移量 第二个是y;
  this.sprite='images/char-boy.png';
};

Player.prototype.update = function() {
  if(this.y+this.move[1]<400-83*4){
    this.x=202;
    this.y=400;
    this.move=[0,0];
    swal(
      'Good job!',
      'success'
    )
  }else if(this.x+this.move[0]>402||this.x+this.move[0]<0){
    this.move=[0,0];
  }else if (this.y+this.move[1]>400) {
   this.move=[0,0];
  }
  else{
   this.x+=this.move[0];
   this.y+=this.move[1];
   this.move=[0,0];
 }

 allEnemies.forEach(function(enemy){
     if(enemy.x<player.x+unitWidth&&enemy.x+unitWidth>player.x&&enemy.y<player.y+unitHight&&enemy.y+unitHight>player.y){
       player.x=202;
       player.y=400;
       player.move=[0,0];
     }
 });

};




Player.prototype.handleInput = function(allowedKeys) {
   switch(allowedKeys){
     case 'left': this.move=[-unitWidth,0]; break;
     case 'up': this.move=[0,-unitHight];break;
     case 'right': this.move=[unitWidth,0];break;
     case 'down': this.move=[0,unitHight]; break;
   }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var  allEnemies=[] ;
for(var i=0;i<6;i++){
  allEnemies.push(new Enemy((i+1<4?i+1:i+1-3),Math.random()*2*100));
}


// 把玩家对象放进一个叫 player 的变量里面
var  player=new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
