'use strict';

// TableTemplate.js

function TableTemplate() {}

TableTemplate.fillIn = function(tableId, dictionary, columnName) {
    var table = document.getElementById(tableId);
    if (!table) return;

    var headerRow = table.rows[0];

    for (var b = 0; b < headerRow.cells.length; b++) {
        headerRow.cells[b].innerHTML = this.replaceTemplates(headerRow.cells[b].innerHTML, dictionary);
    }
    
    if (columnName) {
        var columnIndex = -1;
        for (var a = 0; a < headerRow.cells.length; a++) {
            if (headerRow.cells[a].textContent === columnName) {
                columnIndex = a;
                break;
            }
        }

        if (columnIndex === -1) return;

        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[columnIndex].innerHTML = this.replaceTemplates(table.rows[i].cells[columnIndex].innerHTML, dictionary);
        }
    }

    
    table.style.visibility = 'visible';
};

TableTemplate.replaceTemplates = function(text, dictionary) {
    return text.replace(/{{\s*(\w+)\s*}}/g, function(match, property) {
        return dictionary.hasOwnProperty(property) ? dictionary[property] : '';
    });
};
