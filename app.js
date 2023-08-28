const data = {
    currentUser: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    comments: [
      {
        parent: 0,
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
        replies: [],
      },
      {
        parent: 0,
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
        replies: [
          {
            parent: 2,
            id: 1,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
              },
              username: "ramsesmiron",
            },
          },
          {
            parent: 2,
            id: 1,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          },
        ],
      },
    ],
  };
  document.addEventListener('click',(e)=>{
    if(e.target.dataset.reply){
      handleReply(e.target.dataset.reply)
    }
    else if(e.target.dataset.count){
      const targetId = e.target.dataset.count;
      const action = e.target.id === 'plus' ? 'plus' : 'minus';
      increment(targetId,action)
    }
    else if(e.target.id === "send-btn"){
      addComment()
    }
  })



function handleReply(targetId){
  
  const targetObj=data.comments.filter(function(comment){
    return comment.id === parseInt(targetId)
  })[0]
  renderReplyBox(targetObj)
}

function renderReplyBox(targetObj){
    const replyBox = document.querySelector(".reply")
    
    replyBox.innerHTML = `<div class="reply-container">
    <img src="${targetObj.user.image.png}" alt="" >
    <textarea id="comment-input"
              placeholder="   Add a comment"
              ></textarea>
              <button id="send-btn">Send</button>
  </div>`
}

function increment(targetId,action){
  data.comments.forEach((comment) => {
    if (comment.id === parseInt(targetId)) {
      if (action === "plus") {
        comment.score++;
      } else if (action === "minus" && comment.score > 0) {
        comment.score--;
      }
    }
  }); 
  renderPage()
}
function getPageData(){
        let comments = ""
        let repliesHtml =""
    data.comments.forEach((comment)=>{
      if(comment.replies.length > 0){

        comment.replies.forEach((reply)=>{
          repliesHtml += `<div class="comment-container">
          <div class="header">
              <img src="${reply.user.image.png}" alt="person1">
              <span id="name"><strong>${reply.user.username}</strong></span>
              <span id="date">${reply.createdAt}</span>
          </div>
          <div class="description">
              <p id="comment">
              @<a href="#">${reply.replyingTo}</a>
              ${reply.content}
             </p>
          </div>
          <div class="buttons">
              <div class="addminus">
                  <span id="plus">+</span><span id="numberoflikes">${reply.score}</span> <span id="minus">-</span>
              </div>
              <div class="replybtn">
                  <span id="reply" data.replyId="${reply.id}"><img src="./images/icon-reply.svg" alt="Reply">Reply</span>
              </div>
          </div>`
        })
          
      }

        comments += ` <div class="comment-container">
        <div class="header">
            <img src="${comment.user.image.png}" alt="person1">
            <span id="name"><strong>${comment.user.username}</strong></span>
            <span id="date">${comment.createdAt}</span>
        </div>
        <div class="description">
            <p id="comment">${comment.content}
           </p>
        </div>
        <div class="buttons">
            <div class="addminus">
                <span id="plus" data-count="${comment.id}" >+</span><span id="numberoflikes">${comment.score}</span> <span id="minus" data-count="${comment.id}">-</span>
            </div>
                <span id="reply" data-reply="${comment.id}" ><img src="./images/icon-reply.svg" alt="Reply">Reply</span>
            </div>
        </div>
        <div class="replies" id="${Comment.id}">
           ${repliesHtml}  
        </div>` 
        
        
    })
    
    return comments
}


function currentUser(){
  
  return `<div class="reply-container"> <img src="${data.currentUser.image.png}" alt="${data.currentUser.username}" >
  <textarea id="comment-input"
            placeholder="   Add a comment"
            ></textarea>
            <button id="send-btn">Send</button
            </div>`
}

function addComment(){
  const commentInput = document.getElementById('comment-input')
  const random = Math.floor(Math.random()*50)
  data.comments[0].replies.unshift( {
    "id": 3,
    "content": commentInput.value,
    "createdAt": new Date("2022-03-25"),
    "score": 4,
    "replyingTo": "maxblagun",
    "user": {
      "image": { 
        "png": "./images/avatars/image-ramsesmiron.png",
        "webp": "./images/avatars/image-ramsesmiron.webp"
      },
      "username": "ramsesmiron"
    }
  })
  renderPage()
}


const currentUserCon = document.querySelector(".currentUser-Con").innerHTML += currentUser()
function renderPage() {
    const commentsCon = document.querySelector(".comments")
    commentsCon.innerHTML =""
    commentsCon.innerHTML += getPageData(); 
    
  }
  renderPage()

  