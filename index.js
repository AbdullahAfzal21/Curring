async function Curring() {
    let userdata, userdata2;
    try {
      const userresp = await fetch("https://jsonplaceholder.typicode.com/users");
      userdata = await userresp.json();
  
      const userresp2 = await fetch("https://jsonplaceholder.typicode.com/posts");
      userdata2 = await userresp2.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return [userdata, userdata2]; 
  }
  
  function Userpost(users) {
    return function (posts) {
      return function (username) {
        let id = undefined;
  
        users.forEach((user) => {
          if (user.name === username) {
            id = user.id;
          }
        });
  
        if (!id) {
         return "No user of this name";
        }
  
        let postarr = [];
        for (let post of posts) {
          if (id === post.userId) {
            postarr.push(post);
          }
        }
  
        return `This user has ${postarr.length} posts.`;
      };
    };
  }

  let username = window.prompt("Enter user name");
  

  Curring().then(([users, posts]) => {
    const result = Userpost(users)(posts)(username);

    window.alert(result);
  });
  

