<template>
    <div :id="id" class="ql-toolbar ql-snow">
        <span class="ql-formats" v-if="buttonList.headers">
            <select class="ql-header">
                <option selected></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
            </select>
        </span>
        <span class="ql-formats" v-if="buttonList.size">
            <select class="ql-size">
                <option value="small">Small</option>
                <option value="mid">Mid</option>
                <option selected>Normal</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
            </select>
        </span>
    
        <span class="ql-formats" v-if="buttonList.styling">
            <button type="button" class="ql-bold"></button>
            <button type="button" class="ql-italic"></button>
            <button type="button" class="ql-underline"></button>
            <button type="button" class="ql-strike"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.alignment">
            <button type="button" class="ql-align" value></button>
            <button type="button" class="ql-align" value="center"></button>
            <button type="button" class="ql-align" value="right"></button>
            <button type="button" class="ql-align" value="justify"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.blockInsert">
            <button type="button" class="ql-blockquote"></button>
            <button type="button" class="ql-code-block"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.lists">
            <button type="button" class="ql-list" value="ordered"></button>
            <button type="button" class="ql-list" value="bullet"></button> 
            <button type="button" class="ql-list" value="check"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.indents">
            <button type="button" class="ql-indent" value="-1"></button>
            <button type="button" class="ql-indent" value="+1"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.colors">
            <select class="ql-color">
                <option value="rgb(0, 0, 0)" />
                <option value="rgb(230, 0, 0)" />
                <option value="rgb(255, 153, 0)" />
                <option value="rgb(255, 255, 0)" />
                <option value="rgb(0, 138, 0)" />
                <option value="rgb(0, 102, 204)" />
                <option value="rgb(153, 51, 255)" />
                <option value="rgb(255, 255, 255)" />
                <option value="rgb(250, 204, 204)" />
                <option value="rgb(255, 235, 204)" />
                <option value="rgb(204, 224, 245)" />
                <option value="rgb(235, 214, 255)" />
                <option value="rgb(187, 187, 187)" />
                <option value="rgb(102, 185, 102)" />
            </select>
            <select class="ql-background">
                <option value="rgb(0, 0, 0)" />
                <option value="rgb(230, 0, 0)" />
                <option value="rgb(255, 153, 0)" />
                <option value="rgb(255, 255, 0)" />
                <option value="rgb(0, 138, 0)" />
                <option value="rgb(0, 102, 204)" />
                <option value="rgb(153, 51, 255)" />
                <option value="rgb(255, 255, 255)" />
                <option value="rgb(250, 204, 204)" />
                <option value="rgb(255, 235, 204)" />
                <option value="rgb(204, 224, 245)" />
                <option value="rgb(235, 214, 255)" />
                <option value="rgb(187, 187, 187)" />
                <option value="rgb(102, 185, 102)" />
            </select>
        </span>

        <span class="ql-formats" v-if="buttonList.inserts">
            <button type="button" class="ql-link"></button>
            <button type="button" class="ql-image"></button> 
            <button type="button" class="ql-video"></button>
        </span>

        <span class="ql-formats" v-if="buttonList.clean">
            <button type="button" class="ql-clean"></button>
        </span>

        <!-- <span class="ql-formats">
            <button type="button" class="ql-CustomBlot"><font-awesome-icon icon="fa-solid fa-pencil" /></button>
            <button type="button" class="ql-DynamicControl"><font-awesome-icon icon="fa-solid fa-arrow-down" /></button>
            <button type="button" class="ql-DynamicControlInline"><font-awesome-icon icon="fa-solid fa-layer-group" /></button>
        </span> -->
        <span class="ql-formats">
            <select class="ql-selectDynamicControl">
                <option value="inline"></option>
                <option value="block"></option>
            </select>
        </span>
    </div>
</template>

<script>
     export default {
        name: 'custom-toolbar',
        props:{
            buttonList:Object,
            id:{
                type:String,
                default:"id"
            }
        }
     }
</script>

<style lang="scss">
   .quillWrapper.custom .ql-snow.ql-toolbar {
        padding-top: 8px;
        padding-bottom: 4px;
        border-bottom:0px;
    }


    .dynamic-control{
        color:red !important;
    }

    .dynamic-control.block{
        margin-block-start: 1em;
        margin-block-end: 1em;
    }

    .dynamic-control .control-wrapper{
        display:inline-flex;
        flex-direction:row;
        gap:10px;
        align-items: center;
        background: $base-white;
        transition-property: background;
        transition-duration: 1s;
        transition-delay: 2s;
    }

    .dynamic-control .control-wrapper:hover{
        border: 1px solid #ccc;
        border-radius:2px; 
        background: lighten( $template-background, 1% );
        padding:6px 6px;
        margin-top:-6px;
        margin-bottom:-6px;
        transition-delay: 0s;
    }

    .dynamic-control .control-wrapper .edit{
        border-radius:2px; 
        background: $keppel;
        color:$base-white;
        font-size:13px;
        padding:0px 6px;
    }

    
    // Dynamic Control Setup

    .ql-snow .ql-picker.ql-selectDynamicControl {
        width: 150px;
    }

    .ql-snow .ql-picker.ql-selectDynamicControl .ql-picker-label::before {
        content: 'Dynamic Control';
    }
    .ql-snow .ql-picker.ql-selectDynamicControl .ql-picker-item[data-value="inline"]::before {
        content: 'inline';
    }
    .ql-snow .ql-picker.ql-selectDynamicControl .ql-picker-item[data-value="block"]::before {
        content: 'block';
    }

    .ql-size-small{
        font-size:10px;
    }

</style>