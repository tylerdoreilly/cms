import { Plugin } from '@ckeditor/ckeditor5-core';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import { ContextualBalloon, clickOutsideHandler } from '@ckeditor/ckeditor5-ui';
import FormView from './dynamicControlInlineView';	
import { customControlEventBus } from '../customControls/customControlEventBus';
import './styles.css';	

export default class DynamicControlInlineUI extends Plugin {

    init() {
        const editor = this.editor;
        const view = editor.editing.view;
        const viewDocument = view.document;

        this._balloon = this.editor.plugins.get( ContextualBalloon );

        view.addObserver( ClickObserver );
        
        editor.listenTo( viewDocument, 'click', ( evt, data ) => {
            const modelElement = editor.editing.mapper.toModelElement( data.target);
            const inlineData = modelElement.getAttribute( 'data-control' );

            this.formView = this._createFormView(inlineData, modelElement );

            if ( modelElement.name == 'dynamicControlInline' ) {
                console.log( 'Placeholder has been clicked.' );
                this._showUI();
            }
        } );
    }

    _createFormView(inlineData, modelElement) {
        const editor = this.editor;
        const formView = new FormView( editor.locale );  

        this.listenTo( formView, 'submit', () => {
            let selectionData = JSON.parse(inlineData);
            editDynamicControl(event, {open: true, data: selectionData});
            this._hideUI();
        } ); 

         // Hide the form view after clicking the "Cancel" button.
         this.listenTo( formView, 'cancel', () => {
            editor.model.change(writer => {
                writer.remove(modelElement);
             });

            this._hideUI();
        } );

        // Hide the form view when clicking outside the balloon.
        clickOutsideHandler( {
            emitter: formView,
            activator: () => this._balloon.visibleView === formView,
            contextElements: [ this._balloon.view.element ],
            callback: () => this._hideUI()
        } );

        return formView;
    }

    _getBalloonPositionData() {
        const view = this.editor.editing.view;
        const viewDocument = view.document;
        let target = null;

        // Set a target position by converting view selection range to DOM.
        target = () => view.domConverter.viewRangeToDom(
            viewDocument.selection.getFirstRange()
        );

        return {
            target
        };
    }

    _showUI() {
        this._balloon.add( {
            view: this.formView,
            position: this._getBalloonPositionData()
        } );

        this.formView.focus();
    }

    _hideUI() {
        this.formView.element.reset();
        this._balloon.remove( this.formView );

        // Focus the editing view after closing the form view.
        this.editor.editing.view.focus();
    }
}

function editDynamicControl(event, controlValue){
    customControlEventBus.$emit('edit-control', controlValue)
    console.log("button clicked", {event, controlValue}); 
}