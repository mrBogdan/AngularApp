function conf () {
  let configs = {
    PORT: 8000,
    DB_PORT: 9042,
    BASE_PROTOCOL: "http",
    BASE_HOST: "127.0.0.1",
    DB_KEYSPACE: "FileKeyspace",
    DB_HOST: "127.0.0.1"
  };

  return {
    PORT: configs.PORT,
    DB_PORT: configs.DB_PORT,
    DB_HOST: configs.DB_HOST,
    DB_KEYSPACE: configs.DB_KEYSPACE,
    UPLOAD_FOLDER: `${__dirname}\\uploads\\`,
    ALLOW_EXTS: ['.zip', '.rar', '.exe', '.jpg', '.mp3', '.mp4']
  };
}

const c = new conf();

module.exports = c;