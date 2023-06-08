import { Command } from '@ckeditor/ckeditor5-core';

export class InsertDynamicControlInlineCommand extends Command {
  
    execute(control) {
        console.log('control',control);
        this.editor.model.change( writer => {
            this.editor.model.insertObject( createCustomControl( writer, control ) );
        });      
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.checkChild( selection.focus.parent, 'dynamicControlInline' );
        this.isEnabled = allowedIn !== null;
    }
}

function createCustomControl( writer, control ) {
    const text = `${control.text}`;
    const dataControl = `${control.text}`;
    const dataControlType = 'text-snippet';

    const dynamicControlInline = writer.createElement( 'dynamicControlInline', {
        name: text,
        'data-control' : dataControl,
        'data-control-type' : dataControlType
    } );

    return dynamicControlInline;
}
