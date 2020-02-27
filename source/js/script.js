(() => {
  const _DOC = document, left = 0;

  function sliderPos() {
    const sliderWidth = [0, -100, -200];
    return sliderWidth;
  }

  function slider() {
    const slider = _DOC.getElementById('slider');
    return slider;
  };

  function sliderFunction(list, width) {
    list().style.left = `${width}%`;
  };

  window.addEventListener('click', e => {
    const elementTarget = e.target;

    if (elementTarget.dataset.toggle === 'first') {
        e.preventDefault();
        sliderFunction(slider, sliderPos()[0]);

    } else if (elementTarget.dataset.toggle === 'second') {
        e.preventDefault();
        sliderFunction(slider, sliderPos()[1]);

    } else if (elementTarget.dataset.toggle === 'third') {
        e.preventDefault();
        sliderFunction(slider, sliderPos()[2]);
    }
  });
})();
