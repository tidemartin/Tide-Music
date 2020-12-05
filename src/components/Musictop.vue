<template>
	<div class="Musictop">

		<el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

			<el-menu-item @click="gohome()" index=' '>
				<span>	
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-wangyiyun"></use>
				</svg>
					网易云音乐
				</span>
			</el-menu-item>

			<el-submenu index="1">
				<template slot="title">发现音乐</template>
				<el-menu-item class='headerColor' index='/discover' >推荐</el-menu-item>
				<el-menu-item class='headerColor' index='/discover/toplist' >排行榜</el-menu-item>
				<el-menu-item class='headerColor' index='/discover/playlist' >歌单</el-menu-item>
				<el-menu-item class='headerColor' index='/discover/djradio' >主播电台</el-menu-item>
				<el-menu-item class='headerColor' index='/discover/artist' >歌手</el-menu-item>
				<el-menu-item class='headerColor' index='/discover/album' >新碟上架</el-menu-item>

			</el-submenu>
			<el-menu-item index="/my" >我的音乐</el-menu-item>

			<el-menu-item index="/friend" >朋友</el-menu-item>
			<el-menu-item index="4">商城</el-menu-item>
			<el-menu-item index="5">音乐人</el-menu-item>
			<el-menu-item index="6">下载客户端</el-menu-item>
			<i class="el-icon-search"></i>
			
			<input type="text" name="search" id="search" v-model="searchInp" placeholder="音乐/电台/视频/用户" @keyup.enter='goSearch(searchInp)'/>

			<!--<el-button type="info" round class='create'>创作者中心</el-button>-->
			<!--<el-button type="info" class='loginbtn'>登录</el-button>-->

			<!--<el-button type="text" class='Loginbtn'>登录</el-button>-->
		</el-menu>
	</div>
</template>

<!--<link rel="stylesheet" type="text/css" href="../assets/css/iconfont.css"/>-->
<script type="text/javascript" >
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				searchInp:'',

			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			goSearch(searchInp){
				console.log('keywords==>',searchInp)
				this.$router.push({name:'Search',params:{keywords:searchInp}})
			},
			gohome(){
				this.$router.push({name:'Home'})
			},
			godiscover(){
				this.$router.push({name:'Discover'})
			},
			goalbum(){
				this.$router.push({name:'Album'})
			},
			goartist(){
				this.$router.push({name:'Artist'})
			},
			godjradio(){
				this.$router.push({name:'Djradio'})
			},
			gotoplist(){
				this.$router.push({name:'Toplist'})
			},
			goplaylist(){
				this.$router.push({name:'Playlist'})
			},
			gofriend(){
				this.$router.push({name:'Friend'})
			},
			gomy(){
				this.$router.push({name:'My'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.create {
		background-color: #545c64;
		margin-left: 15px;
	}
	
	.loginbtn {
		margin-left: 20px;
		background-color: #545c64;
		border: none;
	}
	
	#search {
		border: 1px solid #545c64;
		width: 130px;
		height: 30px;
		border-radius: 20px;
		/*padding: 0;*/
		outline: none;
		/*margin-left: 100px;*/
	}
	.icon{
		font-size: 40px;
		margin-left: 200px;
		margin-top: 5px;

		
	}
	.el-icon-search{
		margin-left: 100px;
		margin-top: 20px;
		color: white;
		size: large;		
	}
	
</style>