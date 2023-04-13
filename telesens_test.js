// alert('Hello World!');

const saveFile = (data, fileName) => {
    let blob = new Blob([data], { type: "text/plain" });
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", fileName);
    link.click();
}



const initialFunction = () => {

    alert('Будет сгенерирован файл с тестовыми данными. \nМожете сохранить его в любое удобное место на диске.')

    let initialObj = {};

    for (let i = 1; i < 51; i++) {
        let item = {
            [Date.now().toString() + '-' + i]: {
                "id": Math.random().toString().slice(2),
                "message": Math.random().toString()
            }
        };
        // Object.assign(initialObj, item);
        initialObj = { ...initialObj, ...item }
    };

    const initialStr = 'const Feed =  ' + JSON.stringify(initialObj, null, 4);

    saveFile(initialStr, "initial_test_data.txt")
}



initialFunction();

const feedRefactoring = function (obj) {
    let regExp = /^(.+)-(.+)/;
    for (let key of Object.keys(obj)) {
        obj[key].time = parseInt(key.replace(regExp, '$1'), 10);
    }
    return obj
};

const inputFile = document.getElementById("inputFile");
// const previewArea = document.getElementById("preview");
// const previewArea2 = document.getElementById("preview2");



inputFile.onchange = (e) => {
    const file = inputFile.files[0];

    // для предпросмотра картинки
    // const objectURL = window.URL.createObjectURL(file);
    // let img2 = document.createElement("img");
    // img2.src = objectURL;
    // previewArea2.appendChild(img2);


    // для предпросмотра картинки v2
    // let img = document.createElement("img");
    // img.classList.add("obj");
    // img.file = file;
    // previewArea.appendChild(img);
    // let reader = new FileReader();
    // reader.onload = (e) => {
    //         img.src = e.target.result;
    //         console.log('e.target.result-',{result :e.target.result});
    //         console.log('reader.result-',{result :reader.result});
    //     };
    // reader.readAsDataURL(file);

    let reader = new FileReader();
    
    reader.onload = () => {
        // console.log({ result: reader.result });
        let resultStr = reader.result.replace(/[\r\n]+/g, '');
        resultStr = resultStr.slice(resultStr.indexOf('{'));
        // console.log(resultStr);
        // console.log(resultStr.length);
        let objObj = JSON.parse(resultStr);
        console.log({ objObj });

        let objAfterRefactoring = feedRefactoring(objObj);
        console.log(objAfterRefactoring);

        resultStr = 'const Feed =  ' + JSON.stringify(objAfterRefactoring, null, 4);
        saveFile(resultStr, "refactored_data.txt")
    }


    reader.readAsText(file);
}

