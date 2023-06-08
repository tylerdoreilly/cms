import { Plugin } from '@ckeditor/ckeditor5-core';
import { OpenEditModalCommand }from './customControlCommand';      

export default class CustomControlEditing extends Plugin {
    init() {
        this.editor.commands.add( 'openEditModal', new OpenEditModalCommand( this.editor ) );
    }
}