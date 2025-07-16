//  Full Frontend JavaScript Code with Upload Validation
const API = 'https://script.google.com/macros/s/AKfycby2t8hbvcGlz2eOETY5bE_Jx5bzMjtmT_V2BndpWOmdSTfdBmvqinHSt6k0Msj5d8R-/exec';

let user = null, access = false, videos = [], authMode = 'login';

function fetchVideos() {
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ action: 'getVideos' })
  })
  .then(res => res.json())
  .then(data => {
    videos = data;
    renderVideos();
    renderHeader();
     renderSidebarTopics();
  })
  .catch(() => {
    const container = document.getElementById('videosContainer');
    if (container) {
      container.innerHTML = `<p style="color:red; font-weight:bold;">⚠️ Failed to load videos. Please try again later.</p>`;
    }
  });
}

/*close ---------------*/
// Helper function to close all modals and sidebar
function closeAllOverlays() {
  const commentModal = document.getElementById('commentModal');
  if (commentModal) commentModal.style.display = 'none';

  const authPopup = document.getElementById('authPopup');
  if (authPopup) authPopup.style.display = 'none';

  const leftSidebar = document.getElementById('leftSidebar');
  if (leftSidebar && leftSidebar.classList.contains('open')) {
    leftSidebar.classList.remove('open');
  }
}


function convertYouTubeToEmbed(url) {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return url;
}

// 🆕 Track currently opened video in modal
let currentModalVideoLink = null;

function renderVideos() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const container = document.getElementById('videosContainer');
  container.innerHTML = '';

  videos
    .filter(v => v.title.toLowerCase().includes(q))
    .forEach(v => {
      const encodedLink = encodeURIComponent(v.link);
      let mediaEmbed = '';

      const ytMatch = v.link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
     if (ytMatch) {
  const youtubeId = ytMatch[1];
  mediaEmbed = `
    <div class="video-embed">
      <iframe src="https://www.youtube.com/embed/${youtubeId}" allowfullscreen></iframe>
    </div>`;
} else if (/drive\.google\.com/.test(v.link)) {
  const driveMatch = v.link.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const driveId = driveMatch[1];
    mediaEmbed = `
      <div class="video-embed">
        <iframe src="https://drive.google.com/file/d/${driveId}/preview" allowfullscreen></iframe>
      </div>`;
  }
} else if (v.link.match(/\.(mp4|webm|ogg)$/i)) {
  mediaEmbed = `
    <video controls style="max-width: 100%; border-radius: 8px;">
      <source src="${v.link}" type="video/${v.link.split('.').pop()}">
      Your browser does not support the video tag.
    </video>`;
} else if (v.link.match(/\.(jpeg|jpg|png|gif|webp|svg)$/i)) {
  mediaEmbed = `<img src="${v.link}" alt="${escapeHtml(v.title)}" style="max-width:100%; border-radius:8px;" />`;
} else {
  mediaEmbed = `<a href="${v.link}" target="_blank" class="video-link">▶️ Watch or View Externally</a>`;
}


      const el = document.createElement('div');
      el.className = 'video-card';
      el.innerHTML = `
        ${mediaEmbed}
        <div class="video-title" style="position:relative;">
  <h3 class="title-text" style="
    font-size: 18px;
    max-height: 3.6em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin: 5px 0;
  ">
    ${escapeHtml(v.title)}
  </h3>
  <span class="read-more-btn" style="color:#03a9f4; font-size:13px; cursor:pointer;">Read more</span>
</div>

<div class="video-topic" style="position:relative;">
  <p class="topic-text" style="
    font-weight: bold;
    max-height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin: 0 0 6px;
  ">
    ${escapeHtml(v.topic)}
  </p>
  <span class="read-more-btn" style="color:#03a9f4; font-size:13px; cursor:pointer;">Read more</span>
</div>
 <small>${escapeHtml(v.date)}</small>
        <div class="description-wrapper">
       <p class="video-description" id="desc-${encodedLink}">
       ${escapeHtml(v.description)}
       </p>
       <button class="read-more-btn" onclick="toggleDescription('${encodedLink}')">Read more</button>
       </div>


        <div class="like-dislike-container" style="display: flex; align-items: center; gap: 15px; font-size: 1.1em; user-select:none;">
          <span
            id="like-icon-${encodedLink}"
            class="like-icon"
            style="cursor: pointer; display: flex; align-items: center; gap: 5px;"
            onclick="like('${v.link}')"
            title="Like"
          >
            👍 <span id="like-count-${encodedLink}">${v.likes || 0}</span>
          </span>

          <span
            id="dislike-icon-${encodedLink}"
            class="dislike-icon"
            style="cursor: pointer; display: flex; align-items: center; gap: 5px;"
            onclick="dislike('${v.link}')"
            title="Dislike"
          >
            👎 <span id="dislike-count-${encodedLink}">${v.dislikes || 0}</span>
          </span>
        </div>

        ${access ? `
          <div class='comment-input'>
            <input id='comment-${encodedLink}' placeholder='Add comment...'/>
            <button onclick='addComment("${v.link}")' class="btn-design">Post</button>
          </div>
        ` : `<p><i>Login to like or comment.</i></p>`}

        <div id='comments-${encodedLink}' class='comment-section'></div>
      `;

      container.appendChild(el);
      loadComments(v.link);
      if (access) checkUserVote(v.link);
    });
}
function renderSidebarTopics() {
  const topicList = document.getElementById('topicList');
  if (!topicList) return;

  const uniqueTopics = [...new Set(videos.map(v => v.topic).filter(Boolean))];
  topicList.innerHTML = '';

  uniqueTopics.forEach(topic => {
    const li = document.createElement('li');
    li.textContent = topic;
    li.onclick = () => {
      document.getElementById('searchInput').value = topic;
      fetchVideos(); // Re-render videos based on topic
    };
    topicList.appendChild(li);
  });
}

