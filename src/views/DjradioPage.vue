<template>
	<div class="DjradioPage">
		<div class="playlist">
				<img :src="djradio.picUrl" width="150px" height="150px" alt="排行榜图片" />
				<span class="listName"><span class="type">电台:</span>
			{{djradio.name}}
		</span>
				<div class="btnItem">
					<button style="background-color: dodgerblue;">立即播放</button>
					<!--<button style="background-color: dodgerblue;">添加到播放列表</button>-->
				</div>
				<br />
				<br />
				<div class="songslist">
					<div class="songslist-title" v-if="programs">
						<span>节目列表</span>
						<span class="songNum">共{{programs.length}}期</span>
						<!--<span class="playCount">播放: <span> {{list.playCount}} </span>次</span>-->
					</div>
					<div class="songslist-content">
						<table rules="rows" border="1px solid gray" cellpadding="5px" width="635px">
							<tr>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
							<tr class="songattr" v-for="(program,index) in programs">
								<td>{{index+1}}</td>
								<td><i class="el-icon-video-play"></i>  <span class="songName" @click="goProgram(program.id)" >{{program.name}}</span> </td>
								<td class="songArtist">播放{{program.listenerCount}}</td>
								<td>赞{{program.likedCount}}</td>
							
							</tr>
						</table>
					</div>
				</div>
			</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				programs: [],
				djradio: {},

			}
		},
		created() {
//			console.log(this.$route.name);
//				每次跳转排行榜都要重置data里面的数组,不然数组会一直存在上一个歌单的数据
				this.tracks=[];
				this.getProgramsDataFromServer(this.$route.params.id);
				this.getDjradioDataFromServer(this.$route.params.id); 
					console.log("id==>",this.$route.params.id);
					console.log('route==>',this.$route)
			this.showRoute();
//			this.gorefresh();
			
			//			this.getGloballistDataFromServer();
		},
		methods: {
			goPlaylist(id){
				this.$router.push({name:'Playlists',params:{id:id}});
			},
			goAlbum(id){
				this.$router.push({name:'Albums',params:{id:id}});
			},
			goArtist(id){
				this.$router.push({name:'Artists',params:{id:id}});
			},
			goProgram(id){
				this.$router.push({name:'Programs',params:{id:id}});
			},
			goSong(id){
				this.$router.push({name:'Songs',params:{id:id}});
				
			},
			gorefresh(){
				this.$router.push({name:'Toplists',params:{id:this.$route.params.id}});
				console.log("this.$route.params.id==>",this.$route.params.id)
			},
			showRoute(){
				console.log("route",this.$route)
			},			
			getProgramsDataFromServer(id) {
				this.axios("http://localhost:3000/dj/program?rid="+id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.programs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.programs, i, res.data.programs[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.programs==>", this.programs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getDjradioDataFromServer(id) {
				this.axios("http://localhost:3000/dj/detail?rid="+id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.djradio = res.data.data;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.djradio==>", this.djradio);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			

		}
	}
</script>

<style lang="scss" scoped>
	* {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	
	.fl-left {
		float: left;
	}
	
	.fl-right {
		float: right;
	}
	.el-icon-video-play{
		font-size: 18px;
		cursor: pointer;
	}
	.songslist-title {
		border-bottom: 2px solid red;
		width: 635px;
		span:nth-child(1){
			font-weight: bold;
		}
	}
	
	.listName {
		/*display: inline-block;*/
		font-size: 20px;
		position: absolute;
		top: 50px;
		left: 220px;
		.type{
			background: red;
			color: white;
			border-radius: 5px;
		}
	}
	
	.btnItem {
		position: absolute;
		top: 80px;
		left: 220px;
	}
	
	.songNum {
		margin-left: 50px;
		font-size: 10px;
		color: dimgray;
	}
	
	.playCount {
		float: right;
		span {
			color: darkred;
			font-weight: bold;
		}
	}
	
	.playlist{
		margin-left: 50px;
		margin-top: 30px;
		/*border: 1px solid red;*/
	}
	
	.DjradioPage {
		position: relative;		
		width: 800px;
		margin-left: 390px;
		border: 1px solid gray;
		background-color: white;
		/*height: 915px;*/
	}
	
	.songattr:nth-of-type(even) {
		background-color: antiquewhite;
	}
	
	th {
		border: 1px solid black;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	td {
		font-size: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.songName,.songArtist{
 	font-size: 10px;
 }	
	.songName:hover {
		cursor: pointer;
		text-decoration: underline;
	}
	
	.songArtist:hover {
		cursor: pointer;
		text-decoration: underline;
	}
	.newComment{
		/*border-bottom: 2px solid red;*/
		
	}
	.comment{
		width: 635px;

		.newComment{
			.title{
				border-bottom: 1px solid dimgray;
				font-weight: bold;
			
			}
			.commentItem{
				border-bottom: 1px solid dimgray;
			}
			.userName{
				font-size: 15px;
				color: dodgerblue;
				font-weight: bold;
				line-height: 50px;
				/*text-align: center;*/
				/*display: inline-block;*/
				/*text-align: right;*/	
				/*margin-top: -100px;*/
			}
			.userName:hover{
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
	
</style>