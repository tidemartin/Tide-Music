<template>
	<div class="Playlist">
			<el-backtop :bottom='40'>
				<div class="top"></div>
			</el-backtop>
		
		<div class="nav" >
			<input class="all nav-title"  v-model="navtitle" disabled=""> </input>

			 



		<!--<button><b class="choose" @click="showall()">  选择分类 <i class="el-icon-caret-bottom"></i></b></button>-->
			<!--<div class="nav-item fl-left" v-show="ishow" >
				<li><b>全部风格</b></li>
				<ul > <b>语种</b>
					<br />
					<li class="language">华语|</li>
					<li class="language">欧美|</li>
					<li class="language">日语|</li>
					<li class="language">韩语|</li>
					<li class="language">粤语|</li>
				</ul>
				<br />
				<ul class="fl-left"> <b>风格</b> 
					<br />
					<li class="sty">流行|</li>
					<li class="sty">摇滚|</li>
					<li class="sty">民谣|</li>
					<li class="sty">电子|</li>
					<li class="sty">舞曲|</li>
					<li class="sty">说唱|</li>
					<li class="sty">轻音乐|</li>
					<li class="sty">爵士|</li>
					<li class="sty">乡村|</li>
					<li class="sty">R&B/Soul|</li>
					<li class="sty">古典|</li><br />
					<li class="sty">民族|</li>
					<li class="sty">英伦|</li>
					<li class="sty">金属|</li>
					<li class="sty">朋克|</li>
					<li class="sty">蓝调|</li>
					<li class="sty">雷鬼|</li>
					<li class="sty">世界音乐|</li>
					<li class="sty">拉丁|</li>
					<li class="sty">New Age|</li>
					<li class="sty">古风|</li><br />
					<li class="sty">后摇|</li>
					<li class="sty"> Bossa Nova|</li>
				</ul>
				<br />
				<br />
				<br />
				<br />
				<ul > <b>场景</b>
					<br />
					<li class="sitution">清晨|</li>
					<li class="sitution">夜晚|</li>
					<li class="sitution">学习|</li>
					<li class="sitution">午休|</li>
					<li class="sitution">下午茶|</li>
					<li class="sitution">地铁|</li>
					<li class="sitution">运动|</li>
					<li class="sitution">旅行|</li>
					<li class="sitution">散步|</li><br />
					<li class="sitution">酒吧|</li>
				</ul>
				<br />
				
				<ul > <b>情感</b>
					<br />
					<li class="sitution">怀旧|</li>
					<li class="sitution">清新|</li>
					<li class="sitution">浪漫|</li>
					<li class="sitution">伤感|</li>
					<li class="sitution">治愈|</li>
					<li class="sitution">放松|</li>
					<li class="sitution">孤独|</li>
					<li class="sitution">感动|</li>
					<li class="sitution">兴奋|</li>
					<li class="sitution">快乐|</li>
					<li class="sitution">安静|</li><br />
					<li class="sitution">思念|</li>
					
				</ul>
				<br />				
				<ul ><b>主题</b> 
					<br/>
					<li class="sty">综艺|</li>
					<li class="sty">影视原声|</li>
					<li class="sty">ACG|</li>
					<li class="sty">儿童|</li>
					<li class="sty">校园|</li>
					<li class="sty">游戏|</li>
					<li class="sty">70后|</li>
					<li class="sty">80后|</li>
					<li class="sty">90后|</li>
					<li class="sty">网络歌曲|</li><br />
					<li class="sty">KTV|</li>
					<li class="sty">经典|</li>
					<li class="sty">翻唱|</li>
					<li class="sty">歌唱|</li>
					<li class="sty">吉他|</li>
					<li class="sty">钢琴|</li>
					<li class="sty">器乐|</li>
					<li class="sty">榜单|</li>
					<li class="sty">00后|</li>
					
				</ul>
			</div>-->
		</div>
		
		
		<div class="playlist-content">

			<ul v-for="item in playlists">
			<li class="fl-left" @click="goPlaylist(item.id)">
				<img :src="item.coverImgUrl" width="150px" height="150px"/><br />
				<span class="palyCount">播放量:  {{item.playCount}}</span><br />				
				<span class="palylistTitle of-hidden">{{item.name}}</span><br />
				<span class="palylistAuthor of-hidden"> by {{item.creator.nickname}}</span>
			</li>
			</ul>
		</div>
		
		

	</div>

</template>

<script>
	export default {
		data() {
			return {
				playlists: [],
				isCollapse: true,
				ishow:false,
				navtitle:'全部歌单',
			}
		},
		created() {
			this.getPlayListDataFromServer();
		},
		methods: {
			goPlaylist(id){
				this.$router.push({name:'Playlists',params:{id:id}});
			},
			showall(){
				this.ishow = !this.ishow;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			getPlayListDataFromServer() {
				this.axios("http://localhost:3000/top/playlist").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.playlists = res.data.playlists;
						for(var i = 0; i < res.data.playlists.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.playlists, i, res.data.playlists[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.playlists==>", this.playlists);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	*{
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.of-hidden{
		overflow: hidden;
	}
	.fl-left{
		float: left;
	}
	.fl-right{
		float: right;
	}
	.Playlist{
		width: 935px;
		height: 3050px;
		margin-left: 300px;
		background-color: lightgray;
		border: 1px solid white;
		position: relative;		
	}
	
	.playlist-content{
			li{
				width: 150px;
				margin-left:38px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-top: 10px;
				img{
					cursor: pointer;
					/*border: 1px solid black;*/
				}
			}
			.palylistAuthor{
				color: lightslategray;
				font-size: 14px;
			}
		}
	.nav{
		margin-top: 50px;
		.all{
			cursor: pointer;
			font-size: 20px;
			margin-left: 30px;
		}
		.nav-title{
			border: none;
			width: 110px;
			background-color: lightgray;
		}
	}
	.language{
		float: left;
	}
	.sty{
		float: left;
		
	}
	.sitution{
		float: left;
	}
	.nav-item{
		width: 700px;
		height: 340px;
		margin-left: 30px;
		z-index: 99;
		background-color: white;
		border: 3px solid darkgray;
		/*outline: darkgray;*/
		li{
			margin-left: 2px;
			cursor: pointer;
			/*font-size: 20px;*/
		}
		li:hover{
			color: dimgray
		}
		.el-scrollbar__wrap {
    overflow: scroll;
    height: 100%;
}  
.page-component__scroll  {
    height: 500px;
}
	}
</style>