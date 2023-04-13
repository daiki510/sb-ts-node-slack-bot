import { App, KnownEventFromType } from '@slack/bolt';
import { load } from 'ts-dotenv';

const env = load({
  SLACK_BOT_TOKEN: String,
  SLACK_SIGNING_SECRET: String,
  PORT: Number,
});

// SlackBotの初期化
const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET,
});

// app.event('message', async ({ event, client, logger }) => {
//   try {
//     const result = await client.chat.postMessage({
//       channel: event.channel,
//       text: `Hello world!`,
//     });
//     logger.info(result);
//   } catch (error) {
//     logger.error(error);
//   }
// });

app.message('', async ({ message, say }) => {
  if (!message.subtype) {
    await say(`Hello, <@${message.user}>. You said: ${message.text}`);
  }
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
