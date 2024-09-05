
		var flag=0
     //MOBILE-VIEW MENU BAR JS COSE
	   var a=document.querySelector("#menu")
       a.addEventListener("click",function () {
       if (flag == 0){
		document.getElementById("menu-List").style.display="block"
		document.getElementById("menu-icon").src="check-box.png"
	    flag=1
	   }else{
		document.getElementById("menu-List").style.display="none"
		document.getElementById("menu-icon").src="menuicon.png"
	    flag=0
	  }
      })
    //WEB-VIEW DROP-DOWN JS CODE
       var b=document.querySelector("#dropdwn")
       b.addEventListener("click",function () {
       if (flag == 0){
		document.getElementById("dropdwnlist").style.display="block"
	    flag=1
	   }else{
		document.getElementById("dropdwnlist").style.display="none"
	    flag=0
	  }
      })
       //DARK MODE js CODE
       var c=document.querySelector("#DarkMode")
       c.addEventListener("click",function () {
       if (flag == 0){
       	document.getElementById("main").style.backgroundColor="#0B0B0B";
       	document.getElementById("form").style.backgroundColor="#0B0B0B";
        document.getElementById("Darkmode").src="sun-regular-24.png"
        document.getElementById("main").style.color="white";
        document.body.style.backgroundColor="black";
		flag=1
	   }else{
		document.getElementById("main").style.backgroundColor="#DCF8F0";
		document.getElementById("form").style.backgroundColor="#DCF8F0";
		document.getElementById("Darkmode").src="sun-solid-24.png"
		document.getElementById("main").style.color="black";
		document.getElementById("main").style.color="black";
		
	    flag=0
	  }
      })
     //MOBILE-VIEW DROP-DOWN JS CODE
       var d=document.querySelector("#dropdwnmenu")
       d.addEventListener("click",function () {
       if (flag == 0){
		document.getElementById("dropdwnmenulist").style.display="block"
	    flag=1
	   }else{
		document.getElementById("dropdwnmenulist").style.display="none"
	    flag=0
	  }
      })

    //slide-show
       let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
       
	
    
      
       
       