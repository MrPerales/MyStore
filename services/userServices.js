const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        nickname: faker.person.firstName(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.avatar(),
        id: faker.string.uuid(),
      });
    }
  }
  async create(data) {
    const userId = faker.string.uuid();
    const newUser = {
      userId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    });
  }
  async findOne(nickname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users.find((item) => item.nickname === nickname));
      }, 3000);
    });
  }
  async update(nickname, changes) {
    return new Promise((resolve, reject) => {
      const indexUser = this.users.findIndex(
        (item) => item.nickname === nickname,
      );
      if (indexUser === -1) {
        throw new Error('Error user not Found');
      }
      const user = this.users[indexUser];
      this.users[indexUser] = {
        ...user,
        ...changes,
      };
      setTimeout(() => {
        resolve(this.users[indexUser]);
      }, 3000);
    });
  }
  async delete(nickname) {
    return new Promise((resolve, reject) => {
      const indexUser = this.users.findIndex(
        (item) => item.nickname === nickname,
      );
      if (indexUser === -1) {
        throw new Error('Error user not found');
      }

      this.users.splice(indexUser, 1);
      setTimeout(() => {
        resolve({ nickname });
      }, 3000);
    });
  }
}

module.exports = UsersService;
