import Game from "./Game";
import "~shared/types/assets";

window.addEventListener("load", () => {
	const style = window.document.createElement("style");
	style.innerText = `body { margin: 0; padding: 0; }`;
	window.document.body.appendChild(style);

	return new Game();
});
