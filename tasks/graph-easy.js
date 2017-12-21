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

    var run = function (src, dest, format) {
      var directory = path.dirname(dest);
      grunt.file.mkdir(directory);

      var runDone = function (error, result, code) {
        if (error) {
          grunt.log.error('graph-easy error:');
          grunt.log.writeln(result.stdout);
          grunt.log.writeln(result.stderr);
          grunt.fail.warn('graph-easy error');
        }
        else {
          grunt.verbose.writeln(result);
        }
      }

      var grapheasy_args = (options.grapheasy || []).concat(['--input=' + src, '--output=' + dest, '--as', format]);
      grunt.log.writeln('graph-easy ' + grapheasy_args.join(' '));
      grunt.util.spawn({
        cmd: 'graph-easy',
        args: grapheasy_args
      }, runDone);
    }

    this.files.forEach(function (f) {
      var dest = unixifyPath(f.dest);

      f.src.forEach(function (src) {
        var format = undefined;
        if (typeof (options.format) !== 'undefined') {
          format = options.format;
        }
        else {
          format = path.extname(dest).replace(/^\./, '');
        }
        grunt.log.writeln('Convert ' + src + ' into ' + dest + ' with format ' + format);
        run(unixifyPath(src), dest, format);
      })

      grunt.log.ok('All the graphs were successfully converted with graph-easy');
      done();
    });

  });


  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    }
    else {
      return filepath;
    }
  };
};
