$( document ).ready(function() {
    getAll();
    
   
});




function getAll(){
    // $.blockUI({ message: '<h4><img src="../assets/img/loading.gif" /></h4>',css: {
    //     backgroundColor: 'transparent',
    //   border: '0'
    //   } }); 
    blockPage();
    var postdata="";
    postBack("admin/getAllAdmin","postdata="+postdata,function(response){
          var json=JSON.parse(response);
          console.log(json);
          var output=json.data;
          console.log(output);
           $("#tableBody").html("");
            for (var i = 0; i < output.length; i++) {

                var tableData = "<tr>";
                tableData +=  "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" +output[i][1]+"</h6>"

                // if (output[i].flag == 1)
                //     tableData += '<span class="label label-flat label-icon text-danger" data-popup="tooltip" data-placement="bottom" title="Deleted" style="float:right; padding-top: 4px;"><i class="icon-trash"></i></span>';
                 tableData +=   "<p class='text-xs text-secondary mb-0'>"+ output[i][2] +"</p></div></div> </td> <td><p class='text-xs font-weight-bold mb-0'>"+output[i].designation +"</p>";
                 tableData += " <p class='text-xs text-secondary mb-0'>"+"Mumbai"+"</p></td>";
                //tableData += "<td class='emailClass' >" + output[i].email + "</td>";
               
                tableData+="<td class='align-middle text-center text-sm'><span class='badge badge-sm bg-gradient-success'>"+"Master Admin"+"</span>";
                tableData+="</td>";
                tableData+="<td class='align-middle'>  <a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Edit user'> Edit</a></td></tr>";

                //tableData += "<td class='locationClass'>" + output[i].location + "</td>";
                
                tableData += "</tr>";
                $("#tableBody").append(tableData);
                $.unblockUI();

                
          }
             applyFilterableList();
             });
 }