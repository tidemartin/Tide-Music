<template>
	<div class="Album">
					<el-backtop :bottom='40'>
				<div class="top"></div>
			</el-backtop>
		<h1>全部新碟</h1>
		<div class="allAlbum">
			<ul>
				<li v-for="item in albums" class="fl-left album" @click="goAlbum(item.id)">
					<img :src="item.blurPicUrl" class="albumImg" width="130px" height="130px"/>
					<br />
					<span class="albumName" >{{item.name}}</span>
					<br />
					<span class="albumArtist">{{item.artists[0].name}}</span>
				</li>
			</ul>
		</div>
		
		<!--<div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="25"
      layout="total, prev, pager, next"
      :total="500">
    </el-pagination>
  </div>-->
	</div>
</template>

<script>
	export default{
		data(){
			return {
				currentPage1:1,
				albums:[],
//				total
			}
		},
		created(){
			this.getAlbumDataFromServer();
		},
		methods:{
			goSong(id){
				console.log("id==>",id)
				this.$router.push({name:'Songs',params:{id:id}});
			},
			goAlbum(id){
				console.log("id==>",id)
				this.$router.push({name:'Albums',params:{id:id}});
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getAlbumDataFromServer() {
				this.axios("http://localhost:3000/album/new").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

//												this.albums = res.data.albums;
						for(var i = 0; i < res.data.albums.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.albums, i, res.data.albums[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.albums==>", this.albums);
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
		text-decoration: none;
		
	}
	.fl-left{
		float: left;
	}
	.Album{
		width: 800px;
		margin-left: 390px;
		height: 1250px;
		
	}
	.album{
			width: 130px;
			overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-left: 20px;
				margin-top: 20px;
				
				img:hover{
     			cursor: pointer;
     		}
     		.albumName:hover{
     			cursor: pointer;
     			text-decoration: underline;

     		}
	}
	.albumArtist{
		font-size: 10px;
		color: dimgray;
		}
		.albumName{
		font-size: 15px;
			
		}
</style>