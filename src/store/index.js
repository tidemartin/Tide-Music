import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  //状态(数据)，用法类似组件的data
  state: {
    animals: '鸭子',
    msg: '公共数据',

    book: ['html', 'css', 'js'],

    //音频元素
    audioElement: null, 

    //音频src
    audioSrc: 'https://music.163.com/song/media/outer/url?id=1496602290.mp3',

    //当前音频播放时间
    currentTime: 0,
    
    currentDuration:0,
    value3:0,
    
    currentPlay:{
    	imgurl:'',
    	songName:'',
    	artistName:'',
    	
    },
    
    playList:[
    {
    	imgurl:'',
    	songName:'',
    	artistName:'',
    },
    
    ]

  },

  //修改state的方法, 用法类似组件的methods
  mutations: {

    //修改state.msg
    changeMsg(state, data) {
      //state: 状态
      //data: 组件提交mutation携带过来的参数(载荷)
      console.log('state ==> ', state);
      console.log('data ==> ', data);

      state.msg = data;
    },

    //修改audio
    initAudio(state, audio) {
      state.audioElement = audio;

      console.log('state.audioElement ==> ', state.audioElement);
    },

    //修改currentTime
    changeCurrentTime(state, time) {
      state.currentTime = time;
    },
    changeCurrentDuration(state, time) {
      state.currentDuration = time;
    },
    changeValue3(state) {
      state.value3 = state.currentTime/state.currentDuration;
    },
    changeaudioSrc(state,id){
    	state.audioSrc = 'music.163.com/song/media/outer/url?id='+id+'.mp3';
    },
    changecurrentPlayImgUrl(state,imgurl){
    	state.currentPlay.imgurl = imgurl;
    },
    changecurrentPlaysongName(state,songName){
    	state.currentPlay.songName = songName;    	
    },
    changecurrentPlayartistName(state,artistName){
    	state.currentPlay.artistName = artistName;    	    	
    }
    
  }
})
