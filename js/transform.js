function displayTable(data) {  
  $.each(data.sites, function(index, element){
    if (data.sites[index]["rsids"] === undefined){
       data.sites[index]["rsids"] = ".";
    };
    if (data.sites[index]["comments"] === undefined) {
       data.sites[index]["comments"] = ".";
    }
    var rowSpan = data.sites[index]["varInfo"].length;

    // process the first cell
    var firstRowCellData = data.sites[index]["varInfo"].shift();
    var firstRowCell = createCell(firstRowCellData);
    var firstRow = createRow(element, rowSpan, firstRowCell);
    $("#tableBody").append(firstRow);

    // process the rest of the cells
    $.each(data.sites[index]["varInfo"], function(infoIndex, infoElement){
       var dataForCells = createCell(infoElement);
       row = createRow(element, 0, dataForCells);
       $("#tableBody").append(row);
    })
  });
} // end displayTable

function createRow(element, rowSpan, infoCell, rowClass) {
     var row;
     if (rowSpan) {
       row = "<tr><td rowspan=" + rowSpan + ">" + element["chromosome"] + " " + element["position"] + "</td>";
       row += "<td rowspan=" + rowSpan + ">" + element["rsids"] + "</td>";
     } else {
	if (rowClass) {
	  row = "<tr class=\"" +  rowClass + "\">";
        } else {
          row = "<tr>";
        }
     }
     row += infoCell;
     if (rowSpan) {
       row += "<td rowspan="+ rowSpan + ">" + element["comments"] + "</td>";
     }
     row += "</tr>";
     return row;
};

function createCell(infoElement) {
	var dataForCells = "<td>" + infoElement["variant"] + "(" + infoElement["frequency"] + ")" + "</td><td>" + infoElement["sources"] + "</td>";
	return dataForCells;
}
