'use strict';

class SettingsKeeperService {
    constructor() {
        this._load();
    }

    setSetting(key, value) {
        this._settings[key] = value;
        this._save();
    }

    getSetting(key) {
        return this._settings[key];
    }

    _save() {
        Object.keys(this._settings).forEach((key) => {
            localStorage.setItem(key, this._settings[key]);
        });
    }

    _load() {
        this._settings = {};
        for (let key in localStorage) {
            this._settings[key] = localStorage.getItem(key);
        }
    }
}

export const settingsKeeperService = new SettingsKeeperService();