import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget,toWidget,viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget';
import { InsertDynamicControlInlineCommand }from './dynamicControlInlineCommand';

export default class DynamicControlInlineEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        console.log( 'DynamicControlInlineEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'dynamicControlInline' ) )
        );

        this.editor.commands.add( 'insertDynamicControlInline', new InsertDynamicControlInlineCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'dynamicControlInline', {
            inheritAllFrom: '$inlineObject',
            allowAttributes: [ 'name', 'data-control', 'data-control-name', 'data-control-content', 'data-control-type' ]
        } );
      
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'dynami-control-inline' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                const name = viewElement.getChild( 0 ).data;
                const dataControl = viewElement.getAttribute( 'data-control' );
                const dataControlName = viewElement.getAttribute( 'data-control-name' );
                const dataControlContent = viewElement.getAttribute( 'data-control-content' );
                const dataControlType = viewElement.getAttribute( 'data-control-type' );

                return modelWriter.createElement( 'dynamicControlInline', { 
                    name,
                    'data-control': dataControl,
                    'data-control-name': dataControlName,
                    'data-control-content': dataControlContent,
                    'data-control-type': dataControlType
                } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'dynamicControlInline',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createPlaceholderView( modelItem, viewWriter );

                // Enable widget handling on a placeholder element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'dynamicControlInline',
            view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
        } );

        // Helper method for both downcast converters.
        function createPlaceholderView( modelItem, viewWriter ) {
            const name = modelItem.getAttribute( 'name' );
            const dataControl = modelItem.getAttribute( 'data-control' );
            const dataControlName = modelItem.getAttribute( 'data-control-name' );
            const dataControlContent = modelItem.getAttribute( 'data-control-content' );
            const dataControlType = modelItem.getAttribute( 'data-control-type' );

            const placeholderView = viewWriter.createContainerElement( 'span', {
                class: 'dynami-control-inline',
                'data-control': dataControl,
                'data-control-name': dataControlName,
                'data-control-content': dataControlContent,
                'data-control-type': dataControlType
            } );

            // Insert the placeholder name (as a text).
            const innerText = viewWriter.createText( name );
            viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );

            return placeholderView;
        }
  
    }
}