import { customControlEventBus } from './customControlEventBus';
import { Command } from '@ckeditor/ckeditor5-core';

export class OpenEditModalCommand extends Command {
    execute() {
       editDynamicControl(event, true);
    }
}

function editDynamicControl(event, controlValue){
    customControlEventBus.$emit('edit-control', true)
    console.log("button clicked", {event, controlValue}); 
}
