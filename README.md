# The Patterns Project

The Patterns Project was designed to help myself to build of Allegorithmic Substance Designer pattern recipes. It is not affiliated with Allegorithmic in any way.

The repository is in a rough state. It was built to be in a presentable state as quickly as possible. I'll refactor it when appropriate.

## The parts

1. Substance Designer file: Currently, a simple SBS file with the patterns.
2. Content generator: A node.js script that parses the SBS file to create a JSON object of data that the website needs. The script also calls sbsrender.exe to create the output images.
3. Website: Very simple, client-side-only website for displaying that info.

All commits to the repository are automatically hosted on an Azure website.

## Building the content

Execute `node patternExporter.js` to create the website content from PatternsProject.sbs and PatternsProject.sbsar (for the images).

## The website

Currently eager loads all data in a single page.

## TODO

Grab info from built-in SBS files to fill in extra details for standard generators.