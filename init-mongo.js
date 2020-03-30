db.createUser(
  {
    user: 'admin',
    pwd: 'ZY+YCzCMlMUB9hiUQ1HVYPR0TdALcNLSQQbGGSCV7hA=',
    roles: [
      {
        role: 'readWrite',
        db: 'keplisdev'
      }
    ]
  }
)