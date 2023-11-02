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
  find() {
    return this.users;
  }
  findOne(nickname) {
    return this.users.find((item) => item.nickname === nickname);
  }
  update() {}
  delete() {}
}

module.exports = UsersService;
