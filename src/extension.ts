import * as vscode from 'vscode';
import { ActivePanel, ACTIVE_PANELS } from './ActivePanel';
import * as path from 'path';
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-jsonmap.openParser', async () => {

		var activePanel = ACTIVE_PANELS.find(x => x.panel && x.panel.active);
		if (vscode.window.activeTextEditor?.document.uri || activePanel) {
			var uri: vscode.Uri = activePanel?.uri || vscode.window.activeTextEditor?.document.uri;
			var text = (await vscode.workspace.openTextDocument(uri)).getText();
			var json: any = null;
			try {
				json = JSON.parse(text);
			} catch (error) {
				vscode.window.showErrorMessage('Unable to parse the original JSON file');
				return;
			}

			var activePanel = ACTIVE_PANELS.find(x => x.uri === uri);

			try {
				var command = await vscode.window.showInputBox({
					value: activePanel?.command || "",
					placeHolder: "data.map(x => x.id).filter(x => x > 10)"
				});
				var result = eval(`let data = ${text};
						  let result = ${command || "data"};
						  result;`);

				if (!activePanel || !activePanel.panel) {
					var panel = vscode.window.createWebviewPanel(
						uri.path, // Identifies the type of the webview. Used internally
						path.basename(uri.path), // Title of the panel displayed to the user
						vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
						{} // Webview options. More on these later.
					);
					panel.reveal();
					if (!activePanel) {
						activePanel = new ActivePanel(uri, command || "", panel);
						ACTIVE_PANELS.push(activePanel);
					} else {
						activePanel.command = command;
						activePanel.panel = panel;
					}
					activePanel.panel.onDidDispose(e => {
						activePanel.panel = null;
					});
				}

				activePanel.panel.webview.html = `<pre id="json">${JSON.stringify(result, null, 4)}</pre>`;
			} catch (error) {
				vscode.window.showErrorMessage(error.message);
			}
		} else {
			vscode.window.showInformationMessage('Please Open and select a JSON File');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }