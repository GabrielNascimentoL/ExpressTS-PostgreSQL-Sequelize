import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcrypt";
import Auth from "./Auth";

interface NoteAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes
{
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Auth,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "notes",
  }
);


export default Note;
