// A class for interacting with our https://dummyapi.io/ data
class API {
  constructor() {
    this._url = 'https://dummyapi.io/data/api/post?limit=5'; // post endpoint limit 5
    this._app_id = '608ff65ecfb4e068c46f3038'; // had to signup for an app id key
    this._options = {
      headers: { 'app-id': this._app_id }, // we have to add the cred to the headers of the req
    };
    this._posts = []; // db store property for our posts
  }
  // getters for our properties
  get url() {
    return this._url;
  }
  get options() {
    return this._options;
  }
  get posts() {
    return this._posts;
  }
  // a method for prepopulating a snapshot of posts
  // using fetch to return some post test data
  // https://www.sitepoint.com/introduction-to-the-fetch-api/
  // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  async getInitialPosts() {
    try {
      const response = await fetch(this.url, this.options);
      const postData = await response.json();
      console.log('Retrieved Posts from API!');
      this._posts = postData.data;
    } catch (err) {
      console.log(err);
    }
  }
  getPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.posts
          ? resolve(this.posts)
          : reject(new Error(`Couldn't retrieve post data!`));
      }, 1000);
    });
  }
  addPost(post) {
    return new Promise((resolve, reject) => {
      this._posts.push(post);
      console.log('Post was created!');
      setTimeout(() => {
        post
          ? resolve(post)
          : reject(new Error(`Error: something went wrong!`));
      }, 500);
    });
  }

  deletePost() {
    return new Promise((resolve, reject) => {
      const deletedPost = this._posts.pop();
      console.log('Last Post was deleted!');
      setTimeout(() => {
        deletedPost
          ? resolve(deletedPost)
          : reject(new Error(`Error: something went wrong!`));
      }, 500);
    });
  }
}

// create an instance of our API
const api = new API();

const start = async () => {
  try {
    await api.getInitialPosts();
    const currentPosts = await api.getPosts();
    console.log(`-----------------`);
    currentPosts.forEach((post) => {
      printPostRow(post);
    });
    console.log(`-----------------`);
  } catch {
    document.write(err);
  }

  // api
  //   .getPosts()
  //   .then((currentPosts) => {
  //     console.log(currentPosts);
  //     console.log(`-----------------`);
  //     currentPosts.forEach((post) => {
  //       printPostRow(post);
  //     });
  //     console.log(`-----------------`);
  //   })
  //   .catch((err) => {
  //     document.write(err);
  //   });
};

const addANewPost = async () => {
  const firstInput = prompt('What is your first name?').trim();
  const lastInput = prompt('What is your last name?').trim();
  const postInput = prompt('What would you like to post?').trim();
  if (firstInput && lastInput && postInput) {
    try {
      const newPost = await api.addPost({
        owner: {
          firstName: firstInput,
          lastName: lastInput,
        },
        text: postInput,
      });
      console.log(newPost);
      const currentPosts = await api.getPosts();
      console.log(`-----------------`);
      currentPosts.forEach((post) => {
        printPostRow(post);
      });
      console.log(`-----------------`);
    } catch {
      document.write(err);
    }
    // api
    //   .addPost({
    //     owner: {
    //       firstName: firstInput,
    //       lastName: lastInput,
    //     },
    //     text: postInput,
    //   })
    //   .then(() => {
    //     api.getPosts().then((currentPosts) => {
    //       console.log(`-----------------`);
    //       currentPosts.forEach((post) => {
    //         printPostRow(post);
    //       });
    //       console.log(`-----------------`);
    //     });
    //   });
    //
    // api
    //   .addPost({
    //     owner: {
    //       firstName: firstInput,
    //       lastName: lastInput,
    //     },
    //     text: postInput,
    //   })
    //   .then(() => api.getPosts())
    //   .then((currentPosts) => {
    //     console.log(`-----------------`);
    //     currentPosts.forEach((post) => {
    //       printPostRow(post);
    //     });
    //     console.log(`-----------------`);
    //   })
    //   .catch((err) => {
    //     document.write(err);
    //   });
  }
};

const deleteAPost = async () => {
  try {
    const removedPost = await api.deletePost();
    console.log(removedPost);
    const currentPosts = await api.getPosts();
    console.log(`-----------------`);
    currentPosts.forEach((post) => {
      printPostRow(post);
    });
    console.log(`-----------------`);
  } catch {
    document.write(err);
  }
  // api
  //   .deletePost()
  //   .then((removedPost) => {
  //     console.log(removedPost);
  //     api.getPosts().then((currentPosts) => {
  //       console.log(`-----------------`);
  //       currentPosts.forEach((post) => {
  //         printPostRow(post);
  //       });
  //       console.log(`-----------------`);
  //     });
  //   })
  //   .catch((err) => {
  //     document.write(err);
  //   });
  //
  // api
  //   .deletePost()
  //   .then((removedPost) => api.getPosts())
  //   .then((currentPosts) => {
  //     console.log(`-----------------`);
  //     currentPosts.forEach((post) => {
  //       printPostRow(post);
  //     });
  //     console.log(`-----------------`);
  //   })
  //   .catch((err) => {
  //     document.write(err);
  //   });
};

const printPostRow = (post) => {
  console.log(`Left By: ${post.owner.firstName} ${post.owner.lastName}`);
  console.log(`Message: ${post.text}`);
};

document
  .querySelector('span:nth-child(1)')
  .addEventListener('click', addANewPost);
document
  .querySelector('span:nth-child(2)')
  .addEventListener('click', deleteAPost);

start();
