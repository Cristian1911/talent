window.onload = () => {
  loadDoc();
  externalHTML = document.getElementById("externalHTML");
  setTimeout(function(){
    var jobList = index();
    console.log(jobList);
  }, 1500);
}

var externalHTML;

/*This function gets the data from the HTML*/ 
function index(){
  var jobElements = externalHTML.getElementsByClassName("job-search-results-container")[0].children;
  var job = {
    title: "",
    location: "",
    url: ""
  };
  var jobs = [];
  var url = "";
  var res = ""; 

  for(i=0; i<jobElements.length; i++){
    jobs[i] = Object.create(job);
    jobs[i].title = jobElements[i].children[0].children[0].innerHTML;
    jobs[i].location = jobElements[i].children[0].children[1].innerHTML;
    url = jobElements[i].children[1].children[0].href;
    res = url.replace(/cristian1911.github.io/g, "www.iceenterprise.com"); //Replaces the localhost url with the real one
    jobs[i].url = res;
  }

  listJobs(jobs);

  return jobs;
}

/*This function loads the external HTML file. 
Sadly i couldn't load the html from the server because of security issues.*/
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("externalHTML").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "external.html", true);
  xhttp.send();
}


/*This function renders every row of the list*/ 
function listJobs(jobList){
  var tableBody = document.getElementById("tableBody");

  for(i=0; i<jobList.length; i++){
    tableBody.innerHTML += `
      <tr>
        <td class="jobNumber">${i+1}</td>
        <td class="jobTitle">${jobList[i].title}</td>
        <td class="jobLocation">${jobList[i].location}</td>
        <td class="jobURL">
          <a href="${jobList[i].url}" target="blank">
            <button type="button" class="btn btn-primary" >Read more and Apply</button>
          </a>
        </td>
      </tr>
    `
  }
}