import { TimesPipe } from './times.pipe'

describe('TimesPipe', () => {
  const pipe = new TimesPipe()

  it('should transform non-negative number into array', () => {
    expect(pipe.transform(3)).toBeInstanceOf(Array)
  })

  it('should transform positive number into array with the appropriate length', () => {
    expect(pipe.transform(1).length).toBe(1)
  })

  it('should transform zero into empty array', () => {
    expect(pipe.transform(0)).toEqual([])
  })

  it('should throw an error when trying to use negative number', () => {
    expect(() => pipe.transform(-1)).toThrowError()
  })
})
