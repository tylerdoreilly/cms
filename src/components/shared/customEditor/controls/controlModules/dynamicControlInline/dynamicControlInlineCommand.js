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
    console.log('dude',control)
    const text = `${control.text}`;
    const dataControl = JSON.stringify(control);
    const dataControlName = `${control.controlName}`;
    const dataControlType = `${control.controlType}`;
    const dataControlContent = `${control.text}`;

    const dynamicControlInline = writer.createElement( 'dynamicControlInline', {
        name: text,
        'data-control' : dataControl,
        'data-control-name' : dataControlName,
        'data-control-type' : dataControlType,
        'data-control-content' : dataControlContent
    } );

    return dynamicControlInline;
}
