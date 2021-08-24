import { LOCALSTORAGE_KEY } from "~shared/constants";

export default class UserDataController {
	private getUserName(): string | null {
		return localStorage.getItem(LOCALSTORAGE_KEY.userName);
	}

	private setUserName(userName: string): void {
		return localStorage.setItem(LOCALSTORAGE_KEY.userName, userName);
	}

	getOrSetUserName(): string {
		const userName = this.getUserName();
		if (userName) {
			return userName;
		}
		// TODO(jog1t): make this as a GUI fragment
		// eslint-disable-next-line no-alert
		const name = prompt("What's your name?");
		if (name) {
			this.setUserName(name);
			return name;
		}
		return this.getOrSetUserName();
	}
}
