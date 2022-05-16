import { EventRef, Plugin, TAbstractFile, TFile } from "obsidian";
import { ShowFilesModal } from "./modal";
import { DEFAULT_SETTINGS, TimekeeperSettings, TimekeeperSettingsTab } from "./settings";

export default class TimekeeperPlugin extends Plugin {
	settings: TimekeeperSettings;
	modifyERef: EventRef;

	// replaces yaml root key in form 'key:' to replacement string
	replaceRootKey(data: string, key: string, replacement: string): string {
		return data.replace(RegExp(`^${key} *:(.*[ \t]*)\$`, 'gmu'), `${key}: ${replacement}`)
	}

	getDatetime(): string {
		return window.moment().format(this.settings.timeFormat);
	}

	enableCreateEvent() {
		this.registerEvent(this.app.vault.on("create", this.create, this));
	}

	// function that goes through all files and finds those that are missing frontmatter keys
	findFilesThatNeedFixing(): TFile[] {
		return this.app.vault.getMarkdownFiles().filter(file => {
			var cache = this.app.metadataCache.getFileCache(file).frontmatter;

			// im unsure what to do if there is no cache
			if (cache === undefined)
				return true;

			return !(this.settings.creationTimeKey in cache
				&& this.settings.modificationTimeKey in cache);
		});
	}

	async create(file: TAbstractFile) {
		if (file instanceof TFile) {
			console.log("created file", file);

			var content = await file.vault.read(file);
			if (content.length == 0) {
				content = `---
${this.settings.creationTimeKey}: X
${this.settings.modificationTimeKey}: X
---`;
			}

			// TODO: clean this up
			var editedContent = this.replaceRootKey(content, this.settings.creationTimeKey, this.getDatetime());
			editedContent = this.replaceRootKey(editedContent, this.settings.modificationTimeKey, this.getDatetime());

			console.log("should look like this", editedContent);

			this.app.vault.offref(this.modifyERef);
			await this.app.vault.modify(file, editedContent);
			this.modifyERef = this.app.vault.on("modify", this.modify, this);
		}
	}

	async modify(file: TAbstractFile) {
		if (file instanceof TFile) {
			var editedContent = this.replaceRootKey(
				await file.vault.read(file),
				this.settings.modificationTimeKey,
				this.getDatetime());

			// had to do this ugly thing otherwise it would get all loopy
			this.app.vault.offref(this.modifyERef);
			await this.app.vault.modify(file, editedContent);
			this.modifyERef = this.app.vault.on("modify", this.modify, this);
		}
	}

	async onload() {
		await this.loadSettings();

		this.modifyERef = this.app.vault.on("modify", this.modify, this);

		// had to do this otherwise it would go into some kind of loop on startup
		// if (this.settings.appendOnCreate) {
		// 	setTimeout(() => {
		// 		console.log("Registering create");
		// 		this.enableCreateEvent();
		// 	}, 1000);
		// }

		this.addCommand({
			id: "timekeeper-find-missing",
			name: "Find files without timekeeper frontmatter",
			callback: () => new ShowFilesModal(this.app, this.findFilesThatNeedFixing()).open(),
		});

		this.addSettingTab(new TimekeeperSettingsTab(this.app, this));
	}

	onunload() {
		this.app.vault.offref(this.modifyERef);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
