describe('template spec', () => {
   let imgSrc
  beforeEach(() => {
    imgSrc = "https://assets-global.website-files.com/5e9fa1c7e4ed1f5e242e2313/6193e5a113d2b7978adc2472_ZCi0CiIQ-Lmvvn6hUNV6j773Z_IQgMmuapFfCUUQXtUWDhqdL3ds_miY2q_Hw0dEX3ZhS6CdaCwzi3037ddvX_ea7XS4n1OGPEFHajAEtofPllmeqhcZPgkRkTTa5iulBXqR20aZ.png"
    cy.visit('https://stretch-project-iota.vercel.app/')
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData', { fixture: 'getComicData.json'})
    cy.get('.my-collection-link').click()
    cy.get('.comic-image').first().click()
    cy.intercept('https://comic-can.herokuapp.com/api/v1/comicData/1', { fixture: 'getSingleComicData.json'})
  })

  it('should have a cover image of the selected comic', () => {
    cy.get('img').should('have.attr', 'src', imgSrc)
  })

  it('should show the title of the selected comic', () => {
    cy.get('h2').contains('Amazing Fantasy')
  })

  it('should show the year of the selected comic', () => {
    cy.get('p').first().contains('1962')
  })

  it('should show the issue number of the selected comic', () => {
    cy.get('p').eq(1).contains('15')
  })

  it('should have a section for notes', () => {
    cy.get('p').last().contains('Note')
  })

  it('should be verified if it has an uploaded cover image', () => {
    //cy.get('.verifiedImage').should('have.attr', 'src', '../assets/verified.png')
    cy.get('.verifiedImage')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

  it('should have an "EDIT" button that bring up the edit form when clicked', () => {
    cy.get('.edit').click()
    cy.get('.form').should('be.visible')
  })

  it('should have a "BACK" button that returns to "My Collection" when clicked', () => {
    cy.get('.back').click()
    cy.url().should('eq', 'https://stretch-project-iota.vercel.app/comicCollection')
  })
})