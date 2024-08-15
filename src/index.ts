import { morphVerbList } from './morphing';

// const [, , command, ...rest] = process.argv;
const [, , command] = process.argv;

const handlers = {
  [morphVerbList.name]: morphVerbList,
};

(async () => {
  const handler = handlers[command];
  if (!handler) {
    console.log(`Unknown command '${command}'`);
    return;
  }

  await handler();
})().catch((ex) => {
  console.error('Exception caught', ex);
});
