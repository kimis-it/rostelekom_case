let addRowButton = document.querySelector(".add_row");
function addRow() {
	var row = document.createElement("row");
	row.className = "row empty_element";
	row.append(choiceOfLayout());
	addRowSettingsPanel(row);
	document.getElementById("main").append(row);
	document.querySelectorAll('.templates-sample')
		.forEach(function (item) {
			item.addEventListener('click', function () {
				var templateName = this.getAttribute('template');
				var currentRow = item.parentNode.parentNode;
				currentRow.querySelector('.templates').remove();
				//currentRow.innerHTML = '';

				if (templateName == 'templates-sample_0') {
					createCol(currentRow, 1);
				}

				if (templateName == 'templates-sample_1') {
					createCol(currentRow, 2);
				}

				if (templateName == 'templates-sample_2') {
					createCol(currentRow, 3);
				}

				if (templateName == 'templates-sample_3') {
					createCol(currentRow, 4);
				}

				if (templateName == 'templates-sample_4') {
					createCol(currentRow, 2).querySelectorAll('.col')[0].className = 'col-4';
				}

				if (templateName == 'templates-sample_5') {
					createCol(currentRow, 2).querySelectorAll('.col')[1].className = 'col-4';
				}

				if (templateName == 'templates-sample_6') {
					var columns = createCol(currentRow, 3).querySelectorAll('.col');
					columns[0].className = 'col-3';
					columns[1].className = 'col-3';
				}

				if (templateName == 'templates-sample_7') {
					var columns = createCol(currentRow, 3).querySelectorAll('.col');
					columns[1].className = 'col-3';
					columns[2].className = 'col-3';
				}

				if (templateName == 'templates-sample_8') {
					var columns = createCol(currentRow, 3).querySelectorAll('.col')[1].className = 'col-6';
				}

				if (templateName == 'templates-sample_9') {
					createCol(currentRow, 5);
				}

				if (templateName == 'templates-sample_10') {
					createCol(currentRow, 6);
				}

				if (templateName == 'templates-sample_11') {
					createCol(currentRow, 3).querySelectorAll('.col')[1].className = 'col-8';
				}
			});
		});
}

function createCol(element, count = 1) {
	for (var i = 0; i < count; i++) {
		var col = document.createElement("col");
		col.className = "col";
		var newItem = document.createElement("div");
		newItem.className = 'newItem';
		newItem.innerHTML = '';
		col.append(newItem);

		element.append(col);
	}
	return element;
}

var templates = [
	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M100,0V50H0V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M49,0V50H0V0Z M100,0V50H51V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M32,0V50H0V0Z M66,0V50H34V0Z M100,0V50H68V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M23.5,0V50H0V0Z M49,0V50H25.5V0Z M74.5,0V50H51V0Z M100,0V50H76.5V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M32.6667,0V50H0V0Z M100,0V50H34.6667V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M65.3333,0V50H0V0Z M100,0V50H67.3333V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M24,0V50H0V0Z M50,0V50H26V0Z M100,0V50H52V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M48,0V50H0V0Z M74,0V50H50V0Z M100,0V50H76V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M24,0V50H0V0Z M74,0V50H26V0Z M100,0V50H76V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M18.4,0V50H0V0Z M38.8,0V50H20.4V0Z M59.2,0V50H40.8V0Z M79.6,0V50H61.2V0Z M100,0V50H81.6V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M15,0V50H0V0Z M32,0V50H17V0Z M49,0V50H34V0Z M66,0V50H51V0Z M83,0V50H68V0Z M100,0V50H85V0Z"></path></svg>',

	'<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M16,0V50H0V0Z M82,0V50H18V0Z M100,0V50H84V0Z"></path></svg>'
];

function choiceOfLayout() {
	var ul = document.createElement("ul");
	ul.className = "templates";
	ul.innerHTML = "<h8 class='templates-title'>???????????????? ????????????????</h8>";
	for (var i = 0; i < 12; i++) {
		var li = document.createElement("li");
		li.className = "templates-sample templates-sample_" + i;
		li.innerHTML = templates[i];
		li.setAttribute("template", "templates-sample_" + i);
		ul.append(li);
	}
	return ul;
}

function addRowSettingsPanel(element) {
	var parent = document.createElement("div");
	parent.className = "row-settings";
	var ul = document.createElement("ul");
	var lis = [
		document.createElement("li"),
		document.createElement("li"),
		document.createElement("li")];
	lis[0].innerHTML = '&#9650;';
	lis[0].setAttribute('onclick', 'upRow(this)');
	lis[1].innerHTML = '&#10006;';
	lis[1].setAttribute('onclick', 'removeRow(this)');
	lis[2].innerHTML = '&#9660;';
	lis[2].setAttribute('onclick', 'downRow(this)');
	lis.forEach(function (li) {
		ul.append(li);
	});
	parent.append(ul);
	element.append(parent);
}

function upRow(currentElement) {
	var currentRow = currentElement.parentNode.parentNode.parentNode;
	var previous = searchForAdjacentElement(currentRow, 0);
	if (previous) {
		currentRow.parentNode.insertBefore(currentRow, previous);
	}
}

function removeRow(currentElement) {
	currentElement.parentNode.parentNode.parentNode.remove();
}

function downRow(currentElement) {
	var currentRow = currentElement.parentNode.parentNode.parentNode;
	var previous = searchForAdjacentElement(currentRow, 1);
	if (previous) {
		currentRow.parentNode.insertBefore(previous, currentRow);
	}
}

function searchForAdjacentElement(elm, next){
	do {
		if(next)
			elm = elm.nextSibling;
		else
			elm = elm.previousSibling;
	} while (elm && elm.nodeType != 1);
	console.log(elm);
	return elm;
}

addRowButton.addEventListener("click", addRow);

function cheangeOrintation(currentElement){
	currentElement.classList.toggle('orintation_column');
}

addRow();