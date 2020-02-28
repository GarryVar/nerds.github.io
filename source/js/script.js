(() => {
  const _DOC = document;

  function sliderPos() {
    return [0, -100, -200];
  }

  function slider() {
    return _DOC.getElementById('slider');
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
