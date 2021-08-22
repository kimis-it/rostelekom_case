
    const exportToPngButton = document.querySelector(".export_to_png"),
        exportToHtmlButton = document.querySelector(".export_to_html"),
        exportToRtButton = document.querySelector(".export_to_rt"),

        sidebar = document.querySelector(".secondary_buttons"),

        mainScreen = document.querySelector("#main"),
        mainContainer = document.querySelector("section")
        canvas = document.querySelector(".canvas"),
        renderedCanvasContainer = document.querySelector(".rendered_canvas_container"),
        cellClass = "newItem"; 

    let isCurrentElementFromSidebar = false
        currentElementId = 0;

    let copyElementToDataTransfer = (e) => {
        e.dataTransfer.setData("text/plain", e.target.className); // В dataTransfer записываем ссылку на элемент

        e.dataTransfer.dropEffect = "copy";

        if(e.currentTarget.parentNode.className == "secondary_buttons") { // Если елемент из сайдбара, то включаем триггер
            isCurrentElementFromSidebar = true;
        } else {
            isCurrentElementFromSidebar = false;
        }
    }

    let makeElementEditable = (e) => { // Функция для редактирования элемента
        e.target.setAttribute("contenteditable","true");
    }

    let endEditingElement = (e) => {
        if(e.keyCode === 13) {
            e.target.setAttribute("contenteditable","false");
        }
    }

    let pasteElementFromDataTransfer = (e) => {
        const data = e.dataTransfer.getData("text/plain");

        if(isCurrentElementFromSidebar) {
            let currentElement = document.getElementsByClassName(data)[0];
            let newElement = currentElement.cloneNode(true);    // Копируем элемент
            newElement.classList.add("custom-" + currentElementId); // Присваеваем ему уникальный класс

            newElement.addEventListener("dragstart", (e) => {       // Вешаем на него событие по нача
                copyElementToDataTransfer(e);
            });

            newElement.addEventListener("dblclick", (e) => {
                makeElementEditable(e);
            });

            newElement.addEventListener("keydown", (e) => {
                endEditingElement(e);
            });

            isCurrentElementFromSidebar = false;
            e.target.appendChild(newElement);
            currentElementId++;
        } else {
            e.target.appendChild(document.getElementsByClassName(data)[0]);
        }
    }


    Array.from(sidebar.children).map((item) => { 
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (e) => { // Обработчик события по началу перетаскивания, вешается на каждый элемент
            copyElementToDataTransfer(e);
        });
    });

    mainScreen.addEventListener("drop", (e) => { // Обработчик события по окончанию перетаскивания, вешается на места приземления
        console.log(e.target.className);
        if(e.target.classList[0] == cellClass) { // Если элемент приземляется только в разрешенные ячейки
            pasteElementFromDataTransfer(e);
        }
    });
   

    mainScreen.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });

    exportToPngButton.addEventListener("click", (e) => { // Экспорт в Png
        e.preventDefault();

        let rows = document.querySelectorAll("row"),
            items = document.querySelectorAll(".newItem"),
            rowSettings = document.querySelectorAll(".row-settings"),
            templates = document.querySelectorAll(".templates");
            dataURL = canvas.toDataURL();
        
        Array.from(rows).map((item) => {    // Перед фотографированием скрываем рамки у рядов
            item.classList.add("noborder");
        });

        Array.from(items).map((item) => {   // Перед фотографированием скрываем рамки у элементов 
            item.classList.add("noborder");
        });

        Array.from(rowSettings).map((item) => {
            item.classList.add("dn");
        });

        Array.from(templates).map((item) => {
            item.classList.add("dn");
        });

        addRowButton.classList.add("dn");
        

        domtoimage.toBlob(mainContainer)
            .then(function (blob) {
                download(blob, "rt_view.png", "image/png");

                Array.from(rows).map((item) => { // Возвращаем рамки на место
                    item.classList.remove("noborder");
                });
        
                Array.from(items).map((item) => { // Возвращаем рамки на место
                    item.classList.remove("noborder");
                });

                Array.from(rowSettings).map((item) => {
                    item.classList.remove("dn");
                });

                Array.from(templates).map((item) => {
                    item.classList.remove("dn");
                });

                addRowButton.classList.remove("dn");
            })
            .catch(function (error) {
                console.error('Ошибка сохранения изображения: ', error);
            });

      
    });

    exportToHtmlButton.addEventListener("click", (e) => { // Экспорт в HTML
        let data = mainContainer.innerHTML;
        download(data, "rt_view.html", "text/plain");
    });

    exportToRtButton.addEventListener("click", (e) => { // Экспорт во внутренний формат Russian Nano JSON
        let data = Array.prototype.slice.call(mainContainer.childNodes);
        download(data, "rt_view.json", "text/plain");
    });
