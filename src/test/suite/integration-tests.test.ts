import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import * as path from 'path';
import TestHelper from '../TestHelper';
import { ParserInstance } from '../../ParserInstance';
import ParserExtensionResult from '../../ParserExtensionResult';

suite('Integration Tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Parse Successful', async () => {
		await TestHelper.activateExtesion();
		console.log(JSON.stringify((await vscode.commands.getCommands()).filter(x => x.includes("clearCache"))));
		console.log(JSON.stringify((await vscode.commands.getCommands()).filter(x => x.includes("openParser"))));

		await vscode.commands.executeCommand("workbench.action.closeAllEditors");
		await vscode.commands.executeCommand("vscode-jsonmap.clearCache");

		var docContent = TestHelper.getMockValidDocument();
		var doc = await TestHelper.createTempDocument(docContent);

		var extensionResult: ParserExtensionResult = await vscode.commands.executeCommand("vscode-jsonmap.openParser", "data.map(x=> x.index)");
		var activePanelContent: string = extensionResult.parserInstances[0].panel.webview.html.trim();
		var expectedContent: string = `<pre id="json">[\n    0,\n    1,\n    2,\n    3,\n    4,\n    5,\n    6\n]</pre>`;

		assert.strictEqual(activePanelContent, expectedContent, "Current and Expected panel content don't match");
		assert.strictEqual(1, extensionResult.parserInstances.length, "Active Instances Length should be equal 1");
		assert.strictEqual(true, extensionResult.parserInstances[0].panel.visible, "Panel not Visible");

	});

	test('Parse Error', async () => {
		await TestHelper.activateExtesion();
		await vscode.commands.executeCommand("workbench.action.closeAllEditors");
		await vscode.commands.executeCommand("vscode-jsonmap.clearCache");

		var docContent = TestHelper.getMockInvalidDocument();
		var doc = await TestHelper.createTempDocument(docContent);

		var extensionResult: ParserExtensionResult = await vscode.commands.executeCommand("vscode-jsonmap.openParser", "data.map(x=> x.index)");

		assert.strictEqual(0, extensionResult.parserInstances.length, "Active Instances Length should be equal 0");
		assert.strictEqual(true, extensionResult.errorMessages.length === 1, "Error message was not found");
		assert.strictEqual(true, extensionResult.errorMessages[0].includes("Unable to parse the original JSON file."), "Error message does not match");
	});

	test('Parse Ignore when not active documents', async () => {
		await TestHelper.activateExtesion();
		await vscode.commands.executeCommand("workbench.action.closeAllEditors");
		await vscode.commands.executeCommand("vscode-jsonmap.clearCache");

		var extensionResult: ParserExtensionResult = await vscode.commands.executeCommand("vscode-jsonmap.openParser", "data.map(x=> x.index)");

		assert.strictEqual(0, extensionResult.parserInstances.length, "Active Instances Length should be equal 0");
		assert.strictEqual(true, extensionResult.informationMessages.length === 1, "Informational message was not found");
		assert.strictEqual(true, extensionResult.informationMessages[0].includes("Please Open and select a JSON File"), "Informational message does not match");
	});
});
