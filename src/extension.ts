import * as vscode from 'vscode';
import { JsonMapParser } from './JsonMapParser';
import * as path from 'path';
export function activate(context: vscode.ExtensionContext) {
	var jsonMapParser = new JsonMapParser();

	let disposable = vscode.commands.registerCommand('vscode-jsonmap.openParser', function (command: any) {
		return jsonMapParser.execute(command);
	});

	context.subscriptions.push(disposable);
}
export function deactivate() { }