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

// "hello" を含むメッセージをリッスンします
app.message('', async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  if (
    message.subtype !== 'message_deleted' &&
    message.subtype !== 'message_replied' &&
    message.subtype !== 'message_changed'
  ) {
    await say(`Hello, <@${message.text}>`);
  }
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