let currentlyExpandedDesc = null;

function toggleDescription(encodedLink) {
  const desc = document.getElementById(`desc-${encodedLink}`);
  const btn = desc.nextElementSibling;

  const isExpanded = desc.classList.contains('expanded');

  // Collapse any previously expanded
  if (currentlyExpandedDesc && currentlyExpandedDesc !== desc) {
    currentlyExpandedDesc.classList.remove('expanded');
    currentlyExpandedDesc.nextElementSibling.textContent = 'Read more';
  }

  if (!isExpanded) {
    desc.classList.add('expanded');
    btn.textContent = 'Read less';
    currentlyExpandedDesc = desc;
  } else {
    desc.classList.remove('expanded');
    btn.textContent = 'Read more';
    currentlyExpandedDesc = null;
  }
}

// Collapse when clicking outside
document.addEventListener('click', function (e) {
  if (
    currentlyExpandedDesc &&
    !currentlyExpandedDesc.contains(e.target) &&
    !currentlyExpandedDesc.nextElementSibling.contains(e.target)
  ) {
    currentlyExpandedDesc.classList.remove('expanded');
    currentlyExpandedDesc.nextElementSibling.textContent = 'Read more';
    currentlyExpandedDesc = null;
  }
});


const COMMENTS_BATCH_SIZE = 3;
const commentsCache = {};
const commentsShownCount = {};

function loadComments(link, loadMore = false) {
  const container = document.getElementById('commentsContainer'); // or 'modalCommentsContainer' if inside modal
  if (!loadMore && container) {
    container.innerHTML = '<p style="opacity:0.6;">Loading comments...</p>';
  }

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ action: 'getComments', videoLink: link })
  })
  .then(res => res.json())
  .then(data => {
    const comments = data.comments || [];
    commentsCache[link] = comments;
    if (!loadMore) commentsShownCount[link] = 0;
    showCommentsBatch(link);
  })
  .catch(() => {
    if (container) {
      container.innerHTML = '<p style="opacity:0.6;">Loading comment.....</p>';
    }
  });
}

