<template>
	<article>
		<img v-bind:src="card.imageUrl" />
		<h1>{{card.name}}</h1>
		<div><label>Type:</label> {{card.type}}</div>
		<div><label>Card Set:</label> {{card.set.name}}</div>
		<p>{{card.text}}</p>
	</article>
</template>

<script>
export default {
	name: 'Card',
	props: ['card']
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
</style>
