// simplebox/insertsimpleboxcommand.js
import { Command } from '@ckeditor/ckeditor5-core';

export class InsertSnippetControlCommand extends Command {
  
    execute(control) {
        console.log('control',control);
        const editor = this.editor;

        this.editor.model.change( writer => {
            this.editor.model.insertContent( createCustomControl( writer, editor, control ) );
        });  
      
    }
   
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'snippet' );

        this.isEnabled = allowedIn !== null;
    }
}

function createCustomControl( writer, editor, control ) {
    const text = `${control.content}`;
    const dataControl = `${control.text}`;
    const dataControlType = 'text-snippet';

    // Convert string with html to be parsed for model/view
    const htmlDP = editor.data.processor;
    const viewFragment = htmlDP.toView( text );
    const modelFragment = editor.data.toModel( viewFragment );

    // Create Widget Elements
    const snippet = writer.createElement( 'snippet' );
    const snippetContent = writer.createElement( 'snippetContent', {
       'data-control' : dataControl,
       'data-control-type' : dataControlType
    } );
    const placeholderView = writer.createDocumentFragment( 'div' );

    writer.insert( modelFragment, placeholderView, 0 );
    writer.insert( placeholderView, snippetContent, 0 );          
    writer.append( snippetContent, snippet );
   
    return snippet;
}