function showCommentsBatch(link) {
  const container = document.getElementById(`comments-${encodeURIComponent(link)}`);
  const allComments = commentsCache[link] || [];

  if (allComments.length === 0) {
    container.innerHTML = `<div class="comment-box"><p><i>No comments yet.</i></p></div>`;
    return;
  }

  // White background & black text for outer box
  container.innerHTML = `
    <div class="comment-box" style="
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      color: #000;
      font-family: Arial, sans-serif;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">
      <div class="comment-header" style="
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 12px;
        border-bottom: 1px solid #eee;
        padding-bottom: 6px;
      ">
        Comments <span style="opacity: 0.6;">${allComments.length}</span>
      </div>
      <div id="commentText-${encodeURIComponent(link)}" class="comment-text"></div>
    </div>
  `;

  const textContainer = document.getElementById(`commentText-${encodeURIComponent(link)}`);
  

  function displayRandomComment() {
    const randomIndex = Math.floor(Math.random() * allComments.length);
    const c = allComments[randomIndex];
    const initial = escapeHtml(c.name[0].toUpperCase());

    textContainer.innerHTML = `
      <div onclick="openModalByLink('${encodeURIComponent(link)}')" style="
        cursor:pointer;
        display:flex;
        align-items:flex-start;
        gap:12px;
        background:#f9f9f9;
        padding:16px;
        border-radius:12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        transition: transform 0.2s ease;
      " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
        
        <div style="
          min-width:40px;
          height:40px;
          background:#1976d2;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:bold;
          color:#fff;
          font-size:16px;
          flex-shrink:0;
        ">
          ${initial}
        </div>

        <div style="
          font-size:15px;
          color:#000;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        ">
          ${escapeHtml(c.comment)}
        </div>
      </div>
    `;
  }

  displayRandomComment(); // Show first immediately
  setInterval(displayRandomComment, 5000); // Update every 5s
}

