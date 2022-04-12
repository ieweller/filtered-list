const ctaLink = "#";
ctabanner(ctaLink);

function ctabanner(hyperlink) {
  const banner = document.createElement("div");
  const bannertext = document.createElement("p");
  const link = document.createElement("a");
  const closebtn = document.createElement("div");
  
  bannertext.textContent = "View this challenge on ";
  link.textContent = "Frontend Mentor";
  
  banner.setAttribute("class", "banner");
  bannertext.setAttribute("class", "banner-text");
  link.setAttribute("target", "_blank");
  closebtn.setAttribute("class", "close-btn");
  link.href = hyperlink;
  
  closebtn.addEventListener("click", function() {
    banner.classList.add("hidden");
  });
  
  bannertext.appendChild(link);
  banner.appendChild(bannertext);
  banner.appendChild(closebtn);
  document.body.insertBefore(banner, document.body.firstChild);
}
