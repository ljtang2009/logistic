<template>
    <div class="div-wapper">
        <div>
            <span ref="spSlogan" class="span-contant zero-height" v-for="(slogan, index) in slogans" :key="index" v-html="slogan" v-if="!readyFlag">
            </span>
            <span class="span-contant" v-for="(slogan, index) in slogansCopy" :key="index" v-html="slogan.html" v-if="index == sloganIndex" :style="{width: slogan.width}">
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            slogans: {
                type: Array,
                default: [],
                required: true
            }
        },
        data() {
            return {
                sloganIndex: 0,
                readyFlag: false,
                slogansCopy:[]
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                //设置每个广告语的宽度
                let index = 0
                for (let spSlogan of this.$refs.spSlogan) {
                    this.slogansCopy.push({
                        html: this.slogans[index],
                        width: '0',
                        maxWidth: spSlogan.offsetWidth + 'px',
                    })
                    index++
                }
                if (this.slogansCopy.length > 0) {
                    this.slogansCopy[0].width = this.slogansCopy[0].maxWidth
                }
                this.readyFlag = true
                //开始轮流显示
                this.displayInTurns()
            })
        },
        methods: {
            displayInTurns: function () {
                //如果当前的宽度为最大宽度, 则置0
                if (this.slogansCopy[this.sloganIndex].width == this.slogansCopy[this.sloganIndex].maxWidth) {
                    //显示广告语3秒
                    setTimeout(() => {
                        this.slogansCopy[this.sloganIndex].width = '0'
                        //收起动画为 0.5s
                        setTimeout(() => {
                            if (this.sloganIndex < this.slogansCopy.length - 1) {
                                this.sloganIndex++
                            }
                            else  {
                                this.sloganIndex = 0
                            }
                            //宽度为0的状态.1秒
                            setTimeout(() => {
                                this.slogansCopy[this.sloganIndex].width = this.slogansCopy[this.sloganIndex].maxWidth
                                //展开动画 0.5s
                                setTimeout(() => {
                                    //递归
                                    this.displayInTurns()
                                }, 500)
                            }, 100)
                        }, 500)
                    }, 3000)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .div-wapper {
        position: relative;
        left: 5rem;
        width: calc(100% - 10rem);
        background-color: rgba(0, 0, 0, 0.65);
        text-align: center;
        color: #fff;
        padding: 6rem 0;
        font-size: 2.2rem;
    }

    $color-red: #e62b4c;

    .span-contant {
        padding: 1.5rem 0;
        border-right: 2px solid $color-red;
        overflow: hidden;
        display: inline-block;
        white-space: nowrap;
        transition:width .5s;
    }

    .zero-height {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
</style>