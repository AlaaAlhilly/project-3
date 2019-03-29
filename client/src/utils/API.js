import axios from "axios";

export default {
  getSnippets: function() {
    return axios.get("/api/snippets");
  },
  getSnippet: function(id) {
    return axios.get("/api/snippets/" + id);
  },
  deleteSnippet: function(id) {
    return axios.delete("/api/snippets/" + id);
  },
  saveSnippet: function(snippetData) {
    return axios.post("/api/snippets", snippetData);
  },
  getComments: function() {
    return axios.get("/api/comments");
  },
  getcomment: function(id) {
    return axios.get("/api/comments/" + id);
  },
  deleteComment: function(id) {
    return axios.delete("/api/comments/" + id);
  },
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  },
  getLikes: function() {
    return axios.get("/api/likes");
  },
  getLike: function(auth_id,post_id) {
    return axios.get("/api/likes/" + auth_id+"/"+post_id);
  },
  deleteLike: function(auth_id,post_id) {
    return axios.delete("/api/likes/" + auth_id+"/"+post_id);
  },
  saveLike: function(likeData) {
    return axios.post("/api/likes", likeData);
  },
  getUsers: function() {
    return axios.get("/api/user");
  },
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  saveuser: function(userData) {
    return axios.post("/api/user", userData);
  }

};
