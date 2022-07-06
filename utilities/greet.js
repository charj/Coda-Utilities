const mariadb = require('../db.js');
const env = require('../env.js');
const embedcreator = require('../embed.js');
// get users from database and put id's in array
async function getUsers() {
	db = await mariadb.getConnection();
	[rows] = await db.query('SELECT user_id FROM notify');
	uservalues = Object.values(await rows);
	db.end();
	return uservalues;
}

async function sendNotify(member) {
	const users = await getUsers();
	for (userId of users) {
		console.log(userId);
		const user = await global.client.users.fetch(userId);
		user.send(
			{
				embeds: [ embedcreator.setembed(
					{
						title: 'Notification',
						description: `${member.user.tag} has joined ${global.client.guilds.cache.get(env.discord.guild).name}`,
						color: '#00ff00',
						image: {
							url: `${member.user.avatarURL({ dynamic: true })}`,
						},
					},
				)],
			},
		);
	}
}
module.exports = { sendNotify, getUsers };