import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import * as path from 'path';
import TestHelper from '../TestHelper';
import { ActivePanel } from '../../ActivePanel';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Parse', async () => {
		await TestHelper.activateExtesion();
		var docContent = TestHelper.getMockValidDocument();
		var doc = await TestHelper.createTempDocument(docContent);
		var activePanels: ActivePanel[] = await vscode.commands.executeCommand("vscode-jsonmap.openParser", "data.map(x=> x.index)");
		var activePanelContent: string = activePanels[0].panel.webview.html.trim();
		var expectedContent: string = `<pre id="json">[\n    0,\n    1,\n    2,\n    3,\n    4,\n    5,\n    6\n]</pre>`;

		assert.strictEqual(activePanelContent, expectedContent, "Current and Expected panel content don't match");
		assert.strictEqual(true, activePanels[0].panel.active, "Panel not Active");
		assert.strictEqual(true, activePanels[0].panel.visible, "Panel not Visible");
	});
});
