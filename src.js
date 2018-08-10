const dampen = (wait, action) => {
  let args = []
  let disp = Function.prototype
  let timeout = 0

  const dampened = (...nextArgs) => dispatch => {
    args = nextArgs
    disp = dispatch

    clearTimeout(timeout)
    timeout = setTimeout(run, wait)
  }

  const run = () => {
    timeout = 0
    disp(action(...args))
  }

  return dampened
}

module.exports = dampen
