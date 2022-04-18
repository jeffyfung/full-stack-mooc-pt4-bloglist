const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  let reducer = (sum, currVal) => sum + Number(currVal.likes);
  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};