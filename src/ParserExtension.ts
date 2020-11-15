import * as vscode from 'vscode';
import { ParserInstance } from './ParserInstance';
import PARSER_INSTANCES from './ParserInstanceCache';

import * as path from 'path';
import ParserExtensionResult from './ParserExtensionResult';


export class ParserExtension {

    private extensionResult: ParserExtensionResult = new ParserExtensionResult();

    public async execute(command: string): Promise<ParserExtensionResult> {
        var uri = this.getDocumentUri();
        if (uri) {
            try {
                var text = (await vscode.workspace.openTextDocument(uri)).getText();
                var json: any = this.parseJsonContent(text);
                var currentInstance = this.getDocumentParserInstance(uri);

                command = command || await this.showCommandInput(currentInstance);

                var result = this.evaluateCommand(text, command);

                if (!currentInstance) {
                    currentInstance = new ParserInstance(uri, command || "", this.createPanel(uri));
                    PARSER_INSTANCES.push(currentInstance);
                } else if (!currentInstance.panel) {
                    currentInstance.panel = this.createPanel(uri);
                }
                currentInstance.command = command;
                currentInstance.panel.onDidDispose(e => currentInstance.panel = null);

                this.setContentAndReveal(currentInstance.panel, result);
            } catch (error) {
                this.showErrorMessage(error.message);
            }
        } else {
            this.showInformationMessage('Please Open and select a JSON File');
        }
        this.extensionResult.parserInstances = PARSER_INSTANCES;

        return this.extensionResult;
    }


    private getActiveParserInstance(): ParserInstance {
        return PARSER_INSTANCES.find(x => x.panel && x.panel.active);
    }

    private getDocumentParserInstance(uri: vscode.Uri): ParserInstance {
        return PARSER_INSTANCES.find(x => x.uri === uri);
    }

    private getDocumentUri(): vscode.Uri {
        var activePanel = this.getActiveParserInstance();
        if (vscode.window.activeTextEditor?.document.uri || activePanel) {
            return activePanel?.uri || vscode.window.activeTextEditor?.document.uri;
        } else {
            return null;
        }
    }

    private parseJsonContent(content: string): any {
        try {
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Unable to parse the original JSON file. Exception: ${error.message}`);
        }
    }

    private async showCommandInput(activePanel: ParserInstance): Promise<string> {
        return await vscode.window.showInputBox({
            value: activePanel?.command || "",
            placeHolder: "data.map(x => x.id).filter(x => x > 10)"
        });
    }

    private evaluateCommand(text: string, command: string): string {
        var result = eval(` let data = ${text};
                            let result = ${command || "data"};
                            result;`);
        return result;
    }

    private createPanel(uri: vscode.Uri): vscode.WebviewPanel {
        let panel = vscode.window.createWebviewPanel(uri.path, path.basename(uri.path), vscode.ViewColumn.Two, {});
        return panel;
    }

    private setContentAndReveal(panel: vscode.WebviewPanel, content: string): void {
        panel.webview.html = `<pre id="json">${JSON.stringify(content, null, 4)}</pre>`;
        panel.reveal(vscode.ViewColumn.Two);
    }

    private showInformationMessage(message: string) {
        vscode.window.showInformationMessage(message);
        this.extensionResult.informationMessages.push(message);
    }

    private showErrorMessage(message: string) {
        vscode.window.showErrorMessage(message);
        this.extensionResult.errorMessages.push(message);
    }

}