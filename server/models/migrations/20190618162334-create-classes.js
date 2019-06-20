'use strict';

/*
  sequelize-cli to manage migrations: 
  full text search funtionality with sequelize
  add TS vector as a column, add text search index using the vector
  update the vector when model changes
  add search logic to app

*/

const vectorName = '_search';

const searchObjects = {
  classes: ['name', 'subject','title'],  
};

// "up" adds column call _search to key, updates _search to TSVector
// creates index on _search and when record updates or inserts adds a trigggger
// to table to update _search

module.exports = {
  up: (queryInterface) => (
    queryInterface.sequelize.transaction((t) =>
      Promise.all(Object.keys(searchObjects).map((table) =>
        queryInterface.sequelize.query(`
          ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;
        `, { transaction: t })
          .then(() =>
            queryInterface.sequelize.query(`
                UPDATE ${table} SET ${vectorName} = to_tsvector('english', ${searchObjects[table].join(" || ' ' || ")});
              `, { transaction: t })
          ).then(() =>
            queryInterface.sequelize.query(`
                CREATE INDEX ${table}_search ON ${table} USING gin(${vectorName});
              `, { transaction: t })
          ).then(() =>
            queryInterface.sequelize.query(`
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.english', ${searchObjects[table].join(', ')});
              `, { transaction: t })
          )
          .error(console.log)
      ))
    )
  ),
  down: (queryInterface) => (
    queryInterface.sequelize.transaction((t) =>
      Promise.all(Object.keys(searchObjects).map((table) =>
        queryInterface.sequelize.query(`
          DROP TRIGGER ${table}_vector_update ON ${table};
        `, { transaction: t })
          .then(() =>
            queryInterface.sequelize.query(`
                DROP INDEX ${table}_search;
              `, { transaction: t })
          ).then(() =>
            queryInterface.sequelize.query(`
                ALTER TABLE ${table} DROP COLUMN ${vectorName};
              `, { transaction: t })
          )
      ))
    )
  ),
};