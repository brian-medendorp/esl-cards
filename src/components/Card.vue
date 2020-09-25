<template>
	<article>
		<img v-show="imageLoaded" v-bind:src="card.imageUrl" @load="onImageLoad"/>
		<img v-if="!imageLoaded" src="./../assets/placeholder.svg" />
		<h1>{{card.name}}</h1>
		<div><label>Type:</label> {{card.type}}</div>
		<div><label>Card Set:</label> {{card.set.name}}</div>
		<p>{{card.text}}</p>
	</article>
</template>

<script>
export default {
	name: 'Card',
	props: ['card'],
	data: function () {
		return {
			imageLoaded: false
		}
	},
	methods: {
		onImageLoad: function() {
			this.imageLoaded = true;
		}
	}
}
</script>

// scoped attribute limits css to only this component
<style scoped>
	article {
		width: 409px; /* width of images */
		background-color: white;
		margin: 10px 10px;
		padding: 10px 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0 0 10px black;
	}

	label {
		font-weight: bold;
	}

	/* change view method if the screen is small (i.e. mobile devices) */
	@media (max-width: 409px) { /* card image width */
		article, img {
			width: 100%;
		}
		article {
			border-radius: 0px;
			box-shadow: none;
		}
	}
</style>
