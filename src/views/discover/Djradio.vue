<template>
	<div class="Djradios">
					<el-backtop :bottom='40'>
				<div class="top"></div>
			</el-backtop>
		<div class="djradio-recommend fl-left"  >		
				<div class="djradio-recommend-Title">
					<span>					
					推荐节目
				</span>
					<span class="djradio-recommend-Item More">更多></span>
				</div>
				<ul >
					<li v-for="item in programs" >
						<img :src="item.radio.picUrl" width="45px" height="45px"/>
				<span class="name" @click="goProgram(item.id)">{{item.mainSong.name}}</span>
				<span class="radio">{{item.radio.category}}</span>	
				<br />
				<span class="brand">{{item.dj.brand}}</span>							
					</li>
				</ul>
				
	</div>
	
	<div class="djradio-program fl-left" >		
				<div class="djradio-program-Title">
					<span>					
					节目排行榜
				</span>
					<span class="djradio-program-Item More">更多></span>
				</div>		
				
				<ul >
					<li v-for="item in toplist">
						<img :src="item.program.radio.picUrl"  width="45px" height="45px"/>
				<span class="name" @click="goProgram(item.program.id)">{{item.program.mainSong.name}}</span><br />
				<span class="brand">{{item.program.radio.name}}</span>
<!--				<span class="radio">{{}}</span>-->
					</li>
				</ul>
				
				
					<ul v-for="item in recommend">
				<div class="djradio-list-Title" >		
				<span>					
                    {{item.categoryName}}·电台
				</span>
					<span class="djradio-list-Item More">更多></span>
				</div>
						<li >
						<div class="djradioItem " @click="goDjradio(item.radios[0].id)">
							
						<img :src="item.radios[0].picUrl"   width="120px" height="120px"/>
						 
						<span class="radioName">
							{{item.radios[0].name}}
						</span>
						
						<!--<br />-->
						<!--<img :src="item.radios[1].picUrl" width="120px" height="120px"/>
						<span class="tilte">
							{{item.radios[1].name}}
						</span>
						<br />-->

						</div>
						</li>
					</ul>
					
				
				
				
	</div>
	</div>
</template>

<script scoped>
	export default{
		data(){
			return {
				programs:[],
				toplist:[],
				recommend:[],
			}
		},
		created(){
			this.getDjradioProgramDataFromServer();
			this.getDjradioToplistDataFromServer();
			this.getDjradioRecommendDataFromServer();
		},
		methods:{
			goProgram(id){
				this.$router.push({name:'Programs',params:{id:id}});
			},
			goDjradio(id){
				this.$router.push({name:'Djradios',params:{id:id}});
			},
			getDjradioProgramDataFromServer() {
				this.axios("http://localhost:3000/program/recommend").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.playlists = res.data.playlists;
						for(var i = 0; i < res.data.programs.length; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.programs, i, res.data.programs[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.programs==>", this.programs);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getDjradioToplistDataFromServer() {
				this.axios("http://localhost:3000/dj/program/toplist").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.playlists = res.data.playlists;
						for(var i = 0; i < 10; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.toplist, i, res.data.toplist[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.toplist==>", this.toplist);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			},
			getDjradioRecommendDataFromServer() {
				this.axios("http://localhost:3000/dj/category/recommend").then((res) => {
					/*
					 * 先判断网络请求是否成功 res.status === 200
					 */
					if(res.status === 200) {
						//        	如果响应状态码为200,则将banners中的imageUrl循环放入this.imgurl中

						//						this.playlists = res.data.playlists;
						for(var i = 0; i < 10; i++) {
							//          	this.imgurl[i]=this.banners[i].imageUrl;
							//					!!!!!直接修改数组,视图不更新!!!!
							this.$set(this.recommend, i, res.data.data[i]);
						}
						//					console.log("this.playlistsobj==>", this.playlists);
						console.log("this.recommend==>", this.recommend);
						//					console.log("res.data.playlists.length==>", res.data.playlists.length);
						//					console.log('res==>',res)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.fl-left{
		float: left;
	}
	.Djradios{
		width: 800px;
		height: 2650px;
		background-color: whitesmoke;
		margin-left: 390px;
		border: 3px solid lightgray;
		position: relative;
	}
	
	
	.djradio-recommend {
		li{
			margin: 10px;
			margin-left: 40px;
			width: 350px;
			/*border: 1px solid white;*/
			
		}
		li:nth-of-type(even){
			background-color: lightgray;

		}
		
		
			/*height: 1000px;*/
			.djradio-recommend-Title {
				width: 350px;
				margin-left: 40px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.djradio-recommend-Item {
					margin-left: 20px;
					font-size: 15px;
					color: dimgray;
				}
				.More {
					margin-left: 230px;
				}
						}
			.name{
				position: absolute;
				font-size: 10px;
				width: 300px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				/*margin-top: 10px;*/
			}
			.name:hover{
			cursor: pointer;
			text-decoration: underline;
			/*font-weight: bold;*/
		}
			.radio{
				position: absolute;
				margin-left: 250px;
				color: gray;
				border: 2px solid gray;
				font-size: 10px;
				margin-top: 20px;
				
				
			}
			.brand{
				position: absolute;
				margin-left: 45px;
				margin-top: -30px;
				font-size: 10px;
				color: dimgray
				
			}
			}
			
	.djradio-program {
		width: 350px;
		li{
			margin: 10px;
			margin-left: 20px;
			/*border: 1px solid white;*/
			
		}
		li:nth-of-type(even){
			background-color: lightgray;

		}
			/*height: 1000px;*/
			.djradio-program-Title {
				width: 350px;
				margin-left: 20px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.djradio-program-Item {
					margin-left: 20px;
					font-size: 15px;
					color: dimgray;
				}
				.More {
					margin-left: 220px;
				}
						}
		.name{
				position: absolute;
				font-size: 10px;
				width: 300px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				/*margin-top: 10px;*/
				margin-left: 5px;
			}
			.name:hover{
			cursor: pointer;
			text-decoration: underline;
			/*font-weight: bold;*/
		}
			.radio{
				position: absolute;
				margin-left: 250px;
				color: gray;
				border: 2px solid gray;
				font-size: 10px;
				margin-top: 20px;
				
				
			}
			.brand{
				position: absolute;
				margin-left: 50px;
				margin-top: -30px;
				font-size: 10px;
				color: dimgray
				
			}
			.djradio-list-Title{
				width: 700px;
				margin-left: -360px;
				border-bottom: 3px solid rgb(194, 12, 12);
				.djradio-list-Item {
					position: absolute;
					right: 60px;
					font-size: 15px;
					color: dimgray;
				}
				span:nth-child(1){
					font-size: 30px;
					/*font-weight: bold;*/
				}
					}
			.djradioItem{
				width: 800px;
				margin-left: -350px;
				font-size: 10px;
				img{
					margin-top: 10px;
				}
				.radioName{
					/*text-align: center;*/
					
					/*margin-left: 10px;*/
					font-size: 30px;
					}
					.radioName:hover{
						cursor: pointer;
			text-decoration: underline;
					}
			}	
			
			}
</style>