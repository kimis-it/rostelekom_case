window.onload = () => {
    let button1 = document.querySelector(".start"),
        button2 = document.querySelector(".update_categories"),
        button3 = document.querySelector(".reset"),
        textField = document.querySelector(".textfield"),

        exportToPngButton = document.querySelector(".export_to_png"),
        exportToHtmlButton = document.querySelector(".export_to_html"),
        exportToRtButton = document.querySelector(".export_to_rt"),

        mainScreen = document.querySelector("#main");

    let copyElementToDataTransfer = (e) => {
        e.dataTransfer.setData("text/plain", e.target.className);
        e.dataTransfer.dropEffect = "copy";
    }

    button1.addEventListener("dragstart", (e) => {
        copyElementToDataTransfer(e);
    });

    button2.addEventListener("dragstart", (e) => {
        copyElementToDataTransfer(e);
    });

    button3.addEventListener("dragstart", (e) => {
        copyElementToDataTransfer(e);
    });

    textField.addEventListener("dragstart", (e) => {
        copyElementToDataTransfer(e);
    });

    mainScreen.addEventListener("drop", (e) => {
        e.preventDefault();
        // Получить className цели и добавить перемещённый элемент в его DOM
        const data = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.getElementsByClassName(data)[0].cloneNode(true));
        
    });

    mainScreen.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });

    exportToPngButton.addEventListener("click", (e) => { // Экспорт в Png
        e.preventDefault();

        let rows = document.querySelectorAll("row"),
            items = document.querySelectorAll(".newItem");
        
        Array.from(rows).map((item) => {
            item.classList.add("noborder");
        });

        Array.from(items).map((item) => {
            item.classList.add("noborder");
        });

        domtoimage.toBlob(mainScreen)
            .then(function (blob) {
                download(blob, "rt_view.png", "image/png");

                Array.from(rows).map((item) => {
                    item.classList.remove("noborder");
                });
        
                Array.from(items).map((item) => {
                    item.classList.remove("noborder");
                });
            })
            .catch(function (error) {
                console.error('Ошибка сохранения изображения: ', error);
            });

      
    });

    exportToHtmlButton.addEventListener("click", (e) => { // Экспорт в HTML
        let data = mainScreen.innerHTML;
        download(data, "rt_view.html", "text/plain");
    });

    exportToRtButton.addEventListener("click", (e) => { // Экспорт во внутренний формат
        let data = Array.prototype.slice.call(mainScreen.childNodes);
        download(data, "rt_view.json", "text/plain");
    });
}