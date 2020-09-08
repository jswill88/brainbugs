grabKeys - Whether the focused element grabs all keypresses.
hover - The currently hovered element. Only set if mouse events are bound.
terminal - Set or get terminal name. Set calls screen.setTerminal() internally.
title - Set or get window title.

Events:
mouse - Received on mouse events.
keypress - Received on key events.

Methods:
Inherits all from Node.
log(msg, ...) - Write string to the log file if one was created.
debug(msg, ...) - Same as the log method, but only gets called if the debug option was set.
alloc() - Allocate a new pending screen buffer and a new output screen buffer.
realloc() - Reallocate the screen buffers and clear the screen.
draw(start, end) - Draw the screen based on the contents of the screen buffer.
render() - Render all child elements, writing all data to the screen buffer and drawing the screen.
clearRegion(x1, x2, y1, y2) - Clear any region on the screen.
fillRegion(attr, ch, x1, x2, y1, y2) - Fill any region with a character of a certain attribute.
focusOffset(offset) - Focus element by offset of focusable elements.
focusPrevious() - Focus previous element in the index.
focusNext() - Focus next element in the index.
focusPush(element) - Push element on the focus stack (equivalent to screen.focused = el).
focusPop() - Pop element off the focus stack.
saveFocus() - Save the focused element.
restoreFocus() - Restore the saved focused element.
rewindFocus() - "Rewind" focus to the last visible and attached element.
key(name, listener) - Bind a keypress listener for a specific key.
onceKey(name, listener) - Bind a keypress listener for a specific key once.
unkey(name, listener) - Remove a keypress listener for a specific key.
spawn(file, args, options) - Spawn a process in the foreground, return to blessed app after exit.
exec(file, args, options, callback) - Spawn a process in the foreground, return to blessed app after exit. Executes callback on error or exit.
readEditor([options], callback) - Read data from text editor.
setEffects(el, fel, over, out, effects, temp) - Set effects based on two events and attributes.
insertLine(n, y, top, bottom) - Insert a line into the screen (using csr: this bypasses the output buffer).
deleteLine(n, y, top, bottom) - Delete a line from the screen (using csr: this bypasses the output buffer).
insertBottom(top, bottom) - Insert a line at the bottom of the screen.
insertTop(top, bottom) - Insert a line at the top of the screen.
deleteBottom(top, bottom) - Delete a line at the bottom of the screen.
deleteTop(top, bottom) - Delete a line at the top of the screen.
enableMouse([el]) - Enable mouse events for the screen and optionally an element (automatically called when a form of on('mouse') is bound).
enableKeys([el]) - Enable keypress events for the screen and optionally an element (automatically called when a form of on('keypress') is bound).
enableInput([el]) - Enable key and mouse events. Calls bot enableMouse and enableKeys.
copyToClipboard(text) - Attempt to copy text to clipboard using iTerm2's proprietary sequence. Returns true if successful.
cursorShape(shape, blink) - Attempt to change cursor shape. Will not work in all terminals (see artificial cursors for a solution to this). Returns true if successful.
cursorColor(color) - Attempt to change cursor color. Returns true if successful.
cursorReset() - Attempt to reset cursor. Returns true if successful.
screenshot([xi, xl, yi, yl]) - Take an SGR screenshot of the screen within the region. Returns a string containing only characters and SGR codes. Can be displayed by simply echoing it in a terminal.
destroy() - Destroy the screen object and remove it from the global list. Also remove all global events relevant to the screen object. If all screen objects are destroyed, the node process is essentially reset to its initial state.
setTerminal(term) - Reset the terminal to term. Reloads terminfo.

Options:
fg, bg, bold, underline - Attributes.
style - May contain attributes in the format of:
  {
    fg: 'blue',
    bg: 'black',
    border: {
      fg: 'blue'
    },
    scrollbar: {
      bg: 'blue'
    },
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
border - Border object, see below.
content - Element's text content.
clickable - Element is clickable.
input, keyable - Element is focusable and can receive key input.
focused - Element is focused.
hidden - Whether the element is hidden.
label - A simple text label for the element.
hoverText - A floating text label for the element which appears on mouseover.
align - Text alignment: left, center, or right.
valign - Vertical text alignment: top, middle, or bottom.
shrink - Shrink/flex/grow to content and child elements. Width/height during render.
padding - Amount of padding on the inside of the element. Can be a number or an object containing the properties: left, right, top, and bottom.
width, height - Width/height of the element, can be a number, percentage (0-100%), or keyword (half or shrink). Percentages can also have offsets (50%+1, 50%-1).
left, right, top, bottom - Offsets of the element relative to its parent. Can be a number, percentage (0-100%), or keyword (center). right and bottom do not accept keywords. Percentages can also have offsets (50%+1, 50%-1).
position - Can contain the above options.
scrollable - Whether the element is scrollable or not.
ch - Background character (default is whitespace ).
draggable - Allow the element to be dragged with the mouse.
shadow - Draw a translucent offset shadow behind the element.


Inherits all from Node.
name - Name of the element. Useful for form submission.
border - Border object.
type - Type of border (line or bg). bg by default.
ch - Character to use if bg type, default is space.
bg, fg - Border foreground and background, must be numbers (-1 for default).
bold, underline - Border attributes.
style - Contains attributes (e.g. fg/bg/underline). See above.
position - Raw width, height, and offsets.
content - Raw text content.
hidden - Whether the element is hidden or not.
visible - Whether the element is visible or not.
detached - Whether the element is attached to a screen in its ancestry somewhere.
fg, bg - Foreground and background, must be numbers (-1 for default).
bold, underline - Attributes.
width - Calculated width.
height - Calculated height.
left - Calculated relative left offset.
right - Calculated relative right offset.
top - Calculated relative top offset.
bottom - Calculated relative bottom offset.
aleft - Calculated absolute left offset.
aright - Calculated absolute right offset.
atop - Calculated absolute top offset.
abottom - Calculated absolute bottom offset.
draggable - Whether the element is draggable. Set to true to allow dragging.
