describe('Edit Comic Form', () => {
  let imgSrc
  let note
  let putImgSrc
  beforeEach(() => {
    imgSrc = "https://assets-global.website-files.com/5e9fa1c7e4ed1f5e242e2313/6193e5a113d2b7978adc2472_ZCi0CiIQ-Lmvvn6hUNV6j773Z_IQgMmuapFfCUUQXtUWDhqdL3ds_miY2q_Hw0dEX3ZhS6CdaCwzi3037ddvX_ea7XS4n1OGPEFHajAEtofPllmeqhcZPgkRkTTa5iulBXqR20aZ.png"
    note = "Marvel's Amazing Fantasy #15, the issue that first introduced the world to Peter Parker's Spider-Man, sold at auction for a record-breaking $3.6 million. I have mine signed by Stan Lee at the Denver Comic Convention, right before he passed away!"
    putImgSrc = "https://assets-global.website-files.com/5e9fa1c7e4ed1f5e242e2313/6193e5a38469f01507ac9894_B8_u_pJSIKQ6NYoCW9SDd4NL1-RLdvlhbpQj2feOj_bUX6HX0CWl8TMi7ZWusVlehA1vyIa7p3558ZpLcGiKQMwTODQkZ6j5_L5iWK8o-7oCghFir72JjFlBjOy4JW8QCvUlM4VI.png"
    cy.visit('https://stretch-project-iota.vercel.app/')
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData', { fixture: 'getComicData.json' })
    cy.get('.my-collection-link').click()
    cy.get('.comic-image').first().click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'getSingleComicData.json' })
    cy.get('.edit').click()
  })

  it('should pop up edit form modal', () => {
    cy.get('.form').should('be.visible')
  })

  it('should auto-populate all parts of the form with the selected comics information', () => {
    cy.get('input[name="title"]').should('have.value', 'Amazing Fantasy')
    cy.get('input[name="year"]').should('have.value', '1962')
    cy.get('input[name="issue"]').should('have.value', '15')
    cy.get('input[name="grade"]').should('have.value', '9.6')
    cy.get('input[name="image"]').should('have.value', imgSrc)
    //cy.get('input[name="notes"]').should('have.value', note)
  })

  it('should be able to update the title', () => {
    cy.get('input[name="title"]').clear().type('Test')
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putTitleComicData.json' })
    cy.get('h2').contains('Test')
  })

  it('should be able to update the year', () => {
    cy.get('input[name="year"]').clear().type('0000')
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putYearComicData.json' })
    cy.get('p').first().contains('0000')
  })

  it('should be able to update the issue number', () => {
    cy.get('input[name="issue"]').clear().type('00')
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putIssueComicData.json' })
    cy.get('p').eq(1).contains('00')
  })

  it('should be able to update the grade', () => {
    cy.get('input[name="grade"]').clear().type('00')
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putGradeComicData.json' })
    cy.get('p').eq(2).contains('00')
  })

  it('should be able to update the image path', () => {
    cy.get('input[name="image"]').clear().type(putImgSrc)
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putImageComicData.json' })
    cy.get('img').should('have.attr', 'src', putImgSrc)
  })

  it('should be able to update the notes', () => {
    cy.get('input[name="note"]').clear().type('test')
    cy.get('.updateButton').click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'putGradeComicData.json' })
    cy.get('p').last().contains('test')
  })

  it('should be able to delete the comic', () => {
    cy.get('.delete').click()
  })
})