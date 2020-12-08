<template>
	<div><my-button :msg="msg"></my-button></div>
</template>

<script>
export default {
	data() {
		return {
			msg: '100'
		}
	},
	components: {
		MyButton: {
			// props: ['msg'],
			template: `<div>B<my-input v-bind="$attrs"></my-input></div>`,
			components: {
				MyInput: {
					props: ['msg'],
					template: '<div>C{{msg}}</div>'
				}
			}
		}
	},
	created() {
		let obj = {
			name: 'zs',
			age: 1
		}
		let b = 'haha'
		for(let o in obj){
			console.log(obj.hasOwnProperty(o));
		}
	}
};
</script>

<style></style>
