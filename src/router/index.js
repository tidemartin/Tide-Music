import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
		path: '/',
		name: 'Home',
		component: () =>
			import('../views/Discover')
	},
	{
		path: '/discover',
		name: 'Discover',
		component: () =>
			import('../views/Discover'),
	},
	{
		path: '/discover/album',
		name: 'Album',
		component: () =>
			import('../views/discover/Album')
	},
	{
		path: '/discover/artist',
		name: 'Artist',

		component: () =>
			import('../views/discover/Artist')
	},
	{
		path: '/discover/djradio',
		name: 'Djradio',

		component: () =>
			import('../views/discover/Djradio')
	},
	{
		path: '/discover/playlist',
		name: 'Playlist',

		component: () =>
			import('../views/discover/Playlist')
	},
	{
		path: '/discover/toplist',
		name: 'Toplist',

		component: () =>
			import('../views/discover/Toplist')
	},

	{
		path: '/friend',
		name: 'Friend',
		component: () =>
			import('../views/Friend.vue')
	},
	{
		path: '/my',
		name: 'My',
		component: () =>
			import('../views/My.vue')
	},
	{
		path: '/album/id=:id',
		name: 'Albums',
		component: () =>
			import('../views/AlbumPage.vue')
	},
	{
		path: '/artist/id=:id',
		name: 'Artists',
		component: () =>
			import('../views/ArtistPage.vue')
	},
	{
		path: '/djradio/id=:id',
		name: 'Djradios',
		component: () =>
			import('../views/DjradioPage.vue')
	},
	{
		path: '/playlist/id=:id',
		name: 'Playlists',
		component: () =>
			import('../views/PlaylistPage.vue')
	},
	{
		path: '/program/id=:id',
		name: 'Programs',
		component: () =>
			import('../views/ProgramPage.vue')
	},
	{
		path: '/song/id=:id',
		name: 'Songs',
		component: () =>
			import('../views/SongPage.vue')
	},
	{
		path: '/search/keywords=:keywords',
		name: 'Search',
		component: () =>
			import('../views/Search'),
	},
	{
		path: '/discover/toplist/id=:id',
		name: 'Toplists',
		component: () =>
			import('../views/discover/Toplist')
	}
]



const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router