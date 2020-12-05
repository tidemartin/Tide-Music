<template>
	<div class="Toplist">

		<el-backtop :bottom='40'>
			<div class="top"></div>
		</el-backtop>
		<div class="toplist-left ">
			<ul class="all-list" v-if="alllist">所有榜
				<li v-for="all in alllist" @click="goToplist(all.id)">
					<div class="all-item">
						<img :src="all.coverImgUrl" class="fl-left" width="40px" height="40px" /><br />
						<div class="ft-vercial">
							<span class="all-listName fl-right">{{all.name}}</span><br />
							<span class="updateFrequency fl-right">{{all.updateFrequency}}</span>
						</div>
					</div>
					<br />
				</li>
			</ul>
			<br />
			<!--<ul class="global-list" v-if="globallist">全球媒体榜
			<li v-for="global in globallist">
				<div class="global-item">
					<img :src="global.coverImgUrl" width="40px" height="40px"/>					
					<span class="global-listName"></span>
					<span class="updateFrequency"></span>
				</div>
			</li>
		</ul>-->
		</div>

		<div class="toplist-right fl-left">
			<div class="toplist-right-content">
				<img :src="list.coverImgUrl" width="150px" height="150px" alt="排行榜图片" />
				<span class="listName">
			{{list.name}}
		</span>
				<div class="btnItem">
					<button style="background-color: dodgerblue;">立即播放</button>
					<!--<button style="background-color: dodgerblue;">添加到播放列表</button>-->
				</div>
				<br />
				<br />
				<div class="songslist">
					<div class="songslist-title" v-if="list.tracks">
						<span>歌曲列表</span>
						<span class="songNum">{{list.tracks.length}}首歌</span>
						<span class="playCount">播放: <span> {{list.playCount}} </span>次</span>
					</div>
					<div class="songslist-content">
						<table rules="rows" border="1px solid gray" cellpadding="5px" width="635px">
							<tr>
								<th></th>
								<th>标题</th>
								<th>歌手</th>
							</tr>
							<tr class="songattr" v-for="(track,index) in tracks">
								<td>{{index+1}}</td>
								<td> <span class="songName" @click="goSong(track.id)">{{track.name}}</span> </td>
								<td> <span class="songArtist" @click="goArtist(track.ar[0].id)">{{track.ar[0].name}}</span><span @click="goArtist(track.ar[2].id)" v-if="track.ar[1]">/</span><span v-if="track.ar[1]">{{track.ar[1].name}}</span></td>
							</tr>
						</table>
					</div>
				</div>
				<br />
				<br />
				<div class="comment">
					<div class="hotComment">

					</div>

					<div class="newComment">
						<div class="title">
						最新评论
						</div>
						<br />
						<ul>
							<li v-for="comment in comments">
								<div class="commentItem">
									<img class="userIcon " :src="comment.user.avatarUrl" width="50px" height="50px" />
									<span class="userName "> {{comment.user.nickname}}  </span>:
									<span class="userComment "> {{comment.content}}</span>
									<br />
								</div>
								<br />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				alllist: [],
				globallist: [],
				listname: [],
				updateTime: 0,
				tracks: [],
				list: {},
				comments: [],

			}
		},
		created() {
//			console.log(this.$route.name);
			this.getAlllistDataFromServer();
			this.getDefaulTracksDataFromServer();
			this.getDefaulListDataFromServer();
			this.getDefaulCommentDataFromServer();
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
			goSong(id){
				this.$router.push({name:'Songs',params:{id:id}});
				
			},
			goToplist(id){
				this.$router.push({name:'Toplists',params:{id:id}});
//				每次跳转排行榜都要重置data里面的数组,不然数组会一直存在上一个榜单的数据
				this.tracks=[];
				this.getTracksDataFromServer(id);
				this.getListDataFromServer(id); 
				this.getCommentDataFromServer(id);
					console.log("id==>",id);
					console.log('route==>',this.$route)
			},
			gorefresh(){
				this.$router.push({name:'Toplists',params:{id:this.$route.params.id}});
				console.log("this.$route.params.id==>",this.$route.params.id)
			},
			showRoute(){
				console.log("route",this.$route)
			},
			getAlllistDataFromServer() {
				this.axios("http://localhost:3000/toplist/detail").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//												this.toplistsongs = res.data.list;
						for(var i = 0; i < res.data.list.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.alllist, i, res.data.list[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.alllist==>", this.alllist);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getTracksDataFromServer(id) {
				this.axios("http://localhost:3000/playlist/detail?id="+id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.tracks==>", this.tracks);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getListDataFromServer(id) {
				this.axios("http://localhost:3000/playlist/detail?id="+id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.list = res.data.playlist;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.list==>", this.list);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getCommentDataFromServer(id) {
				this.axios("http://localhost:3000/comment/playlist?id="+id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.comments = res.data.comments;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.comments==>", this.comments);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getDefaulTracksDataFromServer() {
				this.axios("http://localhost:3000/playlist/detail?id=19723756").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.tracks==>", this.tracks);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getDefaulListDataFromServer() {
				this.axios("http://localhost:3000/playlist/detail?id=19723756").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.list = res.data.playlist;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.list==>", this.list);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getDefaulCommentDataFromServer() {
				this.axios("http://localhost:3000/comment/playlist?id=19723756").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.comments = res.data.comments;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.comments==>", this.comments);
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
	
	.toplist-right-content {
		margin-left: 50px;
		/*border: 1px solid red;*/
	}
	
	.Toplist {
		position: relative;
		.toplist-left {
			width: 250px;
			/*height: 2270px;*/
			border: 1px solid white;
			margin-left: 300px;
			background-color: lightgray;
		}
		.toplist-right {
			position: absolute;
			width: 735px;
			top: 0;
			left: 550px;
			border: 1px solid white;
		}
		/*height: 915px;*/
		.all-item {
			width: 230px;
			/*height: 915px;*/
		}
		.all-listName {
			margin-top: -20px;
			text-align: left;
		}
		.updateFrequency {
			margin-top: -20px;
			text-align: left;
			color: dimgray;
		}
		.all-list li:hover {
			background-color: darkgray;
			cursor: pointer;
		}
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