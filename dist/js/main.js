window.addEventListener("load", function(){

    var tabsClass = 'simple-tabs';

    // Store Tabs Variables
    var tabs = document.querySelectorAll("ul."+tabsClass+" > li"); 

    for(var i=0 ; i < tabs.length; i++){
        tabs[i].addEventListener('click', switchTab);
    }

    function switchTab(event)
    { 
        event.preventDefault();

        document.querySelector("ul." + tabsClass + " li.active").classList.remove("active");
        document.querySelector(".tab-pane.active").classList.remove("active");
 
        var anchor = event.target; 

        event.currentTarget.classList.add("active");
        document.querySelector(anchor.getAttribute('href')).classList.add('active');
        
    }
    
});