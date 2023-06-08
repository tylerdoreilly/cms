// simplebox/simpleboxediting.js

import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';
import { InsertDynamicControlBlockCommand }from './dynamicControlBlockCommand';      

export default class DynamicControlBlockEditing extends Plugin {
    static get requires() {                                                   
        return [ Widget ];
    }

    init() {
        console.log( 'DynamicControlBlockEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertDynamicControlBlock', new InsertDynamicControlBlockCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'dynamicControlBlock', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        schema.register( 'dynamicControlBlockContent', {
            isLimit: true,
            allowIn: 'dynamicControlBlock',
            allowContentOf: '$root',
            allowAttributes: [ 'data-control', 'data-control-type' ]
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'dynamicControlBlockContent' ) && childDefinition.name == 'dynamicControlBlock' ) {
                return false;
            }
        } );

    }

    _defineConverters() {                                                     
        const conversion = this.editor.conversion;

        // DynamicControlBlock converters

        conversion.for( 'upcast' ).elementToElement( {
            model: 'dynamicControlBlock',
            view: {
                name: 'section',
                classes: 'dynamic-control-block'
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'dynamicControlBlock',
            view: {
                name: 'section',
                classes: 'dynamic-control-block'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'dynamicControlBlock',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'dynamic-control-block' } );

                return toWidget( section, viewWriter, { label: 'dynamic Control Inline box widget' } );
            }
        } );


        // DynamicControlBlockDescription converters

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'div',
                classes: 'dynamic-control-block-content',
                attributes: [ 'data-control', 'data-control-type' ]
            },
            model: ( viewElement, { writer: viewWriter } ) => {
                const dataControl = viewElement.getAttribute( 'data-control' );
                const dataControlType = viewElement.getAttribute( 'data-control-type' );

                return viewWriter.createElement( 'dynamicControlBlockContent', {
                    'data-control': dataControl,
                    'data-control-type': dataControlType
                } );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'dynamicControlBlockContent',
            view: (  modelElement, { writer: viewWriter } ) => createPlaceholderView( modelElement, viewWriter )
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'dynamicControlBlockContent',
            view: ( modelElement, { writer: viewWriter } ) => {
                const widgetElement = createPlaceholderView( modelElement, viewWriter );

                return toWidgetEditable( widgetElement, viewWriter );
            }
        } );


        // Helper method for both downcast converters.

        function createPlaceholderView( modelElement, viewWriter ) {
            const dataControl = modelElement.getAttribute( 'data-control' );
            const dataControlType = modelElement.getAttribute( 'data-control-type' );

            const div = viewWriter.createEditableElement( 'div', { 
                class: 'dynamic-control-block-content',
                'data-control': dataControl,
                'data-control-type': dataControlType
            } );

            return div;
        }
        
    }
}