/*
 * grunt-of-ocamlbuild
 *
 * Copyright (c) 2017 Nicolas Relange, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerMultiTask('grapheasy', 'Use graph-easy to convert text graphs into images', function () {
    var done = this.async();

    var options = this.options();
    var format = options.format;

    var run = function (graphFile, destination) {
      var src;
      if (grunt.file.isPathAbsolute(graphFile)) {
        src = path.basename(graphFile);
      }
      else {
        src = graphFile
      }
      var imageFile = src.replace(/\.[^.]+$/, '.' + format);
      var imagePath = path.join(destination, imageFile);

      grunt.file.mkdir(destination);

      var runDone = function (error, result, code) {
        if (error) {
          grunt.log.error('graph-easy error:');
          grunt.log.writeln(result.stdout);
          grunt.log.writeln(result.stderr);
          grunt.fail.warn('graph-easy error');
        }
        else {
          grunt.log.ok(imagePath + ' was successfully created');
          grunt.verbose.writeln(result);
          done();
        }
      }

      grunt.verbose.writeln('Image file path is  ' + imagePath);
      grunt.log.writeln('Create ' + imageFile + ' into ' + destination);
      var grapheasy_args = options.grapheasy.concat(['--input=' + graphFile, '--output=' + imagePath, '--as', format]);
      grunt.log.writeln('graph-easy ' + ocamlbuild_args.join(' '));
      grunt.util.spawn({
        cmd: 'graph-easy',
        args: grapheasy_args
      }, runDone);
    }

    this.files.forEach(function (f) {
      var destDirectory = unixifyPath(f.dest);
      var graphFiles = f.src.filter(function (filepath) { return true; })

      graphFiles.forEach(function (source) {
        var graphFile = unixifyPath(source);
        grunt.verbose.writeln('Convert ' + graphFile + ' into ' + destDirectory + ' with format ' + format);
        run(graphFile, destDirectory);
      })
    });

  });


  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
