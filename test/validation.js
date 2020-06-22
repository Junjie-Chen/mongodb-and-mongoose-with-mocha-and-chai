const { expect } = require('chai');
const User = require('../src/models/User');

describe('Validation', () => {
  it('should require the name of a user', () => {
    const user = new User({ name: undefined });

    const result = user.validateSync();

    const { errors: { name: { message } } } = result;

    expect(message).to.equal('Name is required.');
  });
});
