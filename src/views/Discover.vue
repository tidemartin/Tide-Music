<template>
	<div class="Discover">
					<el-backtop :bottom='40'>
				<div class="top"></div>
			</el-backtop>
		<el-carousel :interval="4000" type="card" height="300px" arrow='always'>
			<el-carousel-item v-for="item in imgurl" :key="item">
				<img :src="item" width="100%" height="100%" />
			</el-carousel-item>
		</el-carousel>

		<div class="discoverCotent">
			<div class="hot">
				<div class="hotTitle">
					<span>	
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-remen"></use>
				</svg>
					热门推荐
				</span>
					<!--<span class="hotItem Chinese">华语</span>
					<span class="hotItem Pop">流行</span>
					<span class="hotItem Rock">摇滚</span>
					<span class="hotItem bBallad">民谣</span>
					<span class="hotItem Electronic">电子</span>-->
					<span class="hotItem More" @click="MorePlaylist()">更多</span>
				</div>
				<div class="hotContent">
					<ul class="hotPlaylist" >
						<li class="fl-left hotPlaylist-li" v-for="item in playlists" @click="goPlaylist(item.id)">
							<div class="playlistImg">
								<img :src="item.coverImgUrl" width="150px" height="150px" />
								<div class="playCount">
									<span>播放量:  {{item.playCount}}</span>
								</div>
							</div>
							<div class="palylistTitle">
								<span>{{item.name}}</span>

							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="album">
				<div class="albumTitle">
					<span>	
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-iconfont37newtag"></use>
				</svg>
					新碟上架
				</span>
					<span class="albumItem More" @click="MoreAlbum()">更多</span>

				</div>
				<div class="albumContent">
					<ul class="newAlbum" v-for="item in album">
						<li class="fl-left newAlbumlist-li">
							<div class="albumImg">
								<img :src="item.picUrl" width="150px" height="150px"  @click="goAlbum(item.id)"/>
								<div class="albumName">
									<span @click="goAlbum(item.id)">{{item.name}}</span>
								</div>
							</div>
							<div class="albumArtist">
								<span @click="goArtist(item.artist.id)">{{item.artist.name}}</span>

							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="toplist">
				<div class="toplistTitle">
					<span>	
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-bangdan"></use>
				</svg>
					榜单
				</span>
					<span class="toplistItem More" @click="MoreToplist()">更多</span>
				</div>
				<div class="toplistContent">
					<ul v-if="toplistsongs[0]">
						<li class="toplist-one-li">
							<div class="toplist-one">
								<div class="toplist-one-Img fl-left" v-if="toplist[0]">
									<img :src="toplist[0].coverImgUrl" width="85px" height="85px" />
								</div>
								<div class="toplist-one-name " v-if="toplist[0]">
									<span>{{toplist[0].name}}</span>
								</div>
								<button>
								播放
							</button>

							</div>
						</li>
						<li class="fs-15" v-for="(item,index) in toplistsongs[0].tracks" :key="index">
							<span class="num">
								{{index+1}}
							</span>
							<span class="songname">
								{{item.first}}
							</span>
						</li>

					</ul>

					<ul v-if="toplistsongs[1]">
						<li class="toplist-two-li ">
							<div class="toplist-two">
								<div class="toplist-two-Img fl-left" v-if="toplist[1]">
									<img :src="toplist[1].coverImgUrl" width="85px" height="85px" />
								</div>
								<div class="toplist-two-name " v-if="toplist[1]">
									<span @click="goToplist(toplist[1].id)">{{toplist[1].name}}</span>
								</div>
								<button>
								播放
							</button>


							</div>
						</li>
						<li class="fs-15" v-for="(item,index) in toplistsongs[1].tracks" :key="index">
							<span class="num">
								{{index+1}}
							</span>
							<span class="songname" @click="goSong(item.id)">
								{{item.first}}
							</span>
						</li>

					</ul>

					<ul v-if="toplistsongs[2]">
						<li class="toplist-three-li ">
							<div class="toplist-three">
								<div class="toplist-three-Img fl-left" v-if="toplist[2]">
									<img :src="toplist[2].coverImgUrl" width="85px" height="85px" />
								</div>
								<div class="toplist-three-name " v-if="toplist[2]">
									<span>{{toplist[2].name}}</span>
								</div>
								<button>
								播放
							</button>

							</div>
						</li>
						<li class="fs-15" v-for="(item,index) in toplistsongs[2].tracks" :key="index">
							<span class="num">
								{{index+1}}
							</span>
							<span class="songname">
								{{item.first}}
							</span>
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
				imgurl: [],
				banners: [],
				playlists: {},
				album: [],
				toplist: [],
				toplistsongs: [],
				routeName: '',
			}
		},
		methods: {
			MorePlaylist(){
				this.$router.push({name:'Playlist'})
			},
			MoreAlbum(){
				this.$router.push({name:'Album'})
			},
			MoreToplist(){
				this.$router.push({name:'Toplist'})
			},
			goToplist(id){
				this.$router.push({name:'Toplists',params:{id:id}});
				
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
			goSong(id){
				this.$router.push({name:'Songs',params:{id:id}});
			},
			getBannerDataFromServer() {
				this.axios("http://localhost:3000/banner").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中
						this.banners = res.data.banners;
						for(var i = 0; i < this.banners.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.imgurl, i, this.banners[i].imageUrl);
						}
						console.log("this.imgurl==>", this.imgurl);
					}
				});
			},
			getHotPlayListDataFromServer() {
				this.axios("http://localhost:3000/top/playlist?limit=8&order=hot").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						this.playlists = res.data.playlists;
						//						for(var i = 0; i < this.playlists.length; i++) {
						//							//          	this.imgurl[i]=this.banners[i].imageUrl;
						//							//					!!!!!直接修改数组,视图不更新!!!!
						//							this.$set(this.playlistsImgUrl, i, this.playlists[i].coverImgUrl);
						//						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.playlists.coverImgUrl==>", this.playlists[0].coverImgUrl);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getAlbumDataFromServer() {
				this.axios("http://localhost:3000/top/album").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.album = res.data.weekData;
						for(var i = 0; i < 4; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.album, i, res.data.weekData[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.album==>", this.album);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getToplistDataFromServer() {
				this.axios("http://localhost:3000/toplist?id=19723756").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.album = res.data.weekData;
						for(var i = 0; i < 3; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.toplist, i, res.data.list[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.toplist==>", this.toplist);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getToplistsongsDataFromServer() {
				this.axios("http://localhost:3000/toplist/detail").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//												this.toplistsongs = res.data.list;
						for(var i = 0; i < 3; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.toplistsongs, i, res.data.list[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.toplistsongs==>", this.toplistsongs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			}
		},
		created() {

			this.getBannerDataFromServer();
			this.getHotPlayListDataFromServer();
			this.getAlbumDataFromServer();
			this.getToplistDataFromServer();
			this.getToplistsongsDataFromServer();
			//			setActiveItem(1);
			//			console.log(this.$route.name)
			this.routeName = this.$route.name;
			console.log('this.routeName==>', this.routeName)
		},

	}
</script>

<style lang="scss" scoped>
	* {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	
	.fs-15 {
		font-size: 15px;
		/*text-align: center;*/
	}
	
	.fl-left {
		float: left;
	}
	
	body {
		background-color: lightslategray
	}
	
	.el-carousel__item a {
		color: #475669;
		font-size: 14px;
		opacity: 1;
		line-height: 200px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.discoverCotent {
		width: 800px;
		background-color: whitesmoke;
		margin-left: 390px;
		border: 3px solid lightgray;
		/*font-size: 0;*/
		.hot {
			height: 465px;
			.palylistTitle {
				width: 150px;
				/*overflow: hidden;*/
			}
			.hotPlaylist-li {
				margin-left: 20px;
				margin-right: 30px;
				margin-top: 10px;
				font-size: 10px;
				img {
					cursor: pointer;
				}
			}
			.hotTitle {
				width: 760px;
				margin-left: 20px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.hotItem {
					margin-left: 20px;
					font-size: 15px;
					color: dimgray;
				}
				.More {
					margin-left: 585px;
				}
				.icon {
					font-size: 30px;
					margin-left: 20px;
				}
				span {
					font-size: 20px;
					margin-left: -20px;
				}
			}
		}
		.album {
			height: 250px;
			.albumTitle {
				width: 760px;
				margin-left: 20px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.albumItem {
					margin-left: 20px;
					font-size: 15px;
					color: dimgray;
				}
				.More {
					margin-left: 580px;
				}
				.icon {
					font-size: 30px;
					margin-left: 20px;
				}
				span {
					margin-left: -20px;
					font-size: 20px;
				}
			}
			.albumArtist {
				font-size: 8px;
			}
			.albumArtist li{
				/*width: 150px;*/
				
			}
			.albumName span {
				font-size: 8px;
				display: block;
				width: 150px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.albumArtist span {
				display: block;
				font-size: 8px;
				width: 150px;
				color: dimgray;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				
			}
			.newAlbumlist-li {
				margin-left: 20px;
				margin-top: 10px;
				margin-right: 30px;
			}
		}
		.toplist {
			.num {
				color: red;
				font-size: 15px;
			}
			.songname {
				/*font-size: 15px;*/
				text-align: center;
			}
			.toplist-one-li {
				height: 90px;
			}
			.toplist-two-li {
				height: 90px;
			}
			.toplist-three-li {
				height: 90px;
			}
			height: 220px;
			ul {
				width: 238px;
				margin-left: 20px;
				margin-top: 10px;
				/*margin-right: 30px;*/
				float: left;
				border: 1px solid darkgray;
			}
			li {
				border: 0.5px solid lightslategray;
			}
			.toplistTitle {
				width: 760px;
				margin-left: 20px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.toplistItem {
					margin-left: 50px;
					font-size: 15px;
					color: dimgray;
				}
				.More {
					margin-left: 620px;
				}
				.icon {
					font-size: 30px;
					margin-left: 20px;
				}
				span {
					margin-left: -20px;
					font-size: 20px;
				}
			}
		}
	}
	span:hover{
		cursor: pointer;
		text-decoration: underline;
	}
	.albumImg img{
		cursor: pointer;
	}
</style>