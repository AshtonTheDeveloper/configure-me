#! /usr/bin/env node

const inq = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const np = path.join(process.cwd(), 'config.json');
const alreadyConfiguration = fs.existsSync(np);

// Configurations (!)

const opt1 = require('./configurations/opt1');

// Configurations (!)

// Functions (!)

async function newConfigTrue() {
  let config = {};

  const answers = await inq.prompt([
    {
      type: 'list',
      name: 'confType',
      message: 'What type of config should I create?',
      choices: ['discord-bot (config.json)', 'discord-bot (.env)'],
    },
    {
      type: 'password',
      name: 'botToken',
      message: 'Enter your bot token',
      mask: true,
      when: a => a.confType,
    },
    {
      type: 'text',
      name: 'botPrefix',
      message: 'Enter your bot prefix',
      when: a => a.botToken,
    },
  ]);
  config.token = answers.botToken;
  config.prefix = answers.botPrefix;
  switch (answers.confType) {
    case 'discord-bot (config.json)':
      config = opt1(config);
      fs.writeFileSync(np, JSON.stringify(config, null, 2), 'utf8');
      break;
    //case 'discord-bot (.env)':
    //break;
    // ^^^^ TO BE WORKED ON
    default:
      break;
  }
}

function newConfigFalse() {
  console.log(
    chalk.redBright(
      'I will now exit since I am unable to overwrite the current config.json file... (Quiting)',
    ),
  );
}

// Functions (!)

if (alreadyConfiguration) {
  inq
    .prompt([
      {
        type: 'confirm',
        name: 'configAlready',
        message:
          'It looks like you have a config.json or a .env file already, should I override it?',
        default: false,
      },
    ])
    .then(answers => {
      if (answers.configAlready) {
        newConfigTrue();
      } else {
        newConfigFalse();
      }
    });
} else {
  newConfigTrue();
}
