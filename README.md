# login-signup-system

REST API for Login and SignUp.

## Setup and Installation

1. **Clone the repo from GitHub**
   ```sh
   git clone https://github.com/KhajaMoulali/login-signup-system.git
   ```
2. **Install all npm dependencies**
   ```sh
   npm install
   ```
3. **Setup MongoDB**

   There are lots of options available to have a running MongoDB instance:
   - a typical way is to download the community edition from [here](https://www.mongodb.com/download-center/community) and install locally on the machine
   - another option is to spin-up an instance on the cloud. Here are step-by-step instruction for that - [Get Started with Atlas](https://docs.atlas.mongodb.com/getting-started)
   
4. **Update database URL in config.js file**
   
   once you have the DB URL, specify that in config.js file:
   ```js
   module.exports = {
    MONGODB: 'mongodb://localhost:27017/loginsystem',
    ...
   };
   ```
5. **Run npm start the start the application**
   ```sh
   npm start
   ```
   this runs at port 3300 and hence all enpoints can be accessed starting from http://localhost:3300



