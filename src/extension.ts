import * as vscode from 'vscode';
import { ParserExtension } from './ParserExtension';
import { clearCache } from './ParserInstanceCache';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('vscode-jsonmap.openParser', function (command: any) {
		let parserExtension = new ParserExtension();
		return parserExtension.execute(command);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscode-jsonmap.clearCache', function (command: any) {
		clearCache();
	}));
}
export function deactivate() { }