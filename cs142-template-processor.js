'use strict';

function Cs142TemplateProcessor() {}

Cs142TemplateProcessor.substitute = function (template, dictionary) {
  return template.replace(/{{\s*(\w+)\s*}}/g, function (match, property) {
    return dictionary.hasOwnProperty(property) ? dictionary[property] : "";
  });
};
