/**
 * Creates a debounced function that delays invoking the Redux action creator until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param {number} wait - The number of milliseconds to delay
 * @param {Function} actionCreator - The Redux action creator to debounce
 * @returns {Function} - The new debounced function
 */
const debounceActionCreator = (wait, actionCreator) => {
  let timeoutId = null;

  const debounced =
    (...args) =>
    (dispatch) => {
      const later = () => {
        timeoutId = null;
        dispatch(actionCreator(...args));
      };

      clearTimeout(timeoutId);
      timeoutId = setTimeout(later, wait);
    };

  return debounced;
};

module.exports = debounceActionCreator;
