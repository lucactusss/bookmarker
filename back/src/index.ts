import { configuration } from './configuration';
import { Context } from './infra/logging/Context';
import { emoji } from 'node-emoji';
import HttpServer from './api/httpServer';
import LinkController from './api/controllers/linkController';
import KeywordController from './api/controllers/keywordController';

const PORT = 4003;

const emojiToShow =
  configuration.ENVIRONMENT === 'prod' ? emoji.coffee : emoji.gear;

const rootContext = new Context();

/*
 ** Handle exceptions and rejections
 */
process.on('uncaughtException', (error: Error) => {
  rootContext.logger.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  rootContext.logger.error(error);
  process.exit(1);
});

const httpServer = new HttpServer(
  [new LinkController(), new KeywordController()],
  PORT
);

httpServer.listen(rootContext, emojiToShow);
