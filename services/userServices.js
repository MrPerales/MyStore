const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class UsersService {
  constructor() {
    // this.users = [];
    // this.generate();
  }
  ///////////////////////////////////////////////////////////
  /////////////METODOS CON ORM DataBse///////////////////////
  //////////////////////////////////////////////////////////
  async create(data) {
    // create extiende de MODEL en la clase USER
    const user = await sequelize.models.User.create(data);
    console.log(user);
    return user;
  }
  async findOne(id) {
    // find by primary key extiende de MODEL en la clase USER
    const user = await sequelize.models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not Found');
    }
    return user;
  }
  async findWithDB() {
    const response = await sequelize.models.User.findAll({
      include: ['customer'],
    });
    return response;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  ///////////////////////////////////////////////////////////
  ///////////////////METODOS SIMPLES ///////////////////////
  //////////////////////////////////////////////////////////
  //
  // async generate() {
  //   const limit = 5;
  //   for (let i = 0; i < limit; i++) {
  //     this.users.push({
  //       nickname: faker.person.firstName(),
  //       name: faker.person.firstName(),
  //       lastName: faker.person.lastName(),
  //       image: faker.image.avatar(),
  //       id: faker.string.uuid(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }
  // async create(data) {
  //   const userId = faker.string.uuid();
  //   const newUser = {
  //     userId,
  //     ...data,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }
  // async find() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.users);
  //     }, 3000);
  //   });
  // }

  // async findOne(nickname) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const user = this.users.find((item) => item.nickname === nickname);
  //       if (!user) {
  //         reject(boom.notFound('user not found'));
  //       } else if (user.isBlock) {
  //         reject(boom.conflict('user is block'));
  //       } else {
  //         resolve(user);
  //       }
  //     }, 3000);
  //   });
  // }
  // async update(nickname, changes) {
  //   return new Promise((resolve, reject) => {
  //     const indexUser = this.users.findIndex(
  //       (item) => item.nickname === nickname,
  //     );
  //     if (indexUser === -1) {
  //       reject(boom.notFound('user not found '));
  //     }
  //     const user = this.users[indexUser];
  //     // update product
  //     this.users[indexUser] = {
  //       ...user,
  //       ...changes,
  //     };
  //     setTimeout(() => {
  //       resolve(this.users[indexUser]);
  //     }, 3000);
  //   });
  // }
  // async delete(nickname) {
  //   return new Promise((resolve, reject) => {
  //     const indexUser = this.users.findIndex(
  //       (item) => item.nickname === nickname,
  //     );
  //     if (indexUser === -1) {
  //       reject(boom.notFound('user not found '));
  //     }

  //     this.users.splice(indexUser, 1);
  //     setTimeout(() => {
  //       resolve({ nickname });
  //     }, 3000);
  //   });
  // }
  //
}

module.exports = UsersService;
