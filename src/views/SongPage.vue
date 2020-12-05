<template>
	<div class="SongPage">
		<div class="playlist" v-if="songs.al">
			<img :src="songs.al.picUrl" width="150px" height="150px" alt="单曲图片" />
			<span class="listName"><span class="type">单曲:</span> {{songs.name}}
			</span>
			<div class="artistName">
			<span >歌手:</span>
			<span @click="goArtist(songs.ar[0].id)">{{songs.ar[0].name}}</span>
		</div>
			<div class="albumName">
			<span>所属专辑:</span>
			<span @click="goAlbum(songs.al.id)">{{songs.al.name}}</span>
		</div>

			<div class="btnItem">
				<button style="background-color: dodgerblue;">立即播放</button>
				<!--<button style="background-color: dodgerblue;">添加到播放列表</button>-->
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
				songs: {},
				comments: [],

			}
		},
		created() {
			//			console.log(this.$route.name);
			//				每次跳转排行榜都要重置data里面的数组,不然数组会一直存在上一个歌单的数据
			//				this.songs=[];
			this.getSongsDataFromServer(this.$route.params.id);
			this.getCommentDataFromServer(this.$route.params.id);
			console.log("id==>", this.$route.params.id);
			console.log('route==>', this.$route)
			this.showRoute();
			//			this.gorefresh();

			//			this.getGloballistDataFromServer();
		},
		methods: {
			goAlbum(id){
				this.$router.push({name:'Albums',params:{id:id}});
			},
			goArtist(id){
				this.$router.push({name:'Artists',params:{id:id}});
			},
			goToplist(id) {
				this.$router.push({
					name: 'Toplists',
					params: {
						id: id
					}
				});
			},
			gorefresh() {
				this.$router.push({
					name: 'Toplists',
					params: {
						id: this.$route.params.id
					}
				});
				console.log("this.$route.params.id==>", this.$route.params.id)
			},
			showRoute() {
				console.log("route", this.$route)
			},
			getSongsDataFromServer(id) {
				this.axios("http://localhost:3000/song/detail?ids=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.songs = res.data.songs[0];
						//						for(var i = 0; i < res.data.songs.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.songs, i, res.data.songs[i]);
						//						}
						console.log("this.songs==>", this.songs);
						//						console.log("this.songs==>", this.songs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},

			getCommentDataFromServer(id) {
				this.axios("http://localhost:3000/comment/music?id=" + id).then((res) => {
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
		span:nth-child(1) {
			font-weight: bold;
		}
	}
	.artistName span:nth-child(1){
		color: dimgray;
	}
	.albumName span:nth-child(1){
		color: dimgray;
	}
	.artistName span:nth-child(2){
		color: deepskyblue;
	}
	.albumName span:nth-child(2){
		color: deepskyblue;
	}
	.artistName span:nth-child(2):hover{
		text-decoration: underline;
		cursor: pointer;
	}
	.albumName span:nth-child(2):hover{
		text-decoration: underline;
		cursor: pointer;
		
	}
	
	.listName {
		/*display: inline-block;*/
		font-size: 20px;
		position: absolute;
		top: 50px;
		left: 220px;
	}
	.artistName{
		position: absolute;
		top: 80px;
		left: 220px;
	}
	.albumName{
		position: absolute;
		top: 100px;
		left: 220px;
	}
	
	.btnItem {
		position: absolute;
		top: 120px;
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
	
	.playlist {
		margin-left: 50px;
		margin-top: 30px;
		/*border: 1px solid red;*/
	}
	
	.SongPage {
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
	
	.songName,
	.songArtist {
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
	
	.newComment {
		/*border-bottom: 2px solid red;*/
	}
	
	.comment {
		width: 635px;
		.newComment {
			.title {
				border-bottom: 1px solid dimgray;
				font-weight: bold;
			}
			.commentItem {
				border-bottom: 1px solid dimgray;
			}
			.userName {
				font-size: 15px;
				color: dodgerblue;
				font-weight: bold;
				line-height: 50px;
				/*text-align: center;*/
				/*display: inline-block;*/
				/*text-align: right;*/
				/*margin-top: -100px;*/
			}
			.userName:hover {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
	
	.type {
		background: red;
		color: white;
		border-radius: 5px;
	}
</style>