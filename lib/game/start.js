'use strict';

const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs',
});

const form = blessed.form({
  parent: screen,
  width: '90%',
  left: 'center',
  keys: true,
  vi: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg:'#0f0f0f',
    },
  },
});

const label = blessed.text({
  parent: screen,
  top: 1,
  left: 'center',
  content: '  Welcome to Brain Bugs   ',
  
});

const textBox = blessed.textarea({
  parent: form,
  top: 5,
  height: 5,
  left: 'center',
  name: 'username',
  inputOnFocus: true,
  vi: true,
  
});
textBox.focus();

const submit = blessed.button({
  parent: form,
  top: 20,
  left: 'center',
  name:'submit',
  // mouse: true,
  keys: true,
  shrink: true,
  content: 'submit',
});

submit.on('press', function () {
  form.submit();
  console.log('in the submit');
});

submit.key(['enter'], () => submit.submit());
form.on('submit', function(data) {
  this.destroy();
});

// msg.display('Form submitted', function() {

// });

screen.append(form);
screen.append(label);
screen.append(textBox);
screen.append(submit);
// screen.append(boxBottom);
module.exports = screen;



