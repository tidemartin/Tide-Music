<template>
	<div class="Artist">
		<el-backtop :bottom='40'>
			<div class="top"></div>
		</el-backtop>
		<h1>全部歌手</h1>
		<div class="allartist">
			<ul>
				<li v-for="item in artists" class="fl-left" @click="goArtist(item.id)">
					<img :src="item.picUrl" class="artistImg" width="130px" height="130px"/>
					<br />
					<span class="artistName" >{{item.name}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			artists:[],
			}
		},
		created() {
			this.getArtistDataFromServer();
		},
		methods: {
			goArtist(id){
				this.$router.push({name:'Artists',params:{id:id}});
			},
		getArtistDataFromServer() {
				this.axios("http://localhost:3000/artist/list").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

//												this.artists = res.data.artists;
						for(var i = 0; i < res.data.artists.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.artists, i, res.data.artists[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.artists==>", this.artists);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
     *{
     	margin: 0;
     	padding: 0;
     	list-style: none;
     	text-decoration: none;
     	
     }
     .fl-left{
     	float: left;
     }
     .Artist{
     	width: 800px;
     	height: 1050px;
		margin-left: 390px;
     	
     }
     .allartist{
     	li{
     		margin-left: 10px;
     		margin-top: 10px;
     		/*border: 1px solid dimgray;*/
     			color: darkslategray;
     		font-size: 10px;
     		font-weight: bold;
     		
     		/*height: 130px;*/
     		img:hover{
     			cursor: pointer;
     		}
     		span:hover{
     			cursor: pointer;
     			text-decoration: underline;

     		}
     	}
     }
</style>