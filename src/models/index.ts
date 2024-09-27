
import Auth from './Auth';
import Note from './Note';

Auth.hasMany(Note, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

Note.belongsTo(Auth, {
  foreignKey: 'userId',
  targetKey: 'id',
});

export { Auth, Note };
