/**
 * this is used for a comment and a post
 * 
 * @param {Date} date - string of the date saved at  
 */

export function formatDate(date) {
  date = new Date(date);
  let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', dateOptions)
}