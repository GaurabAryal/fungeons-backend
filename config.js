var Config = {

  "domain":     process.env.OPENSHIFT_APP_DNS || '127.0.0.1',

  "serverip":   process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  "serverport": process.env.OPENSHIFT_NODEJS_PORT || '8080',

  "mongodb" : process.env.MONGOLAB_URI || 'mongodb://admin:G7cqe6iEKLnP@ds035004.mongolab.com:35004/fungeons',

  /** Redis config, no need to run it local **/
  "redis_host" : process.env.OPENSHIFT_REDIS_DB_HOST || null
  "redis_port" : process.env.OPENSHIFT_REDIS_DB_PORT || null
  "redis_password" : process.env.OPENSHIFT_REDIS_DB_PASSWORD || null

  /** JWT Secre **/
  "secret" : process.env.OPENSHIFT_SECRET_TOKEN || 'IGotDis',

  "clientport": (process.env.OPENSHIFT_NODEJS_PORT) ? '8000':'8080',
  "protocol":   'ws://',

  "heartbeattmo": 1000, // milliseconds

  "wsclientopts": { reconnection: true,
                    reconnectionDelay: 2000,
                    reconnectionAttempts: 100,
                    secure: false
                  }
};

module.exports = Config;
