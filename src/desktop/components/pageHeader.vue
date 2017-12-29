<template>
    <div class="div-header-wrapper">
        <div class="div-header" :class="{'div-header-light': littleFlag}">
            <div class="div-logo">
                <transition name="transition-logo">
                    <img class="div-logo-img" v-if="!littleFlag" src="../../../static/assets/logo-white.png" @click="clickMenuItem('0')"/>
                </transition>
                <transition name="transition-logo">
                    <div class="div-logo-text" v-if="littleFlag">龙啸大件运输</div>
                </transition>
            </div>
            <div>
                <transition name="transition-fade-hight">
                    <div class="div-phone" v-if="!littleFlag">
                        <i class="iconfont icon-phone i-phone"></i> 13111111111
                    </div>
                </transition>
                <div class="div-menu">
                    <div class="div-menu-item" :class="{'div-menu-item-selected': menu.selected}" v-for="menu in menus" :key="menu.id" @click="clickMenuItem(menu.id)">{{menu.text}}
                    </div>
                </div>
            </div>
        </div>
        <div class="div-slogan-wapper">
            <typing-slogan :slogans="slogans"></typing-slogan>
        </div>
    </div>
</template>
<script>
    import eventMixin from '../mixins/event'
    import typingSlogan from './typingSlogan'

    export default {
        mixins: [eventMixin],
        components: {
            'typing-slogan': typingSlogan
        },
        props: {
            selectedMenuId: {
                type: String,
                default: '0',
                required: true
            }
        },
        data() {
            return {
                menus: [{
                        id: '0',
                        text: '服务'
                    },
                    {
                        id: '1',
                        text: '案例'
                    },
                    {
                        id: '2',
                        text: '资源'
                    },
                    {
                        id: '3',
                        text: '我们'
                    }
                ],
                pageYOffset: 0,
                littleFlag: false,
                logoImageFlag: true,
                logoTextFlag: false,
                slogans: [
                    '<b>龙啸大件，</b><b class="hightlight-red">纵横天下。</b>',
                    '<b>通四海，达五洲，</b><b class="hightlight-red">成就所托。</b>',
                    '<b class="hightlight-red">您的嘱托，</b><b>我必承诺。</b>'
                ],
                sloganFlag: true
            }
        },
        watch: {
            pageYOffset: function (newValue) {
                if (newValue > 20 && !this.littleFlag) {
                    this.littleFlag = true
                } else if (newValue <= 20 && this.littleFlag) {
                    this.littleFlag = false
                }
            }
        },
        created() {
            for (let menu of this.menus) {
                menu.selected = menu.id == this.selectedMenuId
            }
            this.pageYOffset = window.pageYOffset
            this.addEvent(window, 'scroll', () => {
                this.pageYOffset = window.pageYOffset
            })
            // this.$nextTick(function () {
            //     this.readyFlag = true
            // })
        },
        methods: {
            clickMenuItem(menuId) {
                let tempMenus = JSON.parse(JSON.stringify(this.menus))
                for (let menu of tempMenus) {
                    menu.selected = menu.id == menuId
                }
                this.menus = tempMenus
                // TODO 页面跳转
                console.log('TODO 页面跳转')
            },

        }
    }
</script>
<style lang="scss" scoped>
    .div-header-wrapper {
        background-image: url(/static/assets/banner.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .div-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        padding: 2.5rem 1.5rem 1rem 1.5rem;
        transition: all .6s;
        position: fixed;
        z-index: 10;
        width: calc(100% - 3rem);
    }

    .div-header-light {
        background-color: rgba(0, 0, 0, 0.9);
        padding-top: 1rem;
    }

    .div-logo-img {
        width: 14rem;
        height: 6.5rem;
        cursor: pointer;
        position: absolute;
        top: 1rem;
    }

    .div-logo-text {
        height: 3.5rem;
        display: flex;
        align-items: flex-end;
        font-size: 2.4rem;
        font-weight: 600;
        position: absolute;
        top: 1rem;
    }

    .div-menu {
        display: flex;
    }

    .div-menu-item {
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        margin-left: 0.8rem;
        transition: color 0.3s;
    }

    $color-red: #e62b4c;

    .div-menu-item:hover {
        color: $color-red;
        border-bottom: 2px solid $color-red;
    }

    .div-menu-item-selected {
        color: $color-red;
        border-bottom: 2px solid $color-red;
    }

    .div-phone {
        text-align: right;
        padding-right: 1rem;
        font-size: 1.1rem;
        overflow: hidden;
    }

    .i-phone {
        font-size: 1.5rem;
    }

    .transition-logo-enter-active, .transition-logo-leave-active {
        transition: all .5s
    }
    .transition-logo-enter, .transition-logo-leave-to {
        opacity: 0;
        width: 8rem;
        height: 3.5rem;
    }

    .transition-fade-hight-enter-active, .transition-fade-hight-leave-active {
        transition: all .5s
    }
    .transition-fade-hight-enter, .transition-fade-hight-leave-to {
        opacity: 0;
        height: 0;
    }

    .div-slogan-wapper{
        padding: 15rem 0 10rem 0;
    }
</style>