<template>
    <div class="w-full h-full">
        <sidebar />
        <headerTop />
        <div class="w-full h-[calc(100vh-50px)]">
            <router-view>
            </router-view>
        </div>
    </div>
</template>

<script>
import headerTop from './../../components/xHeader.vue'
import sidebar from './../../components/xSidebar.vue'

export default {
    components: { headerTop, sidebar },

}

</script>

<style></style>