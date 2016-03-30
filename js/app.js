$(document).ready(function() {

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
// $('#table_id').DataTable({
//     ajax: {
$.ajax({
      type: "POST",
      url: "http://localhost/~kristopherskelton/kaviarTool/cgi-bin/Kaviar",
      data: kaviarData,
      // dataType: "json",
      encode: true,
      // dataSrc: "sites",
 //      error: function (xhr) {
 //   alert(JSON.stringify(xhr));
 // },
 beforeSend: function(jqXHR, settings) {
   console.log(settings.url+ '?' + settings.data);
 }
    // },
  //   columns: [
  //      { data: 'chromosome' },
  //      { data: 'position' }
  // ]
})
    .done(function() {
      console.log("done!!");
    })
    .fail(function(jqXHR){
      console.log(jqXHR);
    })
    console.log("flew past the done method...");
  });
});
