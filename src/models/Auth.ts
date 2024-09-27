import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../database";
import bcrypt from 'bcrypt';
import Note from "./Note";

interface AuthAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthCreationAttributes extends Optional<AuthAttributes, 'id'> {}

class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public static async validatePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: "Minimum 3 and maximum 20 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid e-mail",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 50],
          msg: "Minimum 6 characters",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    hooks: {
      beforeCreate: async (user: Auth) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);




export default Auth;
