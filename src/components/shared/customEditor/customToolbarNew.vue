<template>
    <div id="toolbar-2000" class="ql-toolbar ql-snow">
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
                <option value="8px">8</option>
                <option value="9px">9</option>
                <option value="10px">10</option>
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="20px">20</option>
                <option selected>Normal</option>
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

        <span class="ql-formats">
            <button type="button" class="ql-selectCustomInsert">Custom Controls</button>
        </span>
    </div>
</template>

<script>
     export default {
        name: 'custom-toolbar-new',
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
        border-bottom:1px solid $border;
        border-top:1px solid $border !important;
        border-left:0px solid $border !important;
        border-right:0px solid $border !important;
        background:$template-background;
        margin-bottom:0px;
    }

    .dynamic-control{
        color:red !important;
    }

    .dynamic-control.block{
        margin-block-start: 1em;
        margin-block-end: 1em;
    }

    // Custom font sizes

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="8px"]::before {
        content: '8';
        font-size: 8px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="9px"]::before {
        content: '9';
        font-size: 9px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
        content: '10';
        font-size: 10px !important;
    }
   
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
        content: '12';
        font-size: 12px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
        content: '14';
        font-size: 14px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
        content: '16';
        font-size: 16px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
        content: '18';
        font-size: 18px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
        content: '20';
        font-size: 20px !important;
    }
    

    // Dynamic Control Setup

    .ql-snow.ql-toolbar button.ql-selectCustomInsert {
        width: 150px;
        display: inline-block;
        line-height: 22px;
        font-size:15px;
    }

    .ql-size-small{
        font-size:10px;
    }

</style>