<template>
	<div class="Musicfooter">
			<span class="author">The cloudMusic made by tidemartin</span>	
			<h3>联系方式</h3>
			<span class="e-mail">
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-QQ"></use>
				</svg>
				382012449</span>		<br />
			<span class="e-mail">
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-tubiaozhizuomoban"></use>
				</svg>
				382012449@qq.com</span>		<br />
			<span class="e-mail">
				<svg class="icon" aria-hidden="true" >
					<use xlink:href="#icon-gitHub"></use>
				</svg>
				<a href="https://github.com/tidemartin" target="_blank">github.com/tidemartin</a></span>	<br />	
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.Musicfooter{
		width: 100%;
		height: 150px;
		background-color: lightslategray;
		border-top: 3px solid darkgray;
		span,h3{
			/*line-height: 100px;*/
			margin-left: 40%;
			/*margin-bottom: 100px;*/
			a{
				text-decoration: none;
				color: black;
			}
			.icon{
				font-size: 30px;
			}
		}
	
	
	}
	
</style>