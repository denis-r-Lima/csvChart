# About the project

This project takes one csv file with specific text format and makes a Pressure x Time chart. Example of the csv file format can be found on csvSample folder.

## Instalation

Make sure to have Node.Js installed

1. Clone the repo

2. cd into the folder

3. Install the required packages:
   ``` yarn ```

5. This project was initiated with Create React App, in order to work we need to change the react target on the WebPack configuration file:
    - Open the WebPack configuration file:
        ``` ./node_modules/react-scripts/config/webpack.config.js ```
    - After the item ``` perfromace: false, ``` add ``` target: "electron-renderer", ```

## Running 

1. To run the project first we need to transpile the main.ts file to main.js:
    ``` yarn electron:transpile ```

2. Run the React front end:
    ``` yarn react:start ```

3. Run electron:
    ``` yarn electron:start ```

## Building dist 

1. First is necessary to build the react project:
    ``` yarn react:build ```

2. Transpile the electron main.ts file to main.js:
    ``` yarn electron:transpile ```

3. Build electron aplication:
    ``` yarn electron:pack ```

**Note: The build is set to windows single file
