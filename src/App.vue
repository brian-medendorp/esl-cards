<template>
	<div id="app">
		<header id="searchBar">
			<label for="search">Search: </label>
			<input id="search" type="text" v-model="search" placeholder="enter card name"/>
			<button v-on:click="fetchCards">Fetch</button>
		</header>
		<main id="cards">
			<Card
				v-for="card in cards"
				v-bind:key="card.name"
				v-bind:card="card"
			></Card>
			<figure id="loading" v-if="loading">
				<img alt="Loading" src="./assets/loading.svg">
			</figure>
		</main>
	</div>
</template>

<script>
import Card from './components/Card.vue'

export default {
	name: 'App',
	components: {
		Card
	},
	data () {
		return {
			loading: false,
			pageSize: 20,
			page: 1,
			cards: []
		}
	},
	methods: {
		fetchCards: function () {
			const baseURL = 'https://api.elderscrollslegends.io/v1/cards'
			var config = {
				params: {
					pageSize: this.pageSize,
					page: this.page
				}
			}
			// TODO: prevent API call when all cards are loaded using _totalCount
			this.loading = true
			this.$http.get(baseURL, config).then((result) => {
				this.cards = this.cards.concat(result.data.cards)
				this.loading = false
				this.page++;
			}).catch(function(error) {
				console.log(error)
				// TODO: add error handling
				// 400 - bad request
				// 403 - rate limit exceeded
				// 404 - error message
				// 500 - internal server error
				// 503 - service unavailable
				this.loading = false
			})

		}
	}
}
</script>

<style>
html, body {
	margin: 0px;
	padding: 0px;
}

body {
	background-color: #ccc;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	//margin-top: 60px;
}

#searchBar {
	background-color: white;
	border-bottom: 2px solid black;
	position: fixed;
	width: 100%;
	padding: 10px;
	box-shadow: 0 0 10px black;
}

#cards {
	padding-top: 60px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}

#loading {
	width: 200px;
	margin: auto;
}
</style>
