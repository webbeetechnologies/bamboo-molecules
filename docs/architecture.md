# Architecture
Bamboo Molecules has implemented components for both the popular design frameworks; Material and Cupertino. End users get a native experience on mobile platforms.
On web, the users get an option to switch between the two styles as per their preference.


Molecules developers have built useMaterialComponents and useCupertinoComponents hooks that, you guess it right, export platform specific components.
useMolecules returns platform specific components when building for the mobile platforms; for the web, it allows us to toggle between the two and returns components of either of the platforms.


Components extensively use hooks and HOC components to enable shared functionality between components; these building blocks are also available for use. Example:
1. Left/Right addons for inputs and buttons
2. Adding left and right icons or other elements for a range of interactive components.
3. Popovers