// Global to track current video link shown in modal
currentModalVideoLink = null;
function openCommentModal(comments) {
  const container = document.getElementById('modalCommentsContainer');
  container.innerHTML = '';  // Clear previous comments

  if (!comments || comments.length === 0) {
    container.innerHTML = '<p><i>No comments to show.</i></p>';
    return;
  }

  // Sort: user's comment first
  const sortedComments = [...comments].sort((a, b) => {
    if (user && a.email === user.email) return -1;
    if (user && b.email === user.email) return 1;
    return 0;
  });

  sortedComments.forEach((c, idx) => {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '15px';

    wrapper.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:32px; height:32px; border-radius:50%; background:#f06292; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#fff;">
          ${escapeHtml(c.name[0].toUpperCase())}
        </div>
        <div>
          <b>${escapeHtml(c.name)}</b><br>
          <small style="opacity:0.7;">${escapeHtml(c.time || 'Just now')}</small>
        </div>
      </div>
      <p class="modal-comment-text" id="modal-comment-text-${idx}" style="margin:10px 0 0; font-size:14px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; text-overflow:ellipsis;">
        ${escapeHtml(c.comment)}
      </p>
      <button class="read-toggle-btn" style="background:none; border:none; color:#03a9f4; cursor:pointer; font-size:13px;">Read more</button>
    `;

    // Read more / Read less toggle
    const btn = wrapper.querySelector('.read-toggle-btn');
    const commentText = wrapper.querySelector('.modal-comment-text');
    btn.onclick = () => {
      const expanded = commentText.style.webkitLineClamp === 'unset';
      commentText.style.webkitLineClamp = expanded ? '3' : 'unset';
      btn.textContent = expanded ? 'Read more' : 'Read less';
    };

    // Add Edit/Delete buttons only if user owns the comment
    if (access && user && user.email === c.email) {
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-design';
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '10px';
      editBtn.onclick = () => openModalEditComment(idx, c.comment, c.email, sortedComments);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-design';
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.marginLeft = '5px';
      deleteBtn.onclick = () => deleteCommentConfirmModal(sortedComments, idx);

      wrapper.appendChild(editBtn);
      wrapper.appendChild(deleteBtn);
    }

    container.appendChild(wrapper);
  });

  // Show modal
  document.getElementById('commentModal').style.display = 'flex';
}

// Put this at top or outside any function
function openModalByLink(encodedLink) {
  const link = decodeURIComponent(encodedLink);
  currentModalVideoLink = link;   // Track current modal video link
  const comments = commentsCache[link] || [];
  openCommentModal(comments);
}

function closeModal() {
  document.getElementById('commentModal').style.display = 'none';
}








// Open inline edit for comment inside modal
function openModalEditComment(idx, currentComment, email, comments) {
  const container = document.getElementById('modalCommentsContainer');
  const commentWrapper = container.children[idx];
  
  // Hide original comment text and read more button
  const p = commentWrapper.querySelector(`#modal-comment-text-${idx}`);
  const readBtn = commentWrapper.querySelector('.read-toggle-btn');
  p.style.display = 'none';
  readBtn.style.display = 'none';


  // Create input field and buttons
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentComment;
  input.style.width = '100%';
  input.id = `modal-edit-input-${idx}`;
  input.className = 'edit-input'; 

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn-design'
  saveBtn.textContent = 'Save';
  saveBtn.style.marginLeft = '10px';
  saveBtn.onclick = () => submitModalEditedComment(idx, email, comments);

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'btn-design'
  cancelBtn.style.marginLeft = '5px';
  cancelBtn.onclick = () => cancelModalEdit(idx);

  commentWrapper.appendChild(input);
  commentWrapper.appendChild(saveBtn);
  commentWrapper.appendChild(cancelBtn);
}

// Submit edited comment from modal
function submitModalEditedComment(idx, email, comments) {
  const input = document.getElementById(`modal-edit-input-${idx}`);
  if (!input.value.trim()) return alert('Comment cannot be empty.');
  
  const newComment = input.value.trim();
  const oldComment = comments[idx].comment;
  const videoLink = comments[idx].videoLink || currentModalVideoLink; // fallback to current modal video

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'editComment',
      videoLink,
      email,
      oldComment,
      newComment
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      loadComments(videoLink);
      openModalByLink(encodeURIComponent(videoLink));
    } else {
      alert(res.message || 'Failed to edit comment.');
    }
  })
  .catch(() => alert('Error editing comment.'));
}

// Cancel edit in modal and revert UI
function cancelModalEdit(idx) {
  const container = document.getElementById('modalCommentsContainer');
  const commentWrapper = container.children[idx];

  // Remove input and buttons
  const input = document.getElementById(`modal-edit-input-${idx}`);
  if (input) input.remove();

  const buttons = commentWrapper.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.textContent === 'Save' || btn.textContent === 'Cancel') btn.remove();
  });

  // Show comment text and read more again
  const p = commentWrapper.querySelector(`#modal-comment-text-${idx}`);
  const readBtn = commentWrapper.querySelector('.read-toggle-btn');
  if(p) p.style.display = 'block';
  if(readBtn) readBtn.style.display = 'inline-block';
}

// Delete comment from modal with confirmation
function deleteCommentConfirmModal(comments, idx) {
  if (!confirm('Are you sure you want to delete this comment?')) return;

  const comment = comments[idx];
  const videoLink = comment.videoLink || currentModalVideoLink;

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'deleteComment',
      videoLink,
      email: comment.email,
      comment: comment.comment
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      loadComments(videoLink);
      openModalByLink(encodeURIComponent(videoLink));
    } else {
      alert(res.message || 'Failed to delete comment.');
    }
  })
  .catch(() => alert('Error deleting comment.'));
}

