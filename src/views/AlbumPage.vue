<template>
	<div class="AlbumPage">
		<div class="playlist">
				<img :src="album.picUrl" width="150px" height="150px" alt="专辑图片" />
				<span class="listName"><span class="type">专辑:</span>
			{{album.name}}
		</span>
				<div class="btnItem">
					<button style="background-color: dodgerblue;">立即播放</button>
					<!--<button style="background-color: dodgerblue;">添加到播放列表</button>-->
				</div>
				<br />
				<br />
				<div class="songslist">
					<div class="songslist-title" >
						<span>歌曲列表</span>
						<span class="songNum">{{songs.length}}首歌</span>
						<!--<span class="playCount">播放: <span> {{list.playCount}} </span>次</span>-->
					</div>
					<div class="songslist-content">
						<table rules="rows" border="1px solid gray" cellpadding="5px" width="635px">
							<tr>
								<th></th>
								<th>标题</th>
								<th>歌手</th>
							</tr>
							<tr class="songattr" v-for="(song,index) in songs">
								<td>{{index+1}}</td>
								<td><i class="el-icon-video-play"></i> <span class="songName" @click="goSong(song.id)">{{song.name}}</span> </td>
								<td> <span class="songArtist" @click="goArtist(song.ar[0].id)">{{song.ar[0].name}}</span> <span v-if="song.ar[1]">/</span><span @click="goArtist(song.ar[1].id)" v-if="song.ar[1]">{{song.ar[1].name}}</span></td>
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
</template>

<script>
	export default {
		data() {
			return {
				album: {},
				songs: [],
				comments: [],
			}
		},
		created() {
			this.getSongsDataFromServer(this.$route.params.id);
			this.getCommentDataFromServer(this.$route.params.id);

		},
		methods: {
			goArtist(id){
				console.log("id==>",id)
				this.$router.push({name:'Artists',params:{id:id}});
			},
			goSong(id){
				console.log("id==>",id)
				this.$router.push({name:'Songs',params:{id:id}});
			},
			goAlbum(id){
				this.$router.push({name:'Albums',params:{id:id}});
			},
			getSongsDataFromServer(id) {
				this.axios("http://localhost:3000/album?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.album = res.data.album;
						for(var i = 0; i < res.data.songs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.songs, i, res.data.songs[i]);
						}
						console.log("this.album==>", this.album);
						console.log("this.songs==>", this.songs);
						//						console.log("this.album==>", this.album);
						//											console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getCommentDataFromServer(id) {
				this.axios("http://localhost:3000/comment/album?id=" + id).then((res) => {
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
	
	.AlbumPage {
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
	.type{
			background: red;
			color: white;
			border-radius: 5px;
		}
	
</style>