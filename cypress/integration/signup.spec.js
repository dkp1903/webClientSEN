describe('Test For Sign Up Page', function() {
	context('SignUp', function() {
		beforeEach(function() {
			cy.visit('localhost:3000/signUp');
		})
		it('test signup no input fileds',function(){
                cy.get('.button.is-success').contains("Submit").click()
                //no first name
                cy.get('.help.is-danger').eq(0).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("first name cannot be empty");})
                
                //no last name
                cy.get('.help.is-danger').eq(1).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("last name cannot be empty");})
                
                //no email
                cy.get('.help.is-danger').eq(2).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("email is a required field");})

                //no password
                cy.get('.help.is-danger').eq(3).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("Please Enter your password");})
                cy.url().should('include', '/signUp')
            });
            it('test signUp ivalid email',function(){
                cy.get('input[name="firstName"]').type('Sagar').should('have.value', 'Sagar')
                cy.get('input[name="lastName"]').type('Singh').should('have.value', 'Singh')
                cy.get('input[name="email"]').type('sagar.sind20gmail.com').should('have.value', 'sagar.sind20gmail.com')
                cy.get('input[name="password"]').type('A123.a123').should('have.value', 'A123.a123')
                cy.get('input[name="confirmPassword"]').type('A123.a123').should('have.value', 'A123.a123')
                cy.get('.button.is-success').contains("Submit").click()
                cy.get('.help.is-danger').eq(0).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("Please enter a valid email");})
                cy.url().should('include', '/signUp')
            });
            it('test signUp password mismatch',function(){
                cy.get('input[name="firstName"]').type('Sagar').should('have.value', 'Sagar')
                cy.get('input[name="lastName"]').type('Singh').should('have.value', 'Singh')
                cy.get('input[name="email"]').type('sagar.sind20@gmail.com').should('have.value', 'sagar.sind20@gmail.com')
                cy.get('input[name="password"]').type('A123.a123').should('have.value', 'A123.a123')
                cy.get('input[name="confirmPassword"]').type('A123.a234').should('have.value', 'A123.a234')
                cy.get('.button.is-success').contains("Submit").click()
                cy.get('.help.is-danger').eq(1).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("Passwords must match");})
                cy.url().should('include', '/signUp')
            });
            it('test signUp not strong password',function(){
                cy.get('input[name="firstName"]').type('Sagar').should('have.value', 'Sagar')
                cy.get('input[name="lastName"]').type('Singh').should('have.value', 'Singh')
                cy.get('input[name="email"]').type('sagar.sind20@gmail.com').should('have.value', 'sagar.sind20@gmail.com')
                cy.get('input[name="password"]').type('123').should('have.value', '123')
                cy.get('input[name="confirmPassword"]').type('123').should('have.value', '123')
                cy.get('.button.is-success').contains("Submit").click()
                cy.get('.help.is-danger').eq(0).invoke('text')
                .then((text)=>{
                const req = text;
                expect(req).to.equal("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character");})
                cy.url().should('include', '/signUp')
            });
            it('test SignUp already registered email',function(){
                // cy.get('a').eq(6).click() 
                cy.get('input[name="firstName"]').type('Sagar').should('have.value', 'Sagar')
                cy.get('input[name="lastName"]').type('Singh').should('have.value', 'Singh')
                cy.get('input[name="email"]').type('manupanday1998@gmail.com').should('have.value', 'manupanday1998@gmail.com')
                cy.get('input[name="password"]').type('123456').should('have.value', '123456')
                cy.get('input[name="confirmPassword"]').type('123456').should('have.value', '123456')
                cy.get('.button.is-success').contains("Submit").click()
                cy.wait(1000)
                cy.get('.Toastify__toast-body').invoke('text')
                .then((text)=>{
                const toastText = text;
                expect(toastText).to.equal("email already exists");})
                cy.url().should('include', '/signUp')
     
             });
            //  it('test SignUp valid credentials',function(){
            //     // cy.get('a').eq(6).click() 
            //     cy.get('input[name="firstName"]').type('Sagar').should('have.value', 'Sagar')
            //     cy.get('input[name="lastName"]').type('Singh').should('have.value', 'Singh')
            //     cy.get('input[name="email"]').type('new@gmail.com').should('have.value', 'new@gmail.com')
            //     cy.get('input[name="password"]').type('lol').should('have.value', 'lol')
            //     cy.get('input[name="confirmPassword"]').type('lol').should('have.value', 'lol')
            //     cy.get('.button.is-success').contains("Submit").click()
            //     cy.wait(1000)
            //     cy.get('.Toastify__toast-body').invoke('text')
            //     .then((text)=>{
            //     const toastText = text;
            //     expect(toastText).to.equal("User Has Been SuccessFully Created Please Verify Your Email");})
            //     cy.url().should('include', '/signUp')
     
            //  });
	});
})
