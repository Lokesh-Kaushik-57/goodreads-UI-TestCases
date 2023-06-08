Before running test cases make sure following tools should be installed in your device.

STEP-1: 
node and npm: Install latest version of node and npm.

after installing node and npm
check through terminal using command "node -v" whether node is installed or not
and similarly for npm, use command "npm -v"

STEP-2: 
create a folder for the project.

STEP-3:
open this folder in any IDE.

STEP-4: 
clone the project from the github using "git clone" command
after that use "git init" command

STEP-5:
install mocha using "npm install mocha" command

STEP-6:
install selenium-webdriver using "npm install selenium-webdriver" command

STEP-7:
for assertions 
install chai using "npm install chai" command

--For Running Test cases--

set

 "scripts": {"test": "mocha --no-timeouts"},

 and for running
 use "npx mpcha --no-timeouts"   --// no timeouts will ignore the unwanted timeouts of your tests