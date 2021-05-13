# About the project

This project takes one csv file with specific text format and makes a Pressure x Time chart. Example of the csv file format can be found on csvSample folder.

## Installation

Make sure to have Node.Js installed

1. Clone the repo

2. cd into the folder

3. Install the required packages:
   ``` yarn ```

## Running 

1. To run the project first we need to transpile the main.ts file to main.js:
    ``` yarn electron:transpile ```

2. Run the React front end:
    ``` yarn react:start ```

3. Run electron:
    ``` yarn electron:start ```

## Building dist 

1.To build the distribution file:
    ``` yarn electron:pack ```

**Note: The build is set to windows single file
