unlayer.registerPropertyEditor({
    name: 'my_color_picker',
    layout: 'bottom',
    Widget: unlayer.createWidget({
      render(value) {
        return `
          <input class="color-value" value=${value} />
          <button class="red">Red</button>
          <button class="green">Green</button>
          <button class="blue">Blue</button>
        `
      },
      mount(node, value, updateValue) {
        var input = node.getElementsByClassName('color-value')[0]
        input.onchange = function(event) {
          updateValue(event.target.value)
        }
  
        var redButton = node.getElementsByClassName('red')[0]
        redButton.onclick = function() {
          updateValue('#f00')
        }
  
        var greenButton = node.getElementsByClassName('green')[0]
        greenButton.onclick = function() {
          updateValue('#0f0')
        }
  
        var blueButton = node.getElementsByClassName('blue')[0]
        blueButton.onclick = function() {
          updateValue('#00f')
        }
      }
    })
  });
  
  unlayer.registerTool({
    type: 'whatever',
    category: 'contents',
    label: 'My Tool',
    icon: 'fa-smile',
    values: {
    },
    options: {
      default: {
        title: null,
      },
      text: {
        title: "Text",
        position: 1,
        options: {
          "color": {
            "label": "Color",
            "defaultValue": "#000",
            "widget": "my_color_picker"
          }
        },
      }
    },
    renderer: {
      Viewer: unlayer.createViewer({
        render(values) {
          return `
            <div style="color: ${values.color};">I am a custom tool.</div>
          `
        }
      }),
      exporters: {
        web: function() {
        },
        email: function() {
        }
      },
    },
  });
  