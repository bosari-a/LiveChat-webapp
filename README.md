# SimpleBoard

- This website is a simple message board website where users share messages on specific boards.
- Users need to login (or signup if they still don't have an account) in order to interact with others.
- Most of the source files are here except of course for the node modules folder and a firebase cache folder.
- The live website is deployed with running `firebase deploy`.
- Deployed website can be found at: [SimpleBoard](https://live-chat-app-9838a.web.app/)
____

## Issues I faced during deployment (summary for self)
- Webpack dev tool is not for production purposes, it maps the bundled code to your js file and makes it easier for debugging. That is why setting the devtool to false and changing the mode to production is very important before deployment.

- It is very difficult to debug any JS errors when the linked scripts are production-ready webpack bundles I've noticed. Any refactoring would mean changing the devtool value and switching to dev mode.

- For some reason the liveserver extension won't read the css files in the dist/ folder properly when webpack is in development mode and will tell you to update your browser even when it is up to date. A work around has been to create a css directory outside of the dist/ folder and linking it to each html file again. But this won't style your pages in production because firebase will only read from the dist/ (usually public) directory.

- It has been fun learning about firebase and using webpack config and I still have a ton more to learn.
