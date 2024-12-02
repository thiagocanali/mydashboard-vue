<template>
    <div class="w-full bg-gray-100">
        <div class="flex justify-between items-center h-[50px]">
            <div class="p-4 cursor-pointer hover:bg-gray-50" @click="clickHambuger">
                <i class="pi pi-bars"></i>
            </div>
            <div class="py-2">
                <InputText type="text" v-model="value" class="h-[40px]" placeholder="Search..." />
            </div>
            <div class="flex space-x-3 items-center justify-center px-3">
                <div class="text-md">User</div>
                <xAvatar icon="pi pi-user" class="mr-2 cursor-pointer" style="background-color: #9c27b0; color: #fff"
                    shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <xMenu id="overlay_menu" ref="menu" :model="items" :popup="true" />

            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        dataOpenSideBar: Boolean,
        clickHambuger: Function
    },
    data() {
        return {
            items: [

                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    command: () => {
                        this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                    }
                },
            ]
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
    }

}
</script>

<style></style>
