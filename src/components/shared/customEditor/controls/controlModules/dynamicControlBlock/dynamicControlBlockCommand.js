import { Command } from '@ckeditor/ckeditor5-core';

export class InsertDynamicControlBlockCommand extends Command {
  
    execute(control) {
        console.log('control',control);
        this.editor.model.change( writer => {
            this.editor.model.insertObject( createCustomControl( writer, control ) );
        });      
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'dynamicControlBlock' );

        this.isEnabled = allowedIn !== null;
    }
}

function createCustomControl( writer, control ) {
    const text = `${control.text}`;
    const dataControl = `${control.text}`;
    const dataControlType = 'dynamic-control';

    const dynamicControlBlock = writer.createElement( 'dynamicControlBlock' );
    const dynamicControlBlockContent = writer.createElement( 'dynamicControlBlockContent', {
        'data-control' : dataControl,
        'data-control-type' : dataControlType
     } );
    const paragraph = writer.createElement( 'paragraph' );

    // const paragraph = writer.createElement( 'paragraph', {class: 'flashback', dataControl:`${control.text}`} );
    // writer.setAttribute( 'data-control', `${control.text}`, paragraph );
    writer.appendText(text, paragraph );

    writer.insert( paragraph, dynamicControlBlockContent, 0 );            
    writer.append( dynamicControlBlockContent, dynamicControlBlock );

    return dynamicControlBlock;
}
