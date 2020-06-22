const { expect } = require('chai');
const User = require('../src/models/User');

describe('Validation', () => {
  it('should require the name of a user', () => {
    const user = new User({ name: undefined });

    const result = user.validateSync();

    const { errors: { name: { message } } } = result;

    expect(message).to.equal('Name is required.');
  });

  it('should validate the name of a user', () => {
    const user = new User({ name: 'Jo' });

    const result = user.validateSync();

    const { errors: { name: { message } } } = result;

    expect(message).to.equal('Name must be longer than 2 characters.');
  });

  it('should prevent a user with an invalid name from being saved', done => {
    const user = new User({ name: 'Jo' });

    user.save()
      .catch(result => {
        const { errors: { name: { message } } } = result;

        expect(message).to.equal('Name must be longer than 2 characters.');

        done();
      });
  });
});