function escapeBackticks(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}



function escapeHtml(text) {
  if (typeof text !== 'string') text = String(text || '');
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function addComment(link) {
  if (!access) return alert('Please login to comment.');
  const commentInput = document.getElementById(`comment-${encodeURIComponent(link)}`);
  if (!commentInput || !commentInput.value.trim()) return;
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'postComment',
      videoLink: link,
      comment: commentInput.value.trim(),
      name: user.name,
      email: user.email
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      commentInput.value = '';
      loadComments(link);
      fetchVideos();
    } else {
      alert(res.message || 'Error posting comment.');
    }
  })
  .catch(() => alert("Error posting comment."));
}

function like(link) {
  if (!access) return alert('Please login to like videos.');
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'voteOnVideo',
      type: 'like',
      videoLink: link,
      email: user.email
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      disableVoteButtons(link);
      fetchVideos();
    } else {
      alert(res.message || 'Error liking video.');
    }
  });
}

function dislike(link) {
  if (!access) return alert('Please login to dislike videos.');
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'voteOnVideo',
      type: 'dislike',
      videoLink: link,
      email: user.email
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      disableVoteButtons(link);
      fetchVideos();
    } else {
      alert(res.message || 'Error disliking video.');
    }
  });
}

function disableVoteButtons(link) {
  const likeBtn = document.getElementById(`like-btn-${encodeURIComponent(link)}`);
  const dislikeBtn = document.getElementById(`dislike-btn-${encodeURIComponent(link)}`);
  if (likeBtn) likeBtn.disabled = true;
  if (dislikeBtn) dislikeBtn.disabled = true;
}

function checkUserVote(link) {
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ action: 'checkUserVote', videoLink: link, email: user.email })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success' && res.voted) disableVoteButtons(link);
  });
}

function showUploadForm() {
  if (!access) return alert('Please login to upload videos.');
  const formContainer = document.getElementById('uploadFormContainer');
  formContainer.style.display = 'block';
  // Lock scroll
  document.body.classList.add('modal-open');
}

function hideUploadForm() {
  const formContainer = document.getElementById('uploadFormContainer');
  formContainer.style.display = 'none';
  // Unlock scroll
  document.body.classList.remove('modal-open');
}

// Add event listener to cancel button to hide form and unlock scroll
document.getElementById('uploadCancelBtn').addEventListener('click', hideUploadForm);

function submitUpload() {
  if (!access) return alert('Please login to upload videos.');

  const link = document.getElementById('uploadLink').value.trim();
  const title = document.getElementById('uploadTitle').value.trim();
  const topic = document.getElementById('uploadTopic').value.trim();
  const description = document.getElementById('uploadDescription').value.trim();

  if (!link || !title || !topic || !description) {
    alert('Please fill all fields: Link, Title, Topic, and Description.');
    return;
  }

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'uploadVideo',
      link,
      title,
      topic,
      description,
      uploaderEmail: user.email
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      alert('Video uploaded! Awaiting admin approval.');
      hideUploadForm(); // Use the hide function here to unlock scroll
      document.getElementById('uploadLink').value = '';
      document.getElementById('uploadTitle').value = '';
      document.getElementById('uploadTopic').value = '';
      document.getElementById('uploadDescription').value = '';
      fetchVideos();
    } else {
      alert(res.message || 'Failed to upload video.');
    }
  })
  .catch(() => alert("Error uploading video."));
}

function showAuthPopup() {
  document.getElementById('authPopup').style.display = 'block';
  document.getElementById('authTitle').innerText = authMode === 'login' ? 'Login' : 'Sign Up';
  document.getElementById('authName').style.display = authMode === 'signup' ? 'block' : 'none';
  document.getElementById('authMobile').style.display = authMode === 'signup' ? 'block' : 'none';
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'signup' : 'login';
  document.getElementById('switchMode').innerText = authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login";
  showAuthPopup();
}

