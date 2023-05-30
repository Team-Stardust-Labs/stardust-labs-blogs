
let dark_primary;
let dark_secondary;
let dark_tertiary;
let dark_contrast;
let dark_contrast_second;
let allActiveArticles = [];


document.addEventListener('DOMContentLoaded',function() {

    

    // themes
    let light_mode = document.querySelector('#light-mode');
    let dark_mode = document.querySelector('#dark-mode');
    let terminal_mode = document.querySelector('#terminal-mode');

    let r = document.querySelector(":root");
    let rs = getComputedStyle(r);
    
    dark_primary = rs.getPropertyValue('--primary')
    dark_secondary = rs.getPropertyValue('--secondary')
    dark_tertiary = rs.getPropertyValue('--tertiary')
    dark_contrast = rs.getPropertyValue('--contrast')
    dark_contrast_second = rs.getPropertyValue('--contrast-second')

    setDarkMode(); // default to dark mode

    document.addEventListener('click', function( event ){
        if( light_mode.contains( event.target ) ){
           setLightMode();
        }
        if( dark_mode.contains( event.target ) ){
            setDarkMode();
        }
        if( terminal_mode.contains( event.target ) ){
            setTerminalMode();
        }
    });

    function setLightMode() {
        let r = document.querySelector(":root");
        r.style.setProperty('--primary', '#111');
        r.style.setProperty('--secondary', '#333');
        r.style.setProperty('--tertiary', '#555');
        r.style.setProperty('--contrast', '#eee');
        r.style.setProperty('--contrast-second', '#ccc');
        document.querySelector("#team-logo").classList.remove('invert');
        document.querySelector("html").classList.remove('crt');
    }

    function setDarkMode()
    {
        let r = document.querySelector(":root");
        r.style.setProperty('--primary', dark_primary);
        r.style.setProperty('--secondary', dark_secondary);
        r.style.setProperty('--tertiary', dark_tertiary);
        r.style.setProperty('--contrast', dark_contrast);
        r.style.setProperty('--contrast-second', dark_contrast_second);
        document.querySelector("#team-logo").classList.add('invert');
        document.querySelector("html").classList.remove('crt');
    }

    function setTerminalMode()
    {
        let r = document.querySelector(":root");
        r.style.setProperty('--primary', 'lime');
        r.style.setProperty('--secondary', 'lime');
        r.style.setProperty('--tertiary', 'lime');
        r.style.setProperty('--contrast', 'black');
        r.style.setProperty('--contrast-second', 'black');
        document.querySelector("#team-logo").classList.add('invert');
        document.querySelector("html").classList.add('crt');
    }

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

            titleElement.id = "article-title";

            articleElement.appendChild(titleElement);
            articleElement.appendChild(dataElement);
            articleElement.appendChild(contentElement);

            const articles = document.getElementById("articles");
            articles.appendChild(articleElement);

            articleElement.classList.add("article-wrapper");
            
            contentElement.classList.add("article");
            contentElement.classList.add("hidden");

            dataElement.classList.add("information");

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
        "articles/nws_2023_05_30_welcome2.html",
        "articles/nws_2023_05_25_welcome.html",
    ];

    // Loop through the array and load each file
    for (var i = 0; i < files.length; i++) {
        appendHTML(files[i]);
    }

    const wrapper = getWrapper('.article-wrapper');




    
});


async function getWrapper(selector, timeout = 15000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
    const el = document.querySelectorAll(selector);
    if (el) {
        if (el.length > 0)
        {
            el.forEach(i => {
                var articleTitle = i.querySelector('#article-title')
                articleTitle.addEventListener('click', toggleArticle);
                articleTitle.articleContent =  i.querySelector('.article');
                articleTitle.wrapper = i;
            });
            return null; ///// IT DOSENT WORK WITH THIS RETURN
            /*el.forEach(i => i.addEventListener(
                "click",
                e => {
                    alert(e.currentTarget.dataset.myDataContent);
                }));*/

        }

        
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return null;
}

function toggleArticle()
{

    // call this if this to toggle clicking on same article to close
    if(allActiveArticles.length == 1)
        if(allActiveArticles[0] == this) {
            this.wrapper.classList.remove('active');
            this.articleContent.classList.add('hidden');
            allActiveArticles.splice(0, 1);
            return;
        }


    // article open/close logic when clicking on others
    for(var i = 0; i < allActiveArticles.length; i++)
    {
        if (allActiveArticles[i] == this)
            return;
        allActiveArticles[i].wrapper.classList.remove('active');
        allActiveArticles[i].articleContent.classList.add('hidden');
        allActiveArticles.splice(i, 1);
    }

    this.wrapper.classList.add('active');
    this.articleContent.classList.remove('hidden');
    allActiveArticles.push(this);

}



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

