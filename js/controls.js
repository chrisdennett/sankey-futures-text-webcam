const defaultParams = {
  blocksAcross: {
    type: "slider",
    min: 2,
    max: 100,
    step: 1,
    value: window.localStorage.getItem("blocksAcross") || 68,
  },
  blockSize: {
    type: "slider",
    min: 1,
    max: 60,
    step: 1,
    value: window.localStorage.getItem("blockSize") || 22,
  },
  flipX: {
    type: "checkbox",
    value: window.localStorage.getItem("flipX") === "false" ? false : true,
  },
  flipY: {
    type: "checkbox",
    value: window.localStorage.getItem("flipY") === "false" ? false : true,
  },
  useCanvasText: {
    type: "checkbox",
    value:
      window.localStorage.getItem("useCanvasText") === "useCanvasText"
        ? true
        : false,
  },
};
const params = JSON.parse(JSON.stringify(defaultParams));

export function resetAllParams() {
  const keys = Object.keys(params);

  for (let key of keys) {
    params[key].value = defaultParams[key].value;
  }
}

export function initControls(controlsElement) {
  for (let key of Object.keys(params)) {
    const c = params[key];

    let holdingDiv = document.createElement("div");
    holdingDiv.classList = ["control"];

    let labelElement = document.createElement("label");
    labelElement.innerHTML = key + ":";
    labelElement.classList = ["controlLabel"];

    // arr so can extra elements - e.g. for radio butt options
    let inputElements = [];
    let displayCurrentValue = true;
    let valueElement = document.createElement("span");

    if (c.type === "slider") {
      let inputElement = document.createElement("input");
      inputElement.type = "range";
      inputElement.min = c.min;
      inputElement.max = c.max;
      inputElement.step = c.step;
      inputElement.value = c.value;

      inputElement.addEventListener("input", (e) => {
        c.value = e.target.value;
        valueElement.innerHTML = c.value;
        window.localStorage.setItem(key, c.value);
      });
      inputElements.push(inputElement);
      //
    } else if (c.type === "checkbox") {
      let inputElement = document.createElement("input");
      inputElement.type = "checkbox";
      inputElement.checked = c.value;
      inputElement.addEventListener("input", (e) => {
        c.value = e.target.checked;
        valueElement.innerHTML = c.value;
        window.localStorage.setItem(key, c.value);
      });
      inputElements.push(inputElement);
      //
    } else if (c.type === "radio") {
      displayCurrentValue = false;
      for (let i = 0; i < c.options.length; i++) {
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.id = c.options[i];
        inputElement.value = c.options[i];
        inputElement.name = key;
        inputElement.checked = c.value === c.options[i];
        inputElement.setAttribute("data-index", i);
        inputElements.push(inputElement);
        let label = document.createElement("label");
        label.setAttribute("for", c.options[i]);
        label.innerHTML = c.options[i];
        inputElements.push(label);

        inputElement.addEventListener("input", (e) => {
          c.value = e.target.value;
          window.localStorage.setItem(key, c.value);
        });
      }
    }

    if (inputElements.length === 0) {
      return;
    }

    holdingDiv.appendChild(labelElement);
    for (let el of inputElements) {
      holdingDiv.appendChild(el);
    }

    if (displayCurrentValue) {
      valueElement.innerHTML = c.value;
      holdingDiv.appendChild(valueElement);
    }

    controlsElement.appendChild(holdingDiv);
  }

  return params;
}
