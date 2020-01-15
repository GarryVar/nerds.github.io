(() => {
  const _DOC = document;
  let sliderList = _DOC.getElementById("slider"),
      sliderToggle = _DOC.querySelectorAll(".slider__toggle-dot"),
      sliderWitdth = [0, -100, -200,],
      left = 0;
      console.log(left);


      function sliderFunction(a) {
        return () => {
          sliderList.style.left = `${a}%`;
        }
      }

      function sliderFunctionAuto() {
        left = left - 100;
        if(left <= -300) {
          left = 0;
        }

        sliderList.style.left = `${left}%`;
      };
      setInterval(() => {
        sliderFunctionAuto();
      },4000);


      for(let i = 0; i < sliderToggle.length; i++) {
        sliderToggle[i].addEventListener("click", sliderFunction(sliderWitdth[i]));
      }
})();
