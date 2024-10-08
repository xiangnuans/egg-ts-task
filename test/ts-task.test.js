'use strict';

const mock = require('egg-mock');

describe('test/ts-task.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/ts-task-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, tsTask')
      .expect(200);
  });
});
