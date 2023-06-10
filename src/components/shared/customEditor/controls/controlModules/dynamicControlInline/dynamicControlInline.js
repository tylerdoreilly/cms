// simplebox/simplebox.js
import DynamicControlInlineEditing from './dynamicControlInlineEditing';
import DynamicControlInlineUI from './dynamicControlInlineUI';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class DynamicControlInline extends Plugin {
    static get requires() {
        return [ DynamicControlInlineEditing, DynamicControlInlineUI ];
    }
}