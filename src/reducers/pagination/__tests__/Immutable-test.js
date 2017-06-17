import React from 'react'
import Immutable from 'immutable'

const {Map} = require('immutable')

describe('(Layout) PageLayout', () => {
  it('renders as a <div>', () => {
    const map1 = Map({a: 1, b: 2, c: 3})
    const map2 = map1.set('b', 50)

    expect(map1.get('b')).toBe(2)
    expect(map2.get('b')).toBe(50)
  })

  it('renders as a <div>', () => {

    const TaskRecord = Immutable.Record({
      id: null,
      done: false,
      label: '',
    })

    const TaskMap = Immutable.OrderedMap

    const initialState = new TaskMap()

    initialState.merge(newTasks.map((task) => new Task(task)))

  })

})
