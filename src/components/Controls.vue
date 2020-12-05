<template>
  <div class="controls">
  	<div class="btnItem fl-left">
  	<i class="el-icon-arrow-left btn pre" title="上一首"></i>
    <i class="el-icon-video-play btn play"  @click="play" v-if="isplaying" title="播放"></i>
    <i class="el-icon-video-pause btn pause" @click="pause" v-if="!isplaying" title="暂停" ></i>
  	<i class="el-icon-arrow-right btn next" title="下一首"></i>

    </div>
    
    <div class="post fl-left">
    <img src="https://p1.music.126.net/flFrObLA9GZdj8B0b6ni1A==/109951165480807278.jpg?param=34y34"  width="35px" height="35px"/>
    </div>
    
    <div class="songAttr fl-left">
    	<span class="songName">是但求其爱</span>
    <span class="songArtist">陈奕迅</span>
    </div>
    
    <div class="slider fl-left">
    <!--<span class="demonstration">隐藏 Tooltip</span>-->
    <el-slider  v-model="currentTime" :show-tooltip="false"></el-slider>
  </div>
  
  <div class="currentTime">
    <!--<h2>当前播放时间：{{currentTime}}s</h2>-->
    </div>
    
      	<!--<button><i class="el-icon-bell btn volume"></i></button>-->
  	<!--<i class="el-icon-tickets btn playlist" title="播放列表"></i>-->
  </div>
</template>

<script>
  export default {
    name: 'Controls',
    data() {
      return {
      	value3:0,
        isplaying:true,
      }
    },
		
    computed: {
      //引用audio元素
      audioElement() {
        return this.$store.state.audioElement;
      },

      //当前音频播放时间
      currentTime:{
      	get:function(){
      		return this.$store.state.currentTime;
      	},
      	set:function(){
      		
      	}
        
      },
      
      currentDuration() {
        return this.$store.state.currentDuration;
      }
    },

    methods: {
//			formatTooltip(val) {
//      return val / this.currentDuration;
//   },
      //播放音频
      play() {
        console.log('this.audioElement ==> ', this.audioElement);
        this.audioElement.play();
        this.isplaying = !this.isplaying;
//      this.value3 = this.currentTime/this.currentDuration;
        console.log("this.isplaying==>",this.isplaying);

//      console.log("this.value3==>",this.value3);
      },

      //暂停音频
      pause() {
        this.audioElement.pause();
        this.isplaying = !this.isplaying;
        console.log("this.isplay==>",this.isplaying)
        
        
      }
    }
  }
</script>

<style lang="scss" scoped>
		*{
			margin: 0;
			padding: 0;
			list-style: none;
		}
		.fl-left{
			float: left;
		}
		.post{
			
		}
		.slider{
			/*margin-top: 10px;*/
			
		}
		.btn{
			/*margin-top: ;*/
			font-size: 25px;
			background-color: rgb(46,46,46);
			color: white;
			cursor: pointer;
			/*outline: red;*/
			/*border: red;*/
		}
		.btnItem{
			margin-top: 10px;
			margin-left: 10px;
		}
		.controls{
			position: relative;
			width: 100%;
			height: 50px;
			background-color: rgb(46,46,46);
		}
		.post{
			/*position: absolute;
			z-index: 99;*/
			margin-top: 6px;
			margin-left: 68px;
		}
		.songAttr{
			position: absolute;
			left: 200px;

			.songName{
				font-size: 13px;
			color: white;
				
			}
			.songArtist{
				margin-left: 20px;
				font-size: 10px;
				color: darkgray;
			}
		}
		.slider{
			width: 600px;
			margin-left: 100px;
			position: absolute;
			top: 15px;
			left: 100px;
		}
		.play{
			/*display: none;*/
		}
		.pause{
			/*display: none;*/
		}
		.currentTime{
			position: absolute;
			left: 500px;
		}

		.playlist{
			position: absolute;
			right: 28%;
			top: 10px;
			
			
		}
		
</style>