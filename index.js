require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const CronJob = require('cron').CronJob;

const names = [
    'viesti',
    'viästi',
    'kyösti',
    'muumit'
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'yk') {
        msg.reply('yk ok');
    }
});

var job = new CronJob('15 6 * * *', function() {
    const startDate = new Date(2020, 6, 6)
    const endDate = new Date(2021, 5, 17)
    const today = new Date()

    const dayDiff = (d1, d2) => {
        return (Math.abs(Math.floor(
        (Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) -
        Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())) / 
        (1000 * 60 * 60 * 24))))
    }

    const untilEnd = dayDiff(today, endDate)
    const name = names[Math.floor(Math.random() * names.length)]
    
    client.channels.fetch(process.env.CHANNEL_ID).then((channel) => {
        if (channel)
            channel.send(`Hyvää huomenta ${name}\nTJ ${untilEnd}`);
    });
}, null, true, 'Europe/Helsinki');
job.start();

client.login(process.env.TOKEN);
