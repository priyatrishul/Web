function init() {
    document.getElementById("str_button").addEventListener("click", function() {
        fetch_string_data();
        }); 
        
    document.getElementById("json_button").addEventListener("click", function() {
        fetch_json_data();
        }); 
        
    document.getElementById("clear").addEventListener("click", function() {
        document.getElementById("data").innerHTML = "";
        document.getElementById("raw").innerHTML = "";        
        });                   
}
    
function fetch_string_data() {
    var request = new HttpRequest(
        "http://jadran.sdsu.edu/perl/jadrn000/proj1/ajax_json/fetch_string.cgi", handle_string_data);   
    request.send();
    } 
    
function handle_string_data(response) {  
    var records = new Array();    
    records = response.split("||");
    var answer = "<h3>Data Retrieved as a String</h1><table>";
    for(i=0; i < records.length; i++) {
        var fields = new Array();
        fields = records[i].split("|");
        answer += "<tr>";
        for(j=0; j < fields.length; j++) 
            answer += "<td>" + fields[j] + "</td>";
        answer += "</tr>";
        }
    answer += "</table>";
    document.getElementById("data").innerHTML = answer;
    document.getElementById("raw").innerHTML = "<br />The raw string is: <br /><tt>" + response + "</tt>";     
    } 
    
function fetch_json_data() {
    var request = new HttpRequest(
        "http://jadran.sdsu.edu/perl/jadrn000/proj1/ajax_json/fetch_json.cgi", handle_json_data);   
    request.send();
    }     

function handle_json_data(response) { 
    document.getElementById("raw").innerHTML = "<br />The raw JSON string is: <br /><tt>" + response + "</tt>";     
    var obj_data = eval("("+response+")");    
    var answer = "<h3>Data Retrieved as a JSON Object</h1><table>";
    for(i=0; i < obj_data.length; i++) {
        answer += "<tr>";
        for(j=0; j < obj_data[i].length; j++)
            answer += "<td>"+obj_data[i][j] + "</td>";
        answer += "</tr>";
        }
    answer += "</table>";
    document.getElementById("data").innerHTML = answer;
    document.getElementById("raw").innerHTML = "<br />The raw JSON string is: <br /><tt>" + response + "</tt>";    
    }
