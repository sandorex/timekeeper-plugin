import { App, PluginSettingTab, Setting } from "obsidian";
import TimekeeperPlugin from "./main";

export interface TimekeeperSettings {
	creationTimeKey: string;
	modificationTimeKey: string;
	timeFormat: string;
	appendOnCreate: boolean;
}

export const DEFAULT_SETTINGS: TimekeeperSettings = {
	creationTimeKey: "ctime",
	modificationTimeKey: "mtime",
	timeFormat: "YYYY-DD-MM[T]HH:mm[Z]",
	appendOnCreate: false
}

export class TimekeeperSettingsTab extends PluginSettingTab {
	plugin: TimekeeperPlugin;

	constructor(app: App, plugin: TimekeeperPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h3", {
			attr: {
				"style": "text-align: center;",
			}, text: "Timekeeper Plugin Settings"
		});

		new Setting(containerEl)
			.setName("Creation Time Property")
			.setDesc("Name of frontmatter property that hold time of creation of the file")
			.addText(cb => cb
				.setPlaceholder(DEFAULT_SETTINGS.creationTimeKey)
				.setValue(this.plugin.settings.creationTimeKey)
				.onChange(async (value) => {
					this.plugin.settings.creationTimeKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Modification Time Property")
			.setDesc("Name of frontmatter property that hold time of last modification of the file")
			.addText(cb => cb
				.setPlaceholder(DEFAULT_SETTINGS.modificationTimeKey)
				.setValue(this.plugin.settings.modificationTimeKey)
				.onChange(async (value) => {
					this.plugin.settings.modificationTimeKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Time Format")
			.setDesc("(momentjs format)")
			.addMomentFormat(cb => cb
				.setValue(this.plugin.settings.timeFormat)
				.setDefaultFormat(DEFAULT_SETTINGS.timeFormat)
				.onChange(async (value) => {
					if (value.length == 0)
						this.plugin.settings.timeFormat = DEFAULT_SETTINGS.timeFormat;
					else
						this.plugin.settings.timeFormat = value;

					await this.plugin.saveSettings();
				}));

		// TODO: enable/disable the event on click here!
		// new Setting(containerEl)
		// 	.setName("On Create (EXPERIMENTAL)")
		// 	.setDesc("Automatically set time on every new file created, highly experimental and may clash with other plugins")
		// 	.addToggle(cb => createBrotliDecompress
		// 		.setValue(this.plugin.settings.appendOnCreate)
		// 		.onChange(async (value) => {
		// 			this.plugin.settings.appendOnCreate = value;
		// 			await this.plugin.saveSettings();
		// 		}));
	}
}
