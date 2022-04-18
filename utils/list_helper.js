let _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  let reducer = (sum, currVal) => sum + Number(currVal.likes);
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let reducer = (mostLiked, currBlog) => currBlog.likes > mostLiked.likes? currBlog : mostLiked;
  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  let max = _.chain(blogs).countBy('author').entries().maxBy(_.last).value();
  return blogs.length === 0
    ? null
    : { author: max[0], blogs: max[1] };
};

const mostLikes = (blogs) => {
  let max = _.chain(blogs)
    .groupBy('author')
    .entries()
    .map(item => [item[0], _.sumBy(item[1], 'likes')])
    .maxBy(_.last)
    .value();
  return blogs.length === 0
    ? null
    : { author: max[0], likes: max[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};