const vscode = require('vscode');
const fs = require("fs");
const path = require("path");
const templateStyled = require('./templates/styled');
const templateIndex = require('./templates');
const templateTest = require('./templates/test');

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.gerador-arquivos-react', function (e) {
		const filePath = e.path;
		const nameFolder = filePath.substring(filePath.lastIndexOf("/")+1);
		const mockTemplates = setMocks(nameFolder);

		for (let [key, value] of mockTemplates) {
			let objectCreate = value();
			createFile(filePath, objectCreate );
		}
		vscode.window.showInformationMessage('Done!');
	});

	context.subscriptions.push(disposable);
}

function setMocks(nameFolder) {
	let mockTemplates = new Map();
	mockTemplates.set('Styled', () => {
		const fileName =  'styled.js'
		const mockFunction = templateStyled()
		return { fileName , mockFunction  }
	})
	mockTemplates.set('Index', () => {
		const fileName =  'index.js'
		const mockFunction = templateIndex(nameFolder)
		return { fileName , mockFunction  }
	})
	mockTemplates.set('Test', () => {
		const fileName =  `${nameFolder}.test.js`
		const mockFunction = templateTest(nameFolder)
		return { fileName , mockFunction  }
	})

	return mockTemplates
}

function createFile(pathFile, objectCreate) {
	fs.writeFile(path.join(`${pathFile}/`, `${objectCreate.fileName}`), objectCreate.mockFunction, async (err) => {
		if (err) {
			return vscode.window.showErrorMessage(
			"Opss.. Error"
			);
		}
	});
}


exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
