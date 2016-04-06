$(document).ready(function() {
  $("#table_id").hide();
  $("form").submit(function(event) {
      event.preventDefault();
      var kaviarData = {
	"frz": $("select[name=frz]").val(),
	"onebased": $("select[name=onebased]").val(),
	"onebased_output": $("select[name=onebased_output]").val(),
	"variant_type": $("select[name=variant_type]").val()
      };
      var minMaf = $("input[name=min_maf]").val();
      if (minMaf) {
	kaviarData["min_maf"] = minMaf;
      }
      var maxMaf = $("input[name=max_maf]").val();
      if (maxMaf) {
	kaviarData["max_maf"] = maxMaf;
      }
      var ctType = "application/x-www-form-urlencoded; charset=UTF-8"; 
      var process = "true";
      var chromCheck = $("input[name=chr]").val();
      var posCheck = $("input[name=pos]").val();
      var listCheck = $("textarea[name=list]").val();
      var fileCheck = $("input[name=uploaded_file]").val();

      if (chromCheck && posCheck) {
	kaviarData["chr"] = chromCheck;
	kaviarData["pos"] = posCheck;
      }
      else if (listCheck) {
	kaviarData["list"] = listCheck;
      }
      else if (fileCheck) {
	kaviarData["uploaded_file"] = fileCheck;
	var fileInput = $("input[name=uploaded_file]");
	var file = fileInput.get(0).files[0];
	kaviarData = new FormData();
	kaviarData.append('uploaded_file',file);
	ctType = false;
	process = false;
      }	

      $("#loading").show();
      $.ajax({
	type: "POST",
	url: "http://localhost/~denise/kaviarTool/cgi-bin/Kaviar",
	data: kaviarData,
	contentType: ctType,
	processData: process,
	cache: false,
	//error: function (xhr) {
	   //alert(JSON.stringify(xhr));
	//},
	//beforeSend: function(jqXHR, settings) {
	//  console.log(settings.url+ '?' + settings.data);
	//},
	success: function(data, textStatus, jqXHR){
	  $("#loading").hide();
	  if (data.sites.length === 0 ) { // if all results were filtered out by MAF filters
	     $("#filtered").show();
	     $("#filtered").append("<p>All results filtered by MAF filters</p>");
	  } else {
	     $("#table_id").show();
	     displayTable(data);
	  } // end if data
	},
	error: function(jqXHR, textStatus, errorThrown){
	  console.log(jqXHR + "  jqXHR in error");
	  console.log(textStatus + "  textStatus in error");
	  console.log(errorThrown + "  errorThrown in error");
	}
      });
  }); //end form submit
});// end document.ready
