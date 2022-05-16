import { App, Modal, Notice, TFile } from "obsidian";

export class ShowFilesModal extends Modal {
	files: TFile[];
	constructor(app: App, files: TFile[]) {
		super(app);
		this.files = files;
	}

	onOpen() {
		let { contentEl, titleEl } = this;
		titleEl.setText("Found " + this.files.length + " files with missing frontmatter properties");

		const div = contentEl.createDiv({
			cls: "show-modal-file-links",
		})

		this.files.forEach(file => {
			div.createEl("p", {
				cls: "show-modal-link",
				text: file.path
			}).addEventListener("click", async (e) => {
				this.close();
				await this.app.workspace.activeLeaf.openFile(file);
			});
		});

		contentEl.createEl("button", {
			text: "Cancel"
		}).addEventListener("click", () => this.close());

		contentEl.createEl("button", {
			cls: "trash-modal-copy",
			text: "Copy to clipboard",
		}).addEventListener("click", async () => {
			await navigator.clipboard.writeText(this.files.map(file => file.path).join("\n"));
			new Notice("Copied list to clipboard");
		});
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
