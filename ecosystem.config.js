module.exports = {
  apps: [
    {
      name: 'alliakids-landing',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 9001',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 9001
      }
    }
  ]
};
