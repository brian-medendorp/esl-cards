<template>
	<div id="app">
		<header id="searchBar">
			<label for="search">Search: </label>
			<input id="search" type="text" v-model="query" placeholder="enter card name" v-debounce:600ms="searchCards"/>
		</header>
		<main id="cards" v-infinite-scroll="fetchCards" infinite-scroll-disabled="loading || finished" infinite-scroll-distance="10">
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
			finished: false,
			pageSize: 20,
			page: 1,
			query: '',
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

			// add query parameter if needed
			if (this.query) {
				// encode the string since it's user-entered
				config.params.name = encodeURIComponent(this.query);
			}

			// prevent API call when all cards are loaded using _totalCount
			if (this.finished) {
				return;
			}

			// perform the API call
			this.loading = true
			this.$http.get(baseURL, config).then((result) => {
				this.cards = this.cards.concat(result.data.cards)
				this.loading = false
				this.page++;
				// check the total card count to prevent extra API calls
				if (this.cards.length >= result.data._totalCount) {
					this.finished = true;
				}
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
		},
		resetCards: function () {
			this.cards = [];
			this.page = 1;
			this.finished = false;
		},
		searchCards: function () {
			// clear out the cards array first
			this.resetCards();
			// then fetch cards with the name parameter to search
			this.fetchCards();
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
}

/* setting this with a fixed position so it stays at the top of the screen even when scrolling down */
/* NOTE: when testing with device toolbar in chrome, this still gets partially scrolled
	off the screen; not really sure how to fix that -- and it seems to be a
	chrome / android specific issue? */
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

/* change view method if the screen is small (i.e. mobile devices) */
@media (max-width: 409px) { /* card image width */
	#cards {
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
	}
}

</style>
