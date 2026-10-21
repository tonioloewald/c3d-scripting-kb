# OS Class

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/OS.html_

The OS class offers various methods for performing some often used system calls like working with open and save panels for example.
none

## Constructor
none

## Methods

### `void beep ()`
Performs a system beep.

### `Number messageBox (String title, String message)`
Opens a message box with. The function returns 1 if the user clicked on the OK button and 0 otherwise.

### `String runOpenPanel (String filetyp0, String filetyp1, ... )`
Opens a open panel which can load files with file extensions filetyp0, filetyp1, .... The function returns the path of the selected file. If the user clicked the Cancel button this function return null .

### `String runSavePanel (String filetyp)`
Opens a save panel which can save files with file extension filetyp. The function returns the path of the selected file. If the user clicked the Cancel button this function return null .

### `Number system (String command)`
Performs command in the Mac OS X terminal. You can use this function to call external command line applications from within Cheetah3D.
