<template>
    <div class="w-full h-full flex">
        <sidebar :dataOpenSideBar="openSidebar" />
        <div class="w-full h-full">
            <headerTop :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
            <div class="w-full h-[calc(100vh-50px)]">
                <router-view />
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
            openSidebar: true
        }
    },
    methods: {
        toggleSidebar() {
            this.openSidebar = !this.openSidebar
        }
    }

}
</script>

<style></style>