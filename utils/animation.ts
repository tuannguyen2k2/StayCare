const POSITION_VISIBLE = 80;

export const RevealElement = (className: string, activeClassName: string) => {
  var reveals = document.querySelectorAll(`.${className}`);

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = POSITION_VISIBLE;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add(activeClassName);
    } else {
      reveals[i].classList.remove(activeClassName);
    }
  }
};

export const ScrollRevealElement = (className: string, activeClassName: string, isLoadFirstTime: boolean = false) => {
  if (isLoadFirstTime) {
    RevealElement(className, activeClassName);
  } else {
    window.addEventListener("scroll", () => {
      RevealElement(className, activeClassName);
    });
  }
};