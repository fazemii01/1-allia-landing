module.exports = {
  apps: [
    {
      name: 'alliakids-landing',
      script: 'npm',
      args: 'run start',
      shell: true,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
