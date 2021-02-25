"use strict"
const  tag = /(<([a-zA-Z0-9]+)>)|(<\/([a-zA-Z0-9]+)>)/g 

/**
 * @description Replaces html tags within a text with a user provided text
 * @param {String} content - A string containing (optional) html elements
 * @param {String} replacement - A string that will replace the html elements if found 
 * @param {Regular Expression Object} pattern - A regular expression object that matches html tags
 * @return {String} content
 */

exports.removeTag = (content , replacement , pattern) => content.replace(pattern , replacement)