function submitAuth() {
  const name = document.getElementById('authName').value.trim();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const mobile = document.getElementById('authMobile').value.trim();

  if (!email || !password) return alert('Email and Password are required.');
  if (authMode === 'signup' && password.length < 6) return alert('Password must be at least 6 characters.');

  const payload = {
    action: authMode === 'signup' ? 'signup' : 'login',
    name, email, password, mobile
  };

  fetch(API, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      user = { name: res.name || name, email };
      access = true;
      document.getElementById('authPopup').style.display = 'none';
      renderHeader();
      fetchVideos();
    } else {
      alert(res.message || 'Authentication failed.');
    }
  })
  .catch(() => alert("Error communicating with server."));
}

function requestPassword() {
  const email = prompt('Enter your registered email:');
  if (!email) return;
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ action: 'forgotPassword', email })
  })
  .then(res => res.json())
  .then(res => alert(res.message || 'Check your email.'))
  .catch(() => alert("Failed to send password."));
}

function renderHeader() {
  const loginBtn = document.getElementById('loginBtn');
  const uploadBtn = document.getElementById('uploadBtn');
  const userInfo = document.getElementById('userInfo');
  const bookBtn = document.getElementById('bookBtn'); // keep your original reference

  // ✅ Always fetch latest user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    loginBtn.style.display = 'none';
    // uploadBtn.style.display = 'inline-block';
    bookBtn.style.display = 'none';

    const initial = escapeHtml(user.name[0].toUpperCase());

    userInfo.innerHTML = `
      <div class="user-box">
        <div class="avatar">${initial}</div>
        <div class="user-details">
          <strong>Hi, ${escapeHtml(user.name)}</strong>
          <div class="user-email">${escapeHtml(user.email)}</div>
          <span class="changuser" onclick="openChangePasswordPopup()">Change User Detail</span>
        </div>
        <button class="logout-btn" onclick="logout()">Logout</button>
      </div>
    `;
  } else {
    loginBtn.style.display = 'inline-block';
    uploadBtn.style.display = 'none';
    userInfo.innerHTML = '';
  }
}


function openChangePasswordPopup() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return alert("User not logged in.");

  // Prefill name, mobile (if available), and email (read-only)
  document.getElementById('changeEmail').value = user.email;
  document.getElementById('newName').value = user.name || '';
  document.getElementById('newMobile').value = user.mobile || '';
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';

  document.getElementById('changePasswordPopup').style.display = 'flex';
}

function closeChangePasswordPopup() {
  document.getElementById('changePasswordPopup').style.display = 'none';
}

function submitChangePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const newName = document.getElementById('newName').value;
  const newMobile = document.getElementById('newMobile').value;
  const email = document.getElementById('changeEmail').value;

  if (newPassword.length < 6) {
    return alert("New password must be at least 6 characters.");
  }

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'changePassword',
      email,
      currentPassword,
      newPassword,
      newName,
      newMobile
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.status === 'success') {
      // Update localStorage with new name/mobile
      const updatedUser = { name: newName, email, mobile: newMobile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      closeChangePasswordPopup();
      renderHeader(); // optional: re-render UI
    }
  })
  .catch(() => alert("Something went wrong. Please try again later."));
}






/* video upload character remaining */
function updateCharCount(inputId, countId, max) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(countId);
  counter.textContent = `${max} characters remaining`;

  input.addEventListener('input', () => {
    const remaining = max - input.value.length;
    counter.textContent = `${remaining} characters remaining`;
    counter.style.color = remaining < 10 ? 'red' : 'black';
  });
}

