<template>
    <div>
        <page-header selectedMenuId="0"></page-header>
        <div style="height: 2000px;">桌面首页</div>
    </div>
</template>
<script>
    import '../../style/common'
    import pageHeader from '../../components/pageHeader'
    // import eventMixin from '../../mixins/event'

    export default {
        // mixins: [eventMixin],
        components: {
            'page-header': pageHeader
        },
        // created() {
        //     this.addEvent(window,'scroll',function(){
        //         console.log('app' + window.pageYOffset)
        //     })
        // }
    }
</script>