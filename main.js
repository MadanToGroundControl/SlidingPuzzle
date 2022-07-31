var tentativas = 0;
var tbl, rows, cols;

function Move(d) {
    //Get the td
    var cell = pegarCelula(d);
    var row = pegarLinha(cell);
    var ri = row.rowIndex;
    var ci = cell.cellIndex;
    var vazio;

    if (ri > 0 && vazio == null) {
        if (celulaVazia(tbl.rows[ri - 1].cells[ci])) { vazio = tbl.rows[ri - 1].cells[ci]; }
    }
    if (ri < tbl.rows.length - 1 && vazio == null) {
        if (celulaVazia(tbl.rows[ri + 1].cells[ci])) { vazio = tbl.rows[ri + 1].cells[ci]; }
    }
    if (ci > 0 && vazio == null) {
        if (celulaVazia(tbl.rows[ri].cells[ci - 1])) { vazio = tbl.rows[ri].cells[ci - 1]; }
    }
    if (ci < row.cells.length - 1 && vazio == null) {
        if (celulaVazia(tbl.rows[ri].cells[ci + 1])) { vazio = tbl.rows[ri].cells[ci + 1]; }
    }

    if (vazio == null) {
        d.style.backgroundColor = "#FF3300";
        d.style.color = "#FFFFFF";
        setTimeout("RemoveHighlight('" + d.id + "');", 500);
    }
    else {
        mudarHerança(d, vazio);
        tentativas++;
        document.getElementById("tentativas").innerHTML = tentativas;
        IsInOrder();
    }
}

function IsInOrder() {
    var arrDiv = document.getElementsByTagName("DIV");
    var inorder = true;
    for (var i = 0; i < arrDiv.length - 1; i++) {
        var n = parseInt(trim(arrDiv[i].innerHTML));
        var n1 = parseInt(trim(arrDiv[i + 1].innerHTML));
        if (n + 1 != n1) {
            inorder = false;
            break;
        }
    }
    if (inorder && celulaVazia(tbl.rows[tbl.rows.length - 1].cells[cols - 1])) {
        for (var i = 0; i < arrDiv.length; i++) {
            arrDiv[i].style.backgroundColor = "#FFFFCC";
        }
        // let mensagem = document.getElementById('mensagem');
        // mensagem.innerHTML = "Muito bem! Você resolveu em " + tentativas + " tentativas.";
        alert("Muito bem! Você resolveu em " + tentativas + " tentativas.");
    }
}

function Reset() {
    tentativas = 0;
    document.getElementById("tentativas").innerHTML = tentativas;

    rows = document.getElementById("cols").value;
    if (isNaN(rows) || rows < 0) { rows = 4; }
    else { rows = Math.round(document.getElementById("cols").value); }
    document.getElementById("cols").value = rows;

    cols = document.getElementById("cols").value;
    if (isNaN(cols) || cols < 0) { cols = 4; }
    else { cols = Math.round(document.getElementById("cols").value); }
    document.getElementById("cols").value = cols;

    tbl = document.getElementById("tbl");
    while (tbl.rows.length > 0) {
        tbl.deleteRow(0);
    }
    var n = (rows * cols) - 1;
    var arrN = new Array();
    for (var i = 1; i <= n; i++) {
        arrN.push(i);
    }
    var inversions = 1;

    while (inversions % 2 == 1) {
        arrN = Shuffle(arrN);

        inversions = 0;
        for (var i = 0; i < arrN.length; i++) {
            for (var j = i; j < arrN.length; j++) {
                if (arrN[i] > arrN[j])
                    inversions++;
            }
        }
    }

    n = 0;
    for (var i = 0; i < rows; i++) {
        tbl.insertRow(i);
        var tr = tbl.rows[i];
        for (var j = 0; j < cols; j++) {
            tr.insertCell(j);
            var td = tr.cells[j];
            td.className = "cell";
            if (i == rows - 1 && j == cols - 1)
                td.innerHTML = "";
            else
                td.innerHTML = "<div id='n" + arrN[n] + "' class='num' onclick='Move(this)'>" + arrN[n] + "</div>";

            n++;
        }
    }
}

function Shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function celulaVazia(cell) {
    for (var i = 0; i < cell.childNodes.length; i++) {
        if (cell.childNodes[i].className == "num") {
            return false;
        }
    }
    return true;
}

function RemoveHighlight(did) {
    var d = document.getElementById(did);
    d.style.backgroundColor = "#CCFFFF";
    d.style.color = "#0099FF";
}

function GetTable(a) {
    var c = a.parentNode;
    while (c.tagName != 'TABLE') {
        c = c.parentNode;
    }
    return c;
}

function pegarLinha(a) {
    var c = a.parentNode;
    while (c.tagName != 'TR') {
        c = c.parentNode;
    }
    return c;
}

function pegarCelula(a) {
    var c = a.parentNode;
    while (c.tagName != 'TD') {
        c = c.parentNode;
    }
    return c;
}

function pegarLinhaIndex(a) {
    var c = a.parentNode;
    while (c.tagName != 'TR') {
        c = c.parentNode;
    }
    return c.rowIndex;
}

function pegarCelulaIndex(a) {
    var c = a.parentNode;
    while (c.tagName != 'TD') {
        c = c.parentNode;
    }
    return c.cellIndex;
}

function AddRow(tbl, i, NumCells) {
    var r = tbl.insertRow(i);
    for (j = 0; j < NumCells; j++) {
        var c = r.insertCell(j);
        c.className = "col" + (j + 1);
        c.innerHTML = "";
    }
}

function trim(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

function mudarHerança(sourceElement, targetElement) {
    var sourceElementParent = sourceElement.parentNode;
    sourceElementParent.removeChild(sourceElement);
    targetElement.appendChild(sourceElement);
}