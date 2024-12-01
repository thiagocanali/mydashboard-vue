<template>
    <div class="w-full bg-gray-100">
        <div class="flex justify-between items-center h-[50px]">
            <div class="p-4 cursor-pointer hover:bg-gray-50">
                <i class="pi pi-bars"></i>
            </div>
            <div class="py-2">
                <InputText type="text" v-model="value" class="h-[40px]" placeholder="Search..." />
            </div>
            <div>
                <xAvatar icon="pi pi-user" class="mr-2" style="background-color: #9c27b0; color: #fff" shape="circle" />
            </div>
        </div>
    </div>

</template>

<script>
export default {


}

</script>

<style></style>