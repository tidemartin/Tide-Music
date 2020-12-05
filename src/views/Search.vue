<template>
	<div class="Search">
		<div class="searchbox">
			<input type="search" class="searchInp" @keyup.enter='searchClick(searchInp)' v-model="searchInp" />
			<el-button icon="el-icon-search" @click='searchClick(searchInp)' >搜索</el-button>
		</div>
		<div class="tabs">
			<el-tabs type="border-card">
				<el-tab-pane label="单曲" class='Song'>
					<!--type=1-->
					<table cellpadding="5px" width="960px">
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr class="songattr" v-for="song in songs">

							<td> <span class="songName" @click="goSong(song.id)">{{song.name}}</span></td>
							<td class="songArtist" @click="goArtist(song.artists[0].id)"><span> {{song.artists[0].name}}</span></td>
							<td class="songAlbum" @click="goAlbum(song.album.id)"> <span> {{song.album.name}}</span></td>
						</tr>
					</table>
				</el-tab-pane>

				<el-tab-pane label="歌手">
					<!--type=1000-->
					<ul>
						<li v-for="artist in artists" class="fl-left Artist">
							<div class="ArtistName">
								<img :src="artist.picUrl" width="130px" height="130px" @click="goArtist(artist.id)"/>
								<br />
								<span class="ArtistName" @click="goArtist(artist.id)">{{artist.name}}</span>
							</div>
						</li>
					</ul>

				</el-tab-pane>

				<el-tab-pane label="专辑">

					<!--type=100-->
					<ul>
						<li v-for="album in albums" class="fl-left Album line-limit-length">

							<img :src="album.picUrl" width="130px" height="130px" @click="goAlbum(album.id)" />
							<br />
							<span class="AlbumName" @click="goAlbum(album.id)">{{album.name}}</span>
							<br />
							<span class="ArtistName ">{{album.artists[0].name}}</span>
							<span v-if="album.artists[1]">/</span>
							<span class="ArtistName"  v-if="album.artists[1]">{{album.artists[1].name}}</span>

						</li>
					</ul>
				</el-tab-pane>

				<!--<el-tab-pane label="MV" >
					type=1004
					<ul>
						<li v-for="mv in mvs" class="fl-left MV line-limit-length">

							<img :src="mv.cover" width="160px" height="90px" />
							<br />
							<span class="MvName">{{mv.name}}</span>
							<br />
							<span class="ArtistName "> by {{mv.artistName}}</span>

						</li>
					</ul>

				</el-tab-pane>-->

				<el-tab-pane label="歌单" class='Playlist'>
