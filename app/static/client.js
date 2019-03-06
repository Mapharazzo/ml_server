var el = x => document.getElementById(x);

function showPicker(predClass) { el('file-input-' + predClass).click(); }

function showPicked(input, predClass) {
    el('upload-label-' + predClass).innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked-' + predClass).src = e.target.result;
        el('image-picked-' + predClass).className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze(predClass) {
    var uploadFiles = el('file-input-' + predClass).files;
    if (uploadFiles.length != 1) alert('Please select 1 file to analyze!');

    el('analyze-button-' + predClass).innerHTML = 'Analyzing the image...';
    var xhr = new XMLHttpRequest();
    var loc = window.location
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
    xhr.onerror = function () { alert(xhr.responseText); }
    xhr.onload = function (e) {
        if (this.readyState === 4) {
            var response = JSON.parse(e.target.responseText);
            el('result-label-' + predClass).innerHTML = `Result = ${response['result']}`;
        }
        el('analyze-button-' + predClass).innerHTML = 'Analyze';
    }

    var fileData = new FormData();
    fileData.append('file', uploadFiles[0]);
    fileData.append('predClass', predClass);
    xhr.send(fileData);
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
