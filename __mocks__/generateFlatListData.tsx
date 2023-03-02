type ManipulateOutputObject<T = any> = (i: number) => T;

export const generateFlatListData = (
    dataLength: number,
    manipulateOutputObj: ManipulateOutputObject = i => ({
        id: i,
        title: `item ${i}`,
    }),
): ReturnType<typeof manipulateOutputObj>[] => {
    // Create an empty array
    const arr: ReturnType<typeof manipulateOutputObj>[] = [];

    // Loop n times
    for (let i = 0; i < dataLength; i++) {
        // Create an object with the unique id, title, and data properties
        const obj = manipulateOutputObj(i);

        // Push the object into the array
        arr.push(obj);
    }

    // Return the array
    return arr;
};
