// simplebox/simplebox.js
import DynamicControlBlockEditing from './dynamicControlBlockEditing';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class DynamicControlInline extends Plugin {
    static get requires() {
        return [ DynamicControlBlockEditing ];
    }
}