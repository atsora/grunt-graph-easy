# grunt-graph-easy

> Use graph-easy to convert text graphs into images


## Getting Started

### Requirements

* Grunt

* graph-easy (on Debian: sudo apt install libgraph-easy-perl)


### Installation

Install this plugin:

```shell
$ npm install grunt-graph-easy --save-dev
```


Include the task in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-graph-easy');
```


## ocamlbuild task

_Run this task with the `grunt graph-easy` command._

### Options

#### format
Type: `String`

Output format: `ascii`, `png`

Default: guess it from destination file suffix


#### grapheasy
Type: `String array`

Additional options to be passed to `graph-easy`.


### Usage Examples

```js
graph-easy: {
  main: {
    files: {
      'dist/images': 'graph/a.txt'
    },
    options:
      format: 'ascii',
      grapheasy: []
  },
},
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.


##License

Copyright (c) 2017 Lemoine Automation Technologies

Licensed under the MIT license.
