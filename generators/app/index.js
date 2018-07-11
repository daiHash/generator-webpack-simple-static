'use strict';
// Require dependencies
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // Configurations will be loaded here.
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the delightful ${chalk.red('webpack-simple static')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        // Defaults to the project's folder name if the input is skipped
        default: this.appname
      }
    ];
    return this.prompt(prompts).then(answer => {
      // To access props later use this.props.someAnswer;
      this.props = answer;
      this.destinationRoot(answer.name);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
  }

  install() {
    this.npmInstall();
  }
};
