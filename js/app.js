$(document).ready(function() {
$("#table_id").hide();
  $("form").submit(function(event) {
      event.preventDefault();
      var kaviarData = {
        "frz": $("select[name=frz]").val(),
        "onebased": $("select[name=onebased]").val(),
        "onebased_output": $("select[name=onebased_output]").val(),
        "chr": $("input[name=chr]").val(),
        "pos": $("input[name=pos]").val(),
        "min_maf": $("input[name=min_maf]").val(),
        "max_maf": $("input[name=max_maf]").val(),
        "variant_type": $("select[name=variant_type]").val()
      };
console.log(kaviarData);
$.ajax({
      type: "POST",
      url: "http://localhost/~kristopherskelton/kaviarTool/cgi-bin/Kaviar",
      data: kaviarData,
      // dataType: "json",
      encode: true,
 //      error: function (xhr) {
 //   alert(JSON.stringify(xhr));
 // },
 beforeSend: function(jqXHR, settings) {
   console.log(settings.url+ '?' + settings.data);
 },
 success: $("#table_id").show(),
 success: function(data, textStatus, jqXHR){
  //  console.log("woot - I'm in success!");
  //  console.log(data);
  //  console.log(data.sites[0]["chromosome"]);
   $.each(data.sites, function(index, element){
     var rsid = data.sites[index]["rsids"];
     if (rsid === undefined){
       data.sites[index]["rsids"] = ".";
       rsid = data.sites[index]["rsids"];
     } else {
       rsid = element["rsids"][0];
     };
    //  console.log(rsid + " = rsid");
    //  console.log(element);
    //  console.log("data.sites", data.sites);
    //  console.log("element['varInfo']", element["varInfo"]);
     var infoCell = [];
     $.each(data.sites[index]["varInfo"], function(infoIndex, infoElement){
       var dataForCells = "<td>" + infoElement["variant"] + "(" + infoElement["frequency"] + ")" + "</td><td>" + infoElement["sources"] + "</td></tr>";
       console.log(data.sites);
       if (infoIndex > 0){
         console.log("I'm in the if! The next TR should have a class.");
         infoCell.push("<tr>" + dataForCells);
       } else {
       infoCell.push(dataForCells);
       console.log("infoIndex: ", infoIndex);
       console.log("infoElement", infoElement["variant"]);
       console.log("infoCell", infoCell);
     }
     })
     console.log(infoCell);
     var rowSpan = infoCell.length;
     var row = "<tr><td rowspan=" + rowSpan + ">" +
     element["chromosome"] +
     " " +
     element["position"] +
     "</td><td rowspan=" + rowSpan + ">" +
     rsid +
     "</td>" +
     infoCell;
     $("#tableBody").append(row);
   });
 },
 error: function(jqXHR, textStatus, errorThrown){
console.log(jqXHR + "  jqXHR in error");
console.log(textStatus + "  textStatus in error");
console.log(errorThrown + "  errorThrown in error");
 }
});
  //   .done(function(xhr) {
  //     console.log("done!!");
  //     console.log(xhr + "  xhr in done method");
  //   })
  //   .fail(function(jqXHR){
  //     console.log(jqXHR + " the failzor");
  //   })
  //   console.log("flew past the done method...");
  // });
});
});
