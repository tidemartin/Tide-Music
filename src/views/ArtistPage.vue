<template>
	<div class="ArtistPage">
		<!--<audio ref="audio" controls="controls" :src="audioSrc"></audio>-->

		<div class="ArtistPageLeft" v-if="artist.alias">
			<div class="artistName">
				<span class="chName">{{artist.name}}</span>

				<span class="engName">{{artist.alias[0]}}</span>

			</div>

			<div class="artisitImg">
				<img :src="artist.picUrl" height="400px" width="640px" alt="歌手图片" />
			</div>

			<div class="tabs">
				<el-tabs type="border-card">
					<el-tab-pane label="热门作品" class='hotSongs'>
						<div class="songslist-content">
							<table cellpadding="5px" width="635px">
								<tr class="songattr" v-for="(hotSong,index) in hotSongs">
									<td>{{index+1}}</td>
									<td><i class="el-icon-video-play" @click="changeaudioSrc(hotSong.id)"></i> <span class="songName" @click="goSong(hotSong.id)">{{hotSong.name}}</span> </td>
									<td> <span class="songAlbum" @click="goAlbum(hotSong.al.id)"> {{hotSong.al.name}}</span></td>
								</tr>
							</table>
						</div>

					</el-tab-pane>

					<el-tab-pane label="所有专辑" class='album'>
						<ul>
							<li v-for="hotAlbum in hotAlbums" class="fl-left">
								<div class="albumItem" @click="goAlbum(hotAlbum.id)">
									<img :src="hotAlbum.picUrl" width="120px" height="120px" />
									<br />
									<span class="hotAlbumName">{{hotAlbum.name}}</span>
								</div>
							</li>
						</ul>

					</el-tab-pane>

					<el-tab-pane label="相关MV" class='mv'>
						<ul>
							<li v-for="mv in mvs" class="fl-left" v-if="mv.imgurl">
								<div class="mvItem">
									<img :src="mv.imgurl" width="120px" height="120px" />
									<br />
									<span class="mvName">{{mv.name}}</span>
								</div>
							</li>
						</ul>

					</el-tab-pane>

					<el-tab-pane label="艺人介绍" class='desc'>
						<span class="briefDesc">{{artist.name}}简介</span>
						<div><br /></div>
						<span class="briefDescContent">  {{artist.briefDesc}}  </span>

					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				artist: {},
				hotSongs: [],
				hotAlbums: [],
				mvs: [],
				checksuccess: true,
				checkmsg: '',
//				audioSrc: 'music.163.com/song/media/outer/url?id=255020.mp3',

			}
		},
		created() {
			this.getArtirstDataFromServer(this.$route.params.id);
			this.gethotSongsDataFromServer(this.$route.params.id);
			this.gethotAlbumsDataFromServer(this.$route.params.id);
			this.getMVsDataFromServer(this.$route.params.id);
		},
		computed: {
			//引用audio元素
			audioElement() {
				return this.$store.state.audioElement;
			},
						audioSrc() {
			      return this.$store.state.audioSrc;
			    },
		},
		methods: {
			changeaudioSrc(id) {
				this.getCheckFromServer(id);
				this.$refs.audio.src = 'music.163.com/song/media/outer/url?id=' + id + '.mp3';
//				this.$nextTick(() => {
//					this.$refs.audio.load()
//				});
				//				this.$refs.audio.play();
				//      		this.$store.commit('changeaudioSrc', id);
				console.log("this.$refs.audio.src ==>", this.$refs.audio.src)
				//      		console.log("state.audioSrc ==>",this.$store.state.audioSrc)
				//      		this.audioElement.preload();
				//      		this.audioElement.src = this.audioSrc;
				//      		console.log("this.audioElement.src ==>",this.audioElement.src)

				//				state.audioSrc = ;
			},
			checkMusic(id) {
				this.getCheckFromServer(id);

				//				console.log("this.checksuccess==>", this.checksuccess);
				//				console.log("this.checkmsg==>", this.checkmsg);
				//				if(this.checksuccess){
				////					alert(this.checkmsg)
				//					console.log("有版权")
				//				}else{
				////					alert(this.checkmsg)
				//					console.log("亲爱的,没有版权")
				//				}
				//				console.log("this.checkmsg ==>",this.checkmsg);

			},
			goAlbum(id) {
				this.$router.push({
					name: 'Albums',
					params: {
						id: id
					}
				});
			},
			goSong(id) {
				this.$router.push({
					name: 'Songs',
					params: {
						id: id
					}
				});
			},
			goMv(id) {
				this.$router.push({
					name: 'Toplists',
					params: {
						id: id
					}
				});
			},
			getArtirstDataFromServer(id) {
				this.axios("http://localhost:3000/artists?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.artist = res.data.artist;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.artist==>", this.artist);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			gethotSongsDataFromServer(id) {
				this.axios("http://localhost:3000/artists?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.hotSongs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.hotSongs, i, res.data.hotSongs[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.hotSongs==>", this.hotSongs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			gethotAlbumsDataFromServer(id) {
				this.axios("http://localhost:3000/artist/album?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.hotAlbums.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.hotAlbums, i, res.data.hotAlbums[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.hotAlbums==>", this.hotAlbums);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getMVsDataFromServer(id) {
				this.axios("http://localhost:3000/artist/mv?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.mvs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.mvs, i, res.data.mvs[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.mvs==>", this.mvs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getCheckFromServer(id) {
				this.axios("http://localhost:3000/check/music?id=" + id).then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.checksuccess = res.data.success;
						this.checkmsg = res.data.message;
						//						for(var i = 0; i < res.data.playlist.tracks.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.tracks, i, res.data.playlist.tracks[i]);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);

						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				}).catch(error => {
					if(error.response) {
						//    console.log(error.response.data);
						//  	this.checksuccess = error.response.data.success;
						//  	this.checkmsg = error.response.data.success;
						alert(error.response.data.message)
						console.log(error.response.data.success);
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if(error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
					console.log(error.config);
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
	
	.el-icon-video-play {
		font-size: 18px;
		cursor: pointer;
	}
	
	.ArtistPage {
		position: relative;
		width: 640px;
		margin-left: 460px;
		border: 1px solid gray;
		background-color: white;
	}
	
	.ArtistPageLeft {
		width: 600px;
		/*border: 1px solid red;*/
	}
	
	span {
		cursor: pointer;
	}
	
	.artistName {
		.chName {
			font-size: 25px;
			/*font-weight: bold;*/
		}
		.engName {
			margin-left: 10px;
			color: dimgray;
		}
	}
	
	.artisiImg {
		/*position: absolute;*/
		/*top: 50px;*/
	}
	
	.tabs {
		/*position: absolute;*/
		width: 640px;
		/*top: 400px;*/
		/*margin-top: -200px;*/
	}
	
	.songattr:nth-of-type(even) {
		background-color: antiquewhite;
	}
	
	.album li {
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 20px;
		margin-top: 20px;
		font-size: 13px;
	}
	
	.mv li {
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 20px;
		margin-top: 20px;
		font-size: 13px;
		img {
			border: 1px solid gray;
			/*border-right: 1px ;*/
		}
	}
	
	.songName:hover,
	.hotAlbumName:hover,
	.mvName:hover,
	.albumItem img:hover {
		cursor: pointer;
		text-decoration: underline;
	}
</style>