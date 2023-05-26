

document.addEventListener('DOMContentLoaded',function(){

    // Function to load external HTML files and append their contents
    function appendHTML(file) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("articles").innerHTML += this.responseText;


            var name = "Title";
            var date = "JANUARY 1 1970";
            var category = "News"
            var content = "<article><h3>This is a blogpost.</h3></article>";

            // parse own metadata format

            var response = this.responseText;
            //response = response.replace(/\s+/g, '');
            response = response.match(/\[([^\]]+)\]/); // match between two [] braces
            response = response[1] // 1 is without the [] included
            response = response.split(",");
            for(let rid = 0; rid < response.length; rid++)
            {
                response[rid] = response[rid].split(":");
                for (let nid = 0; nid < response[rid].length; nid++)
                {
                    if (nid == 0)
                        response[rid][nid] = response[rid][nid].replace(/\s+/g, '');
                }
                
                // parse into variables
                switch (response[rid][0])
                {
                    case "name":
                        name = response[rid][1];
                        break;
                    case "date":
                        date = response[rid][1];
                        break;
                    case "category":
                        category = response[rid][1];
                        break;
                }
            }

            content = this.responseText.match(/<article>([\s\S]*?)<\/article>/g);



            // now create the html elements and append
            const articleElement = document.createElement("div");
            const titleElement = document.createElement("h2");
            const dataElement = document.createElement("p");
            const contentElement = document.createElement("div");

            articleElement.appendChild(titleElement);
            articleElement.appendChild(dataElement);
            articleElement.appendChild(contentElement);

            const articles = document.getElementById("articles");
            articles.appendChild(articleElement);

            articleElement.classList.add("article-wrapper");

            contentElement.classList.add("article");
            contentElement.classList.add("hidden");

            titleElement.innerText = name;
            dataElement.innerText = date + " | " + category;
            contentElement.innerHTML = content;
        }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        
    }

    // Array of HTML files to be appended
    var files = [
        "articles/nws_2023_05_25_welcome.html"
    ];

    // Loop through the array and load each file
    for (var i = 0; i < files.length; i++) {
        appendHTML(files[i]);
    }

    
});


/*

This paragraph can detect which section is currently viewed but needs to be modified

document.addEventListener('DOMContentLoaded',function(){

    document.querySelector('#building').addEventListener('scroll',whichSectionsAreInSight);
    
    function whichSectionsAreInSight(){
      var building= document.querySelector('#building');
      var top = building.scrollTop;
      var bottom = top+building.offsetHeight;
      var arr = [];
      
      Array.prototype.forEach.call(
      building.querySelectorAll('#building .sections'),
      
     function(sections){
        if ((sections.offsetTop < top && top <sections.offsetTop+sections.offsetHeight) || (sections.offsetTop < bottom && bottom < sections.offsetTop+sections.offsetHeight)){
          arr.push(sections.id);
        }
       
       }
       
      );
        
      document.querySelector('#status').innerHTML = arr.join(',')
    }
    
      whichSectionsAreInSight();
      
    });*/