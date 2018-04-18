export default function fakeBackEnd() {
  const users = [{
    id: 1, username: 'test1', password: 'test1', firstName: 'Nick', lastName: 'Xiao',
  }];
  const originalFetch = window.fetch;

  // patch the original fetch function to mock a backend
  window.fetch = (url, opts) => new Promise((resolve, reject) => {

    // wrapped in a timeout function to smulate server api call
    setTimeout(() => {
      // login
      if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
        const params = JSON.parse(opts.body);

        // find the user
        const filteredUsers = users.filter((user) => {
          // due to the airbnb arrow function standard
          const result = user.username === params.username && user.password === params.password;
          return result;
        });

        if (filteredUsers.length) {
          const user = filteredUsers[0];
          const responseJson = { ...user, token: 'fake-jwt-token' };
          resolve({ statusCode: 200, json: () => responseJson });
        } else {
          // user not found, return error
          reject(new Error('Username or Password is incorrect'));
        }

        return null;
      }

      // an administrator can get all users informaction
      if (url.endsWith('/users') && opts.method === 'GET') {
        // check for the auth token
        if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
          resolve({ statusCode: 200, json: () => users });
        } else {
          // return 401 unauthorized if token is incorrect
          reject(new Error('Unauthorized'));
        }
        return null;
      }

      // pass unhaandled request to the original fetch function
      originalFetch(url, opts).then(response => resolve(response));
      return null;
    }, 500);
  });
}
