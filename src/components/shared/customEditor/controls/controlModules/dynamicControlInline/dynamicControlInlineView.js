import { 
    View,
    LabeledFieldView,			
    createLabeledInputText,
    ButtonView,
    submitHandler } from '@ckeditor/ckeditor5-ui';
import { icons } from '@ckeditor/ckeditor5-core';

export default class FormView extends View {
    constructor( locale ) {
        super( locale );

        // Create the save and cancel buttons.
        this.saveButtonView = this._createButton(
            'Edit', true, icons.pencil, 'ck-button-save'
        );

        // Set the type to 'submit', which will trigger
        // the submit event on entire form when clicked.
        this.saveButtonView.type = 'submit';

        this.cancelButtonView = this._createButton(
            'Delete', true, icons.cancel, 'ck-button-cancel'
        );

         // Delegate ButtonView#execute to FormView#cancel.
         this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

        this.childViews = this.createCollection( [
            this.saveButtonView,
            this.cancelButtonView
        ] );


        this.setTemplate( {
            tag: 'form',
            attributes: {
                class: [ 'ck', 'ck-abbr-form' ],
                tabindex: '-1'
            },
            children: this.childViews	
        } );
    }

    render() {
        super.render();

        // Submit the form when the user clicked the save button
        // or pressed enter in the input.
        submitHandler( {
            view: this
        } );
    }

    focus() {
        this.childViews.first.focus();
    }


    _createInput( label ) {
        const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

        labeledInput.label = label;

        return labeledInput;
    }

    _createButton( label, withText, icon, className ) {
        const button = new ButtonView();

        button.set( {
            label,
            withText,
            icon,
            tooltip: true,
            class: className
        } );

        return button;
    }

}