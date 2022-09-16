# Chat Platform React

![preview](https://i.imgur.com/DQlHtCB.png)

This is the React project for the open-source Chat Platform I (Anson) am building from the ground up. To watch the full development process from the beginning, please see the up-to-date [playlist on YouTube](https://www.youtube.com/playlist?list=PL_cUvD4qzbkzS16TsnJDLbHuWBkKIbeVr). To see the back-end project, see the [Chat Platform NestJS repository](https://github.com/stuyy/chat-platform-nestjs).

For any additional questions, you can always stop by my [livestream](https://youtube.com/ansonthedeveloper), connect with me on my [Discord Server](https://discord.gg/anson), or follow me [Twitter](https://twitter.com/ansonthedev).

# Installation

Before you try to run this project locally, you must have both the React & NestJS project, as well as a SQL database. I use MySQL, but you can switch to another database like PostgreSQL very easily.

1. Clone this repository and install all dependencies.
2. Go to [Chat Platform NestJS repository](https://github.com/stuyy/chat-platform-nestjs) and follow all the instructions on setting up the backend.
3. Run both projects using the `start:dev` script using either `npm`, `yarn`, or whatever package manager you use.
4. There is no landing page, the main routes are:
   - `/register` route to create an account
   - `/login` to login to the app
   - `/conversations` is where all the magic happens

# License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

Under this license, you may not use this project for:

1. Commercial Purposes
2. Distributing this project after modifying it
3. You may not use this without appropriate attribution