// simplebox/simpleboxediting.js

import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget';
import { InsertSnippetControlCommand }from './snippetControlCommand';      

export default class SnippetControlEditing extends Plugin {
    static get requires() {                                                   
        return [ Widget ];
    }

    init() {
        console.log( 'CustomControlEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'snippet-control__content' ) )
        );

        this.editor.commands.add( 'insertSnippetControl', new InsertSnippetControlCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'snippet', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        schema.register( 'snippetContent', {
            isLimit: true,
            allowIn: 'snippet',
            allowContentOf: '$root',
            allowAttributes: [ 'data-control', 'data-control-type' ]
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'snippetContent' ) && childDefinition.name == 'snippet' ) {
                return false;
            }
        } );

    }

    _defineConverters() {                                                     
        const conversion = this.editor.conversion;

        // Snippet converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'snippet',
            view: {
                name: 'section',
                classes: 'snippet-control'
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'snippet',
            view: {
                name: 'section',
                classes: 'snippet-control'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'snippet',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'snippet-control' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        // Snippet Description converters
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'div',
                classes: 'snippet-control__content',
                attributes: [ 'data-control', 'data-control-type' ]
            },
            model: ( viewElement, { writer: viewWriter } ) => {
                const dataControl = viewElement.getAttribute( 'data-control' );
                const dataControlType = viewElement.getAttribute( 'data-control-type' );

                return viewWriter.createElement( 'snippetContent', {
                    'data-control': dataControl,
                    'data-control-type': dataControlType
                } );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'snippetContent',
            view: (  modelElement, { writer: viewWriter } ) => createContentView( modelElement, viewWriter )
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'snippetContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                const widgetElement = createContentView( modelElement, viewWriter );

                return toWidgetEditable( widgetElement, viewWriter );
            }
        } );


        // Helper method for both downcast converters.
        function createContentView( modelElement, viewWriter ) {
            const dataControl = modelElement.getAttribute( 'data-control' );
            const dataControlType = modelElement.getAttribute( 'data-control-type' );

            const div = viewWriter.createEditableElement( 'div', { 
                class: 'snippet-control__content',
                'data-control': dataControl,
                'data-control-type': dataControlType
            } );

            return div;
        }
    }
}