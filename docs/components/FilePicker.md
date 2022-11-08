# FilePicker

A react-native component that allows you to use native UI to select a file from the device library.

[**» Watch detailed explanation**](https://www.loom.com/share/7c4f399a732945ca8ac5903f269caf77)

## References:

-   [Library to use](https://www.npmjs.com/package/react-native-document-picker)
-   [Bootstrap](https://getbootstrap.com/docs/5.2/forms/form-control/#file-input)\
    Though we are not going to implement bootstrap, this is the closest reference to a file input field.

## Personas

1. End User
2. Component Consumer

### End User

-   As a user, I want the ability to select files.
-   As a user, I expect to use the native file picker of the platform.
-   As a user, I expect to see the name of the file when I have made a selection.
-   As a user, I expect to see the count of files selected when I have made more than 1 selections.
-   As a user, I want to know that a file is being uploaded. (show spinner)
-   As a user, I expect to distinguish a file upload field from any input field.

### Component Consumer

-   As a component consumer, I expect that the File Picker follows Material You Guidelines for input fields
-   As a component consumer, I want to extend the ability of the input component to select file(s).
-   As a component consumer, I want the ability to allow selection of single or multiple files.
-   As a component consumer, I want the ability to select specific type of files. (image/ pdf/ doc/ xls/ csv or any other)
-   As a component consumer, I want to pick the icon that is displayed for the file type.
-   As a component consumer, I want to pass an onChange function to handle file changes.
-   As a component consumer, I want to be able to show a progress indicator with a controlled loading prop.
-   As a component consumer, I want to update the user in case of upload errors.
-   As a component consumer, I want to be able to make a File picker field as required.
-   As a component consumer, I want to limit the size of the file that can be selected.
-   As a component consumer, I want to limit the number of files that can be selected at once.

## Components Consumed

-   Input
-   IconButton

## Implementation details

-   Maybe create an HOC/ custom hook that exposes a common behaviour to display the file picker.
-   FilePicker field could just implement the HOC/ Hook with an input field.
