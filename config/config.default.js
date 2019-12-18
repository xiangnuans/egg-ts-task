'use strict';

/**
 * egg-ts-task default config
 * @member Config#tsTask
 * @property {String} SOME_KEY - some description
 */
exports.queue = {
  delegate: 'task',
  baseDir: 'task',
  app: true,
  agent: false,
}

exports.bull = {
  default: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
    }
  }

};
