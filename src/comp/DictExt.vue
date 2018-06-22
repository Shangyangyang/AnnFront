<template>
	<div class="block">
		<el-cascader
				expand-trigger="hover"
				:options="options"
				v-model="selectedOptions"
				@change="handleChange"
		>
		</el-cascader>
	</div>
</template>

<script>
import fetch from '@/util/fetch'

const dictExtList = data => fetch('/cc/dict/dictExtList', data);
export default {
    props:['type','parentType','selectedDict'],
    data() {
        return {
            options: [{
                value:'value',
                label: 'label',
                children: []
            }],
          /*  selectedOptions: []*/
        };
    },
    computed: {
        selectedOptions:function () {
			return this.selectedDict;
        }
    },
    created(){
        this.getDictExtList();
    },
    methods: {
        async getDictExtList(){
            let retObj = await dictExtList({type:this.type,parentType: this.parentType, page: 1, size: 0});
            if (retObj.status != 1) {
                this.$message({
                    type: 'error',
                    message: '获取数据失败'
                });
                return;
            }
            return this.options=retObj.data.list;
        },
        handleChange(value) {
            this.$emit('update:selectedDict',value);
        }
    }
};
</script>