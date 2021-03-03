# flightSeatch

This repository contains code used to complete the tasks for **flightSeatch**.

## Test & Bugs

The bugs and automation cases can be found [here](https://docs.google.com/spreadsheets/d/1PxeKA9coTusPUx4qdQVSZOhadGbs3LWf7EltrH0-_O0/edit?usp=sharing). 
There are 2 sheets, ***Bugs*** and ***Automation Cases*** with both having a breakdown of each case as per case ID, subject, description, component and priority. 

## Pre-requisites

1. Install [Node.js](https://nodejs.org/)
2. Install Cypress via `npm`:
```sh
$ cd /your/project/path
```
```sh
$ npm install cypress 
```

## Instructions

Follow the steps below for execution: 
1. Download or clone this repo
2. Open command prompt
3. Navigate to repo folder path
4. Execute following commands as per flag: 

| Executions | Commands |
| ------ | ------ |
| Opening Test Runner | ***bash init -r*** |
| Setting test execution on headless chrome | ***bash init -hc*** |
| Search Flight test suite | ***bash init -sf*** |
| Sorting test suite | ***bash init -so*** |
| Only Direct Flights test suite | ***bash init -odf*** |
| Cost of Travel test suite | ***bash init -cot*** |
  

