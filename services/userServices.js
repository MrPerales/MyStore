const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        nickname: faker.person.firstName(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.avatar(),
      });
    }
  }
  create(data) {
    const userId = faker.string.uuid();
    const newUser = {
      userId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  find() {
    return this.users;
  }
  findOne(nickname) {
    return this.users.find((item) => item.nickname === nickname);
  }
  update(nickname, changes) {
    const indexUser = this.users.findIndex(
      (item) => item.nickname === nickname,
    );
    if (indexUser === -1) {
      throw new Error('Error user not Found');
    }
    const user = this.users[indexUser];
    this.users[indexUser] = {
      ...user,
      changes,
    };
    return this.users[indexUser];
  }
  delete(nickname) {
    const indexUser = this.users.findIndex(
      (item) => item.nickname === nickname,
    );
    if (indexUser === -1) {
      throw new Error('Error user not found');
    }

    this.users.splice(indexUser, 1);
    return { nickname };
  }
}

module.exports = UsersService;
