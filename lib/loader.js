'use strict';
const path = require('path');
const assert = require('assert');
const requireDir = require('require-dir');

module.exports = app => {
  const { queue: { baseDir }, bull } = app.config;
  const dir = path.join(app.baseDir, 'app', baseDir);
  const queues = requireDir(dir);
  bull = {
    clients: {},
    default: {
      redis: {}
    }
  }
  Object.keys(queues).forEach(e => {
    clients[e] = { name: e }
  });
  bull.default = {
    redis: {
      ...app.config.redis.client
    }
  };
  app.addSingleton('bull', createQueue);

  app.beforeStart(() => {
    loadQueueToApp(app);
  })
}

function createQueue(config, app) {
  // ??
  const { name, redis } = config;
  assert(name, '[egg-ts-task] name is required on config');
  assert(redis && redis.host && redis.port, '[egg-ts-task] host and port of redis are required');

  // ??
  app.Queue = config.Queue || require('bull');
  const queue = new app.Queue(name, config);

  app.beforeStart(() => {
    app.coreLogger.info(`[egg-ts-task] ${name} status is ok, queue ready`)
  })
  return queue;
}

function loadQueueToApp(app) {
  const { delegate = 'task', baseDir = 'task' } = app.config.queue;
  const dir = path.join(app.baseDir, 'app', baseDir);
  app.loader.loadToApp(dir, delegate, {
    inject: app,
    caseStyle: 'lower',
    filter(queue) {
      return typeof queue === 'object' && queue instanceof app.Queue;
    }
  })
}