updateCharCount('uploadTitle', 'titleCount', 64);
updateCharCount('uploadTopic', 'topicCount', 64);
updateCharCount('uploadDescription', 'descriptionCount', 400);
/*title & TOPIC*/
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('read-more-btn')) {
    const p = e.target.previousElementSibling;
    const isExpanded = p.style.webkitLineClamp === 'unset';

    p.style.webkitLineClamp = isExpanded ? '1' : 'unset';
    p.style.maxHeight = isExpanded ? '1.8em' : 'none';
    e.target.textContent = isExpanded ? 'Read more' : 'Read less';
  } else {
    // Collapse all title-text blocks
    document.querySelectorAll('.title-text').forEach(p => {
      p.style.webkitLineClamp = '1';
      p.style.maxHeight = '1.8em';
    });
    document.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.textContent = 'Read more';
    });
  }
});
// Show login popup on page load if not logged in
window.addEventListener('load', () => {
  if (!access) {
    showAuthPopup();
    startLoginReminder();
  }
});

let loginReminderInterval = null;

function startLoginReminder() {
  if (loginReminderInterval) return; // Prevent multiple timers
  loginReminderInterval = setInterval(() => {
    if (!access) {
      showAuthPopup();
    } else {
      clearInterval(loginReminderInterval);
      loginReminderInterval = null;
    }
  }, 3 * 60 * 1000); // Every 3 minutes
}

// Modify your "close popup" button or function to just hide the popup without setting access=true
// For example, assuming you have a close button with id 'authCloseBtn':
document.getElementById('authCloseBtn').addEventListener('click', () => {
  document.getElementById('authPopup').style.display = 'none';
  // The loginReminderInterval will re-show the popup after 3 minutes if user not logged in
});
// CSS (paste inside your <style> or CSS file)
/*
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
*/

// --------- JS snippet starts ---------

// Show login/signup popup with scroll lock
function showAuthPopup() {
  const authPopup = document.getElementById('authPopup');
  authPopup.style.display = 'block';
  document.body.classList.add('modal-open');  // Lock scroll when popup is visible

  document.getElementById('authTitle').innerText = authMode === 'login' ? 'Login' : 'Sign Up';
  document.getElementById('authName').style.display = authMode === 'signup' ? 'block' : 'none';
  document.getElementById('authMobile').style.display = authMode === 'signup' ? 'block' : 'none';
}

// Close login/signup popup and unlock scroll
document.getElementById('authCloseBtn').addEventListener('click', () => {
  document.getElementById('authPopup').style.display = 'none';
  document.body.classList.remove('modal-open');  // Unlock scroll on popup close
});

function submitAuth() {
  const name = document.getElementById('authName').value.trim();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const mobile = document.getElementById('authMobile').value.trim();

  if (!email || !password) return alert('Email and Password are required.');
  if (authMode === 'signup' && password.length < 6) return alert('Password must be at least 6 characters.');

  const payload = {
    action: authMode === 'signup' ? 'signup' : 'login',
    name,
    email,
    password,
    mobile
  };

  fetch(API, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        user = { name: res.name || name, email };
        access = true;

        localStorage.setItem('user', JSON.stringify(user)); // Save user info

        // Hide popup and unlock scroll
        document.getElementById('authPopup').style.display = 'none';
        document.body.classList.remove('modal-open'); //  FIX: allow scroll again

        renderHeader();   // Refresh greeting and buttons
        fetchVideos();    //  Load videos immediately
      } else {
        alert(res.message || 'Authentication failed.');
      }
    })
    .catch(() => alert("Error communicating with server."));
}




// Restore session if available
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try {
    user = JSON.parse(storedUser);
    access = true;
    renderHeader();
  } catch (e) {
    console.error('Invalid user data in localStorage');
  }
}

fetchVideos();


window.onload = init;
function init() {
  renderHeader();
  fetchVideos();
  
  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) uploadBtn.onclick = showUploadForm;

  const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
  if (uploadSubmitBtn) uploadSubmitBtn.onclick = submitUpload;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.oninput = fetchVideos;
}
function logout() {
  user = null;
  access = false;
  localStorage.removeItem('user'); // clears session
  renderHeader();
  fetchVideos();
}



