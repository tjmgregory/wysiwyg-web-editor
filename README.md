# WYSIWYG Web Editor

Unfinished.

### Lessons learned for next time

1. Would not allow users to nest objects, nor granularly add individual elements.

This added greatly to complexity. Instead, would have built blocks that are whole layouts. Then allow the user to drop these onto a single list of layouts that would be easily drag and droppable. Being so granular means you're forcing the user to know how to master divs and CSS.

2. HTML5 Drag and Drop is a mess

Some libraries exist to make the standard a little easier, but altogether it's a tough standard to use.

  - https://react-dnd.github.io/react-dnd
  - https://github.com/atlassian/react-beautiful-dnd

