// simplebox/simplebox.js
import CustomControlEditing from './customControlEditing';
import CustomControlUI from './customControlUI';

import { Plugin } from '@ckeditor/ckeditor5-core';

export default class CustomControl extends Plugin {
    static get requires() {
        return [ CustomControlEditing, CustomControlUI ];
    }
}