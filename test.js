const { expect } = require('chai')
const { compose, flatten, is, reject } = require('ramda')
const spy = require('@articulate/spy')

const dampen = require('.')

const plainActions = compose(reject(is(Function)), flatten)

describe('dampen', () => {
  const _action   = spy()
  const _dispatch = spy()

  const action = dampen(250, payload => {
    _action(payload)
    return { type: 'ACTION', payload }
  })

  const dispatch = axn => {
    _dispatch(axn)
    if (typeof axn === 'function') axn(dispatch)
  }

  beforeEach(() => {
    _action.reset()
    _dispatch.reset()
  })

  describe('when dispatched rapidly in succession', () => {
    beforeEach(() => {
      dispatch(action(1))
      dispatch(action(2))
      dispatch(action(3))
    })

    it('only calls action-creator once after the wait', done => {
      setTimeout(() => {
        expect(_action.calls.length).to.equal(1)
        expect(_action.calls[0]).to.eql([ 3 ])
        done()
      }, 251)
    })

    it('only dispatches the action once after the wait', done => {
      setTimeout(() => {
        const plain = plainActions(_dispatch.calls)
        expect(plain.length).to.equal(1)
        expect(plain[0]).to.eql({ type: 'ACTION', payload: 3 })
        done()
      }, 251)
    })
  })
})
