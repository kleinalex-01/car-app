# Project introduction (2025.07.03.)

  This is a React PWA, where you can list and view data on various cars. The main purpose is to practice UI/UX.

# Log 1 (2025.07.08)

  After a bunch of failed wireframes, I have decided to go with a minimalistic darkblue UI. File structure and hierarchy is done, routing is set for a nice SPA and the NavBar component is almost done. I have faced a lot of issues regarding the input/search field. The first idea was to have state that manages whether the inputfield or the scrambledtext gets shown. I just could not figure out the css to align them properly, so I have decided to move on and try other ideas, such as having the scrambledText as the input field placeholder, however it failed miserably too. Last idea was to make the animation once on mount as the placeholder of the inputfield with an absolute positioning.