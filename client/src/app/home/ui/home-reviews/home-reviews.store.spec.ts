import { HomeReviewsStore } from './home-reviews.store'

describe('HomeReviewsStore', () => {
  describe('selectReview()', () => {
    it('should mark review as active', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 1,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 4
        },
        {
          id: 2,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 5
        }
      ])

      homeReviewsStore.selectReview(2)

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(2)
        done()
      })
    })

    it('should not mark any review as active when passed invalid review id', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 21,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 73,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 5
        }
      ])

      homeReviewsStore.selectReview(33)

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })
  })

  describe('selectFirstReview()', () => {
    it('should select first review', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 16,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 122,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectFirstReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(16)
        done()
      })
    })

    it('should not select any review if reviews are not provided', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.selectFirstReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })
  })

  describe('selectLastReview()', () => {
    it('should select last review', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 20,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 21,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectLastReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(21)
        done()
      })
    })

    it('should not select any review if reviews are not provided', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.selectLastReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })
  })

  describe('nextReview()', () => {
    it('should select next review', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 20,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 27,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectFirstReview()
      homeReviewsStore.nextReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(27)
        done()
      })
    })

    it('should select first review if last review is selected', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 20,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 27,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectLastReview()
      homeReviewsStore.nextReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(20)
        done()
      })
    })

    it('should not select any review if reviews are not provided', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.nextReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })

    it('should not select any review if no review was previously selected', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.nextReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })
  })

  describe('previousReview()', () => {
    it('should select previous review', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 19,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 22,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectLastReview()
      homeReviewsStore.previousReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(19)
        done()
      })
    })

    it('should select last review if first review is selected', done => {
      const homeReviewsStore = new HomeReviewsStore()
      homeReviewsStore.setReviews([
        {
          id: 50,
          title: 'Review 1',
          author: 'Author 1',
          description: 'Description 1',
          rating: 3
        },
        {
          id: 56,
          title: 'Review 2',
          author: 'Author 2',
          description: 'Description 2',
          rating: 4
        }
      ])

      homeReviewsStore.selectFirstReview()
      homeReviewsStore.previousReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBe(56)
        done()
      })
    })

    it('should not select any review if reviews are not provided', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.previousReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })

    it('should not select any review if no review was previously selected', done => {
      const homeReviewsStore = new HomeReviewsStore()

      homeReviewsStore.previousReview()

      homeReviewsStore.state$.subscribe(state => {
        expect(state.active).toBeNaN()
        done()
      })
    })
  })
})
