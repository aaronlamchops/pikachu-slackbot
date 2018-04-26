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
        bot.startConversation(message, function(err, convo) {
            convo.ask('Why would you try to make me do that?', function(response, convo) {

                convo.say('Well... im still not going to say what you want me to say');
                convo.say('Even if you are Mark Findlay...');
                convo.say('#NotYourTalkingPikachu #EnoughIsEnough');
                convo.next();

            });
        });
    });
  
  
  // MY IMPLEMENTATIONS
  
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }  
                      // NO                    // NO                     // YES                       // ROCK YES
    const yesOrNo = ['https://gph.is/1hGfaTl', 'https://gph.is/1sDyjzI', 'https://gph.is/11S8vBb', 'https://gph.is/2bXgHah'];
  
    const feelings = ['https://gph.is/1JcmX5S', 'https://gph.is/NdSyj3', 'https://gph.is/1sFtRAB', 'https://gph.is/28Lcsyf', 'https://gph.is/XJ2aVC', 'https://gph.is/1Z6ImrI', 'https://gph.is/XMGrMA'];
  
    const ronSwanson = ['Keep your tears in your eyes where they belong.',
                        'There\'s only one thing I hate more than lying: skim milk. Which is water that is lying about being milk.', 
                        'Dear frozen yogurt, you are the celery of desserts. Be ice cream or be nothing. Zero stars.',
                        'I\'d wish you the best of luck but I believe luck is a concept created by the weak to explain their failures.',
                        'Child labor laws are ruining this country.',
                        'I\'m not interested in caring about people.',
                        'Crying: Acceptable at funerals and the Grand Canyon.',
                        'Clear alcohols are for rich women on diets.',
                        'Just give me all the bacon and eggs you have. Wait…wait. I worry what you just heard was: Give me a lot of bacon and eggs. What I said was: Give me all the bacon and eggs you have. Do you understand\?',
                        'I once worked with a guy for three years and never learned his name. Best friend I ever had. We still never talk sometimes.',
                        'Fishing relaxes me. It’s like yoga, except I still get to kill something.',
                        'Give a man a fish and feed him for a day. Don’t teach a man to fish…and feed yourself. He’s a grown man. And fishing’s not that hard.',
                        'On my deathbed, my final wish is to have my ex-wives rush to my side so I can use my dying breath to tell them both to go to hell one last time.',
                        'When people get too chummy with me I like to call them by the wrong name to let them know I don\'t really care about them.',
                        'There has never been a sadness that can’t been cured by breakfast food.',
                        'It\'s always a good idea to demonstrate to your coworkers that you are capable of withstanding a tremendous amount of pain.',
                        'Normally, if given the choice between doing something and nothing, I’d choose to do nothing. But I will do something if it helps someone else do nothing. I’d work all night, if it meant nothing got done.',
                        'Give 100%. 110% is impossible. Only idiots recommend that.',
                        'Capitalism: God\'s way of determining who is smart and who is poor.',
                        'Birthdays were invented by Hallmark to sell cards.',
                        'Friends: one to three is sufficient.',
                        'I like saying ‘No,’ it lowers their enthusiasm.',
                        'Sting like a bee. Do not float like a butterfly. That\'s ridiculous.'];

    // help message
    controller.hears(['^Help', '^help', '^-help', '^--help'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, '\`@Pikachu\` laugh - ill laugh for you\n' +
                            '\`@Pikachu\` question, <question>? - ill respond with yes or no gifs\n' +
                            '\`@Pikachu\` What do you think of <item/person/thing> - ill respond with my feelings using gif\'s\n' +
                            '\`@Pikachu\` Cant Stop The Music - ill play a nice video for you...\n' + 
                            '\`@Pikachu\` Ron Swanson Advice - ill provide advice directly from Ron Swanson himself\n' + 
                            '\`@Pikachu\` uptime - displays how long i have been up\n');
    });

    controller.hears(['^Aaron', '^aaron'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, 'He is my Trainer!')
    });
  
    controller.hears(['^mark', '^Mark'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, 'Booooooo to him! \nhttps://gph.is/XJ2aVC')
    });
  
    controller.hears(['^laugh', '^Laugh'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, 'https://gph.is/XJ2aVC')
    });
  
  //  ^question, .+\? REGEX for a 'question, [text]?'
    controller.hears(['^question, .+\?', '^Question, .+\?'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, yesOrNo[getRandomInt(4)])
    });
  
  // ^What do you think of .+\?
    controller.hears(['^What do you think of .+\?', '^What do you think about .+\?', '^what do you think of .+\?'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, feelings[getRandomInt(7)])
    });

    //https://www.youtube.com/watch?v=1svA2sGhDEE&
    controller.hears(['^Cant Stop The Music', '^Cant Stop the Music', '^Cant stop the music', '^cant stop the music', '^Can\'t Stop the Music'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, 'https://www.youtube.com/watch?v=1svA2sGhDEE&')
    });

    // swanson jokes
    controller.hears(['Ron Swanson Advice', 'ron swanson advice', 'Ron Swanson advice', 'Ron swanson advice'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, ronSwanson[getRandomInt(23)])
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
