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
  } catch(err) {
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
  const firstInput = prompt('What is your first name?');
  const lastInput = prompt('What is your last name?');
  const postInput = prompt('What would you like to post?');
  if (firstInput && lastInput && postInput) {
    try {
      const newPost = await api.addPost({
        owner: {
          firstName: firstInput.trim(),
          lastName: lastInput.trim(),
        },
        text: postInput.trim(),
      });
      console.log(newPost);
      const currentPosts = await api.getPosts();
      console.log(`-----------------`);
      currentPosts.forEach((post) => {
        printPostRow(post);
      });
      console.log(`-----------------`);
    } catch(err) {
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
  } catch(err) {
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
  console.log('-----------------');
};

document
  .querySelector('span:nth-child(1)')
  .addEventListener('click', addANewPost);
document
  .querySelector('span:nth-child(2)')
  .addEventListener('click', deleteAPost);

start();
