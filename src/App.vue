<template>
  <div id="app">
		<Musictop></Musictop>
     <!--<Controls ></Controls>-->
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
      	<!--<button><i class="el-icon-bell btn volume"></i></button>-->
  	<!--<i class="el-icon-tickets btn playlist" title="播放列表"></i>-->
  </div>
 	 <router-view></router-view> 
  <!--<Musicfooter/>-->
  <!--<router-view></router-view>-->
  <audio ref="audio" :src="audioSrc"  @timeupdate="listenAudioChange"></audio>

  </div>
</template>

<style lang="scss">
body{
	background-color: rgb(242, 242, 242)
}
.app{
	/*position: relative;*/

}
.controls{


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
			/*position: relative;*/
				position: fixed;
	z-index: 99;
	/*background-color: red;*/
	/*margin-top: 50%;*/
	bottom: 0;
	left: 0;
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
<script type="text/javascript">
		import Musicfooter from './components/Musicfooter';
	import Musictop from './components/Musictop';
	import Controls from './components/Controls';
	
 export default{
 	data(){
 		return{
 			searchInp:'',
 			value3:0,
        isplaying:true,
// 			bottom:10,
 		}
 	},
 	methods:{
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
        
        
      },
			//监听音频变化
      listenAudioChange(){
        console.log('a');
        //获取音频当前播放时间
        let currentTime = this.audioElement.currentTime;
        let currentDuration = this.audioElement.duration;
        console.log('currentTime ==> ', currentTime);
        console.log('currentDuration ==> ', currentDuration);

        this.changeCurrentTime(currentTime);
        this.changeCurrentDuration(currentDuration);
        this.changeValue3();
        console.log('value3 ==> ', this.$store.state.value3);
        
      },
      //修改audio元素，保存在公共数据 state
      changeAudio(audio) {
        this.$store.commit('initAudio', audio);
      },

      //修改state.currentTime
      changeCurrentTime(t) {
        this.$store.commit('changeCurrentTime', t);
      },
      changeCurrentDuration(t) {
        this.$store.commit('changeCurrentDuration', t);
      	
      },
      changeValue3() {
        this.$store.commit('changeValue3');
      },
 		
 	},
 	created() {

      //获取audio元素
      this.$nextTick(() => {
        console.log('this.$refs ==> ', this.$refs);

        this.changeAudio(this.$refs.audio);
      })
    },
 	computed: {

      //音频链接
      audioSrc() {
        return this.$store.state.audioSrc;
      },

      //音频元素
      audioElement() {
        return this.$store.state.audioElement;
      },
            //引用audio元素
      audioElement() {
        return this.$store.state.audioElement;
      },
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
 	components: {
			Musicfooter,
			Musictop,
			Controls,
		}
 }
</script>
