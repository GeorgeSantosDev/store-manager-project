const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const hour = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

module.exports = () => `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
