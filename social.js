// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    let userID = Object.keys(this.users).length + 1
    this.users[userID] = {id: userID, name: name}
    this.follows[userID] = new Set()

    return userID
  }

  getUser(userID) {
    // Your code here
    return this.users[userID] ? this.users[userID] : null
  }

  follow(userID1, userID2) {
    // Your code here
    if(!this.users[userID1] || !this.users[userID2]){
      return false
    }

    this.follows[userID1].add(userID2)

    return true
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID]
  }

  getFollowers(userID) {
    // Your code here
    let ans = new Set()
    for(let user in this.follows){
      let userFollows = this.follows[user]

      if(userFollows.has(userID)){
        ans.add(parseInt(user))
      }
    }

    return ans
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here

    //answer for recommended
    let ans = []

    //getting follows at the start
    let userFollows = Array.from(this.getFollows(userID))

    //queue for the loop-search
    let queue = []


    //Making start paths already with user follows
    userFollows.forEach((follow)=>{
      let path = [userID]
      path.push(follow)

      queue.push(path)
    })


    //Adding visited to the user itself and his follos for not-duplicated
    let visited = new Set(userFollows.concat([userID]))


    //variable for calculate the degree difference, because we already start with paths of length 2(user and user's follows). Set this to 2
    let baseLength = 2

    //breadth-first
    while(queue.length > 0){
      let path = queue.shift()

      let curr = path[path.length-1]

      //getting follows of the last follow of path
      let follows = Array.from(this.getFollows(curr))

      follows.forEach((follow)=>{
        if(!visited.has(follow)){
          let newPath = path.concat(follow)
          queue.push(newPath)
          visited.add(follow)

          //if the new path is longer of the base length path(2) and less than the degress required then it should be recommended
          if(newPath.length - baseLength < degrees+1){
            ans.push(follow)
          }
        }
      })
    }

    return ans
  }
}

module.exports = SocialNetwork;
