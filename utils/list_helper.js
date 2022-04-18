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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};