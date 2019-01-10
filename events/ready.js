const SQLite = require("better-sqlite3");
const sql = new SQLite("./profiles.sqlite");

module.exports = (client) => {
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='profiles';").get();
    if (!table["count(*)"]){
        sql.prepare("CREATE TABLE profiles (id TEXT PRIMARY KEY, user TEXT, points INTEGER, email TEXT, name TEXT, age INTEGER, pronouns TEXT, aliases TEXT, interests TEXT, bio TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_profiles_id ON profiles (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    client.getProfile = sql.prepare("SELECT * FROM profiles WHERE user= ?");
    client.setProfile = sql.prepare("INSERT OR REPLACE INTO profiles (id, user, points, email, name, age, pronouns, aliases, interests, bio) VALUES (@id, @user, @points, @email, @name, @age, @pronouns, @aliases, @interests, @bio);"); 
}