const env = require('./env.js');
const merge = require('lodash.merge');
var setembed = function(opts){
	var embed = {
		// Discord Embed Template Coda
		color: 0x00ff00,
		title: '',
		description: '',
		url: '',
		timestamp: `${new Date()}`,
		footer: {
			text: 'discord.gg/coda',
			icon_url: `${global.client.guilds.cache.get(env.discord.guild).iconURL({ dynamic: true })}`,
		},
	};
	return merge (embed, opts);
};
var sendError = function(message){
	try {
		const embed = setembed({
			title: 'Error',
			description: `${message}`,
			color: '#e74c3c',
		});
		global.client.channels.cache.get(env.discord.logs_channel).send({ embeds: [embed] });
	}
	catch (err) {
		console.log(err);
	}
};
var log = function(message){
	const embed = setembed({
		title: 'Log',
		description: `${message}`,
		color: '#2ecc71',
	});
	global.client.channels.cache.get(env.discord.logs_channel).send({ embeds: [embed] });
};
module.exports = { setembed, sendError, log };