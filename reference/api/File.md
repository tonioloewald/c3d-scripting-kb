# File Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/File.html_

The File objects offers the possibility to read from and save to files.

## Properties
none

## Constructor
File ( String path)
Creates a file reference to a file at path . Creating a file reference doesn't automatically open the file.

## Methods

### `void close ()`
Closes an open file.

### `String[] contentOfDir ()`
If path is an folder this function returns an array of all the files which are in the folder at path .

### `Boolean copyTo ( String toPath)`
Copies the file from path to toPath. Returns true if the operation was successful.

### `String directory ()`
Returns the directory path component of the file at path .

### `Boolean exist ()`
Return true if the the file at path already exists. Otherwise it returns false.

### `String extension ()`
Returns the file extension of the file at path .

### `int getpos ()`
Returns the current seek file pointer position of the open file.

### `Boolean isDir ()`
Returns if path is a directory or a file.

### `Boolean isOpen ()`
Returns if the file has been successfuly opend.

### `String lastPathComponent ();`
Return the last path component of the file/folder at path .

### `Boolean mkDir ()`
Creates a folder at path . If there already exists a file or a folder the old one will be deleted without warning. The function return true of the folder has been created successfully.

### `void open ( Number mode) void open ( Number mode, Number endian)`
Opens the file at path . mode = READ_MODE : File will be opend in read mode. mode = WRITE_MODE : File will be opend in write mode. If there exists no file at path a new file will be created. You only have to pass the endian parameter if you want to read/write a binary file. endian = BIG_ENDIAM : File data will be writen/read in big endian mode. endian = LITTLE_ENDIA : File data will be writen/read in little endian mode.

### `String read ( Number size)`
Reads the next size chars form the open file.

### `Number readFloat ()`
Reads the next binary float from the open file.

### `String readln ()`
Reads the next line from the open file.

### `Number readShort ()`
Reads the next binary unsigned short from the open file.

### `Number readUInt ()`
Reads the next binary unsigned int from the open file.

### `void seek ( Number offset, Number basis)`
Moves the currently file pointer position by offset bytes relative to basis = SEEK_SET : From the beginning of the file basis = SEEK_CUR : From the current file pointer position basis = SEEK_END : From the end of the file.

### `void setpos (Number pos)`
Sets the seek file pointer to pos .

### `Number size ()`
Returns the size in bytes of the file at path .

### `void write ( String string)`
Writes sting to the open file.

### `void writeFloat ( Number val)`
Writes a binary float number to the open file.

### `void writeln ( String string)`
Writes string to the open file and attaches an new line charakter ('\n' ) to the string.

### `void writeInt ( Number val)`
Writes a binary signed int number to the open file.

### `void writeShort ( Number val)`
Writes a binary unsigned short number to the open file.

### `void writeUInt ( Number val)`
Writes a binary unsigned int number to the open file.
