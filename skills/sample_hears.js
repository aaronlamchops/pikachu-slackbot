/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');

module.exports = function(controller) {

    /* Collect some very simple runtime stats for use in the uptime/debug command */
    var stats = {
        triggers: 0,
        convos: 0,
    }

    controller.on('heard_trigger', function() {
        stats.triggers++;
    });

    controller.on('conversationStarted', function() {
        stats.convos++;
    });


    controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            if (!err) {
                convo.setVar('uptime', formatUptime(process.uptime()));
                convo.setVar('convos', stats.convos);
                convo.setVar('triggers', stats.triggers);

                convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
                convo.activate();
            }
        });

    });

    controller.hears(['^say (.*)','^say'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, yesOrNo[1])
    });
  
  
  // MY IMPLEMENTATIONS
  
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }  
                      // NO                    // NO                     // YES                       // ROCK YES
    const yesOrNo = ['https://gph.is/1hGfaTl', 'https://gph.is/1sDyjzI', 'https://gph.is/11S8vBb', 'https://gph.is/2bXgHah'];
  
    const feelings = ['https://gph.is/1JcmX5S', 'https://gph.is/NdSyj3', 'https://gph.is/1sFtRAB', 'https://gph.is/28Lcsyf', 'https://gph.is/XJ2aVC', 'https://gph.is/1Z6ImrI', 'https://gph.is/XMGrMA'];
  
  
//     controller.hears(['A-aron'], 'direct_message,direct_mention', function(bot, message) {
//         bot.reply(message, 'He is my Trainer!')
//     });
  
//     controller.hears(['mark'], 'direct_message,direct_mention', function(bot, message) {
//         bot.reply(message, 'Booooooo to him! \nhttps://gph.is/XJ2aVC')
//     });
  
    controller.hears(['laugh'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, 'https://gph.is/XJ2aVC')
    });
  
  //  ^question, .+\? REGEX for a 'question, [text]?'
    controller.hears(['^question, .+\?'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, yesOrNo[getRandomInt(4)])
    });
  
  // ^What do you think of .+\?
    controller.hears(['^What do you think of .+\?'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, feelings[getRandomInt(7)])
    });


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* Utility function to format uptime */
    function formatUptime(uptime) {
        var unit = 'second';
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'minute';
        }
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'hour';
        }
        if (uptime != 1) {
            unit = unit + 's';
        }

        uptime = parseInt(uptime) + ' ' + unit;
        return uptime;
    }

};
