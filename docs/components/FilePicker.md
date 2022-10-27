# FilePicker

A react-native component that allows you to use native UI to select a file from the device library.

[**» Watch detailed explanation**](https://www.loom.com/share/7c4f399a732945ca8ac5903f269caf77)

## References:

-   https://www.npmjs.com/package/react-native-document-picker

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

-   As a component consumer, I expect that the file upload field follows Material You Guidelines for input fields
-   As a component consumer, I want to extend the ability of the input component to select file(s).
-   As a component consumer, I want the ability to allow selection of single or multiple files.
-   As a component consumer, I want the ability to select specific type of files. (image/ pdf/ doc/ xls/ csv or any other)
-   As a component consumer, I want to pick the icon that is displayed for the file type.
-   As a component consumer, I want to upload the files and notify the user of the same.
-   As a component consumer, I want to update the user in case of upload errors.
-   As a component consumer, I want to be able to make a File picker field as required.
-   As a component consumer, I want to be limit the size of the file that can be selected.

## Components Consumed

-   Input
-   IconButton

## Implementation details

-   Maybe create an HOC that accepts a component that can serve as a trigger to display the file picker.
-   FilePicker field could just implement the HOC with an input field.
