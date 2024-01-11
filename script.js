const WorkspaceElement = document.getElementById("workspace");
const StatusBarElement = document.getElementById("statusBar");


class Panel {
	children;
	type;
	element;
	content;
	static TYPES = {
		"parent": 0, 
		"textarea": 1,
		"program": 2
	}; 
	static #TYPE_ELEMENTS = [
		"div",
		"textarea",
		"div"
	];
	constructor(element, type) {
		this.element = element;
		this.type = type;
	}
	static create(type) {
		const element = document.createElement(Panel.#TYPE_ELEMENTS[type]);
		return new Panel(element, type)
	}
	setType(type) {
		if (this.type !== type) {
			const element = document.createElement(Panel.#TYPE_ELEMENTS[type]);
			this.element.replaceWith(element);
		}
	}
	append(panel) {
		this.children.append(panel);
		this.element.appendChild(panel.element);
	}
	render() {
		this.element = document.createElement(Panel.#TYPE_ELEMENTS[type]);
		switch (this.type) {
			case Panel.TYPES.parent: {
				for (const panel of children) {
					this.element.appendChild(panel.element);
				}
				break;
			}
			case Panel.TYPES.textarea: {
				this.element.textContent = this.content;
				break;
			}
		}
	}
	static reconstruct(element) {
		const panel = new Panel()
		this.children = element.children;
		this.type = element.type;
		this.content = element.content;
		render();
	}
}

const workspaceRootPanel = new Panel(WorkspaceElement, Panel.TYPES.parent);
const workspacePanels = [];

function createPanel(type, parentPanel = workspaceRootPanel) {
	
	const panel = Panel.create(type);
	const parentPanelType = parentPanel.type;
	parentPanel.setType(Panel.TYPES.parent);
	if (parentPanelType !== Panel.TYPES.parent); {
		parentPanel.children.push(Panel.reconstruct(parentPanel));
	}
	parentPanel.children.push(panel);
	panel.render();
	parentPanel.render();
	workspacePanels.push(panel);
}
function setup() {
	createPanel(Panel.TYPES.textarea);
}

setup();