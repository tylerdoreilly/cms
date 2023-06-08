import SnippetControlEditing from './snippetControlEditing';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class SnippetControl extends Plugin {
    static get requires() {
        return [ SnippetControlEditing ];
    }
}