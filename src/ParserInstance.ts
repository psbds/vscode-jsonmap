import * as vscode from 'vscode';

export class ParserInstance {
    constructor(uri: vscode.Uri, command: string, panel: vscode.WebviewPanel) {
        this.uri = uri;
        this.panel = panel;
        this.command = command;
    }
    public uri: vscode.Uri;
    public panel: vscode.WebviewPanel;
    public command: string;
}