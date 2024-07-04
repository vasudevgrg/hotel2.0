'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Room', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_no:{
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      vacancy: {
        type: Sequelize.BOOLEAN
      },
      hotel_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'Hotel',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Room');
  }
};