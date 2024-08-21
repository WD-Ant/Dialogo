const preloader = () => {
    const removeLoader = () => {
      const loader = document.querySelector(".loader");
      const durationBeforeScrollbarAppears = 165;
  
      loader.classList.add("fade");
  
      setTimeout(() => {
        document.body.removeChild(loader);
        document.body.classList.remove("loader-active");
        document.body.style.overflow = "auto";
      }, durationBeforeScrollbarAppears);
    }
  
    window.addEventListener("load", () => {
      document.body.classList.add("loader-active");
  
      removeLoader();
    });
  };
  
  export default preloader;