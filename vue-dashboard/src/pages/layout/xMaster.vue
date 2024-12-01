<template>
    <div class="w-full h-full flex">
        <sidebar :dataOpenSideBar="openSideBar" />
        <div class="w-full h-full">
            <headerTop :dataOpenSideBar="openSideBar" :clickHamburguer="toggleSidebar" />
            <div class="w-full h-[calc(100vh-50px)]">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
import headerTop from './../../components/xHeader.vue'
import sidebar from './../../components/xSidebar.vue'

export default {
    components: { headerTop, sidebar },
    data() {
        return {
            openSideBar: true
        }

    },
    methods: {
        toggleSidebar() {
            this.openSideBar = !this.openSideBar
        }
    }

}

</script>

<style></style>