<!--					type=1000-->
					<table  cellpadding="5px" width="960px">
						<tr>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr class="songattr" v-for="playlist in playlists" v-if="playlist">

							<td> <span class="songName" @click="goPlaylist(playlist.id)">{{playlist.name}}</span></td>
							<td class="songCount" >{{playlist.trackCount}} <span>	</span> 首</td>
							<td class="songArtist">by  <span>{{playlist.creator.nickname}}</span> </td>
							<td class="bookCount">收藏:{{playlist.bookCount}}</td>
							<td class="playCount">收听:{{playlist.playCount}}</td>
						</tr>
					</table>
				</el-tab-pane>

				<el-tab-pane label="主播电台">
					<!--type=1009-->
				<ul>
						<li v-for="djRadio in djRadios" class="fl-left Djradio line-limit-length" @click="goDjradio(djRadio.id)">

							<img :src="djRadio.picUrl" width="130px" height="130px" />
							<br />
							<span class="DjRadioName" @click="goDjradio(djRadio.id)">{{djRadio.name}}</span>
							<br />
							<span class="ArtistName "> by {{djRadio.dj.nickname}}</span>

						</li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				songs: [],
				albums: [],
				artists: [],
				playlists: [],
				mvs: [],
				djRadios: [],

				searchInp: '',
			}
		},
		created() {
			this.iniSearch(this.$route.params.keywords);
			this.getSongsDataFromServer(this.$route.params.keywords);
			this.getArtistDataFromServer(this.$route.params.keywords);
			this.getAlbumDataFromServer(this.$route.params.keywords);
						this.getMVDataFromServer(this.$route.params.keywords);
			this.getPlaylisDataFromServer(this.$route.params.keywords);
						this.getDjradioDataFromServer(this.$route.params.keywords);
		},
		methods: {
			iniSearch(keywords){
				this.searchInp = keywords;
			},
			goDjradio(id){
				this.$router.push({name:'Djradios',params:{id:id}});
			},
			goProgram(id){
				this.$router.push({name:'Programs',params:{id:id}});
			},
			goSong(id){
				this.$router.push({name:'Songs',params:{id:id}});
			},
			goPlaylist(id){
				this.$router.push({name:'Playlists',params:{id:id}});
			},
			goAlbum(id){
				this.$router.push({name:'Albums',params:{id:id}});
			},
			goArtist(id){
				this.$router.push({name:'Artists',params:{id:id}});
			},
			showSongs() {
				console.log(this.$route)
			},
			showAlbum() {
				console.log(this.$route)

			},
			showMv() {
				console.log(this.$route)

			},
			showDesc() {
				console.log(this.$route)
			},
			searchClick(keywords) {
				
				this.$router.push({
					name: 'Search',
					params: {
						keywords: keywords
					}
				});
				this.songs = [];
				this.albums = [];
				this.artists = [];
				this.playlists = [];
				this.mvs = [];
				this.djRadios = [];
				this.getSongsDataFromServer(keywords);
				this.getArtistDataFromServer(keywords);
				this.getAlbumDataFromServer(keywords);
				this.getMVDataFromServer(keywords);
				this.getPlaylisDataFromServer(keywords);
				this.getDjradioDataFromServer(keywords);
			},
			getSongsDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=1").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.result.songs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.songs, i, res.data.result.songs[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.songs==>", this.songs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getAlbumDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=10").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.result.albums.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.albums, i, res.data.result.albums[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.albums==>", this.albums);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getArtistDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=100").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.result.artists.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.artists, i, res.data.result.artists[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.artists==>", this.artists);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getMVDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=1004").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.mvs = res.data.result.mvs;
//						for(var i = 0; i < res.data.result.mvs.length; i++) {
//							//          	this.imgurl[i]=this.banners[i].imageUrl;
//							//					!!!!!直接修改数组,视图不更新!!!!
//							this.$set(this.songs, i, res.data.result.mvs[i]);
//						}
//						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.mvs==>", this.mvs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getPlaylisDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=1000").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//																		this.tracks = res.data.playlist.tracks;
						for(var i = 0; i < res.data.result.playlists.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.playlists, i, res.data.result.playlists[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.playlists==>", this.playlists);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
						//						http://localhost:3000/playlist/detail?id=19723756
						//						获取排行榜歌单
					}
				});
			},
			getDjradioDataFromServer(keywords) {
				this.axios("http://localhost:3000/search?keywords=" + keywords + "&type=1009").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

					this.djRadios = res.data.result.djRadios;
//						for(var i = 0; i < res.data.result.djRadios.length; i++) {
//							//          	this.imgurl[i]=this.banners[i].imageUrl;
//							//					!!!!!直接修改数组,视图不更新!!!!
//							this.$set(this.songs, i, res.data.result.djRadios[i]);
//						}
//						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.djRadios==>", this.djRadios);
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

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
	}
	
	.line-limit-length {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; 
	}
	
	.fl-left {
		float: left;
	}
	
	.Search {
		width: 1000px;
		margin-left: 330px;
		border: 1px solid darkgray;
		background-color: white;
	}
	
	.Artist {
		width: 130px;
	}
	
	.searchInp {
		height: 40px;
		width: 375px;
		border: 1px solid grey;
		margin-left: 150px;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	
	th,
	td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.ArtistName {
		max-width: 130px;
	}
	
	.AlbumName {
		/*font-size: 10px;*/
		max-width: 130px;
	}
	
	.Artist {
		margin-left: 20px;
		img {
			border: 1px solid gray;
		}
	}
	
	.Album,.Djradio,.MV{
		margin-left: 30px;
		margin-top: 20px;
		width: 130px;
		font-size: 14px;
	}
	tr:nth-of-type(even){	 
	
		background-color: antiquewhite;
	}
	span:hover {
		cursor: pointer;
		text-decoration: underline;
	}
	img:hover{
		cursor: pointer;
	}
</style>