
//Before running the tests, please follow the instructions from READ_ME.txt file

const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");


describe("Test Case for goodreads.com", function(){
    it("Testing website flow of goodreads.com", async function(){

        let driver = await new Builder().forBrowser("firefox").build();    //launching of new instance for firefox browser 


//STEP: 1 - website opening using the website link
        await driver.get("https://www.goodreads.com/")


        //validate the landing page post opening of website
        var title = await driver.getTitle();         
        assert.strictEqual(title, "Goodreads | Meet your next favorite book");


//Step: 2 - clicking on Sign In button
        const loginButton  = await driver.findElement(By.linkText('Sign In')); 
        loginButton.click();


//STEP: 3 - Clicking on Sign In with email button
        await driver.wait(until.elementLocated(By.css('.authPortalSignInButton')), 5000);    
        const signInWithEmail  = await driver.findElement(By.css(`.authPortalSignInButton`)); 
        signInWithEmail.click();

//STEP: 4 - Fill in the email and password fields
        await driver.wait(until.elementLocated(By.id('ap_email')), 5000);  //wait to locate the email field using id
        await driver.findElement(By.id('ap_email')).sendKeys('lokeshkaushik57@gmail.com');

        await driver.wait(until.elementLocated(By.id('ap_password')), 5000);   //wait to locate the password field using id
        await driver.findElement(By.id('ap_password')).sendKeys('qwerty@123', Key.RETURN);  //Key.RETURN for clicking the sign in button (OR overwrite the enter button functionality)

        await driver.wait(until.urlContains('https://www.goodreads.com'), 5000); //waiting to site open

        const profileUrl = await driver.getCurrentUrl();
        assert.ok(profileUrl.includes('https://www.goodreads.com'), 'Login failed: User profile not found.'); //checking login successful or not

//STEP: 5 - searching a particular book after successful login
      await driver.wait(until.elementLocated(By.css("[placeholder='Search books']")), 5000);
      const searchInput = await driver.findElement(By.css("[placeholder='Search books']"));
      await searchInput.sendKeys('Alchemist', Key.RETURN);

//STEP: 6 - selecting the book 
      await driver.wait(until.elementLocated(By.css("[alt='The Alchemist']")), 5000);
      const bookSelect  = await driver.findElement(By.css("[alt='The Alchemist']")); 
        bookSelect.click();

//STEP: 7 - adding book to WANT TO READ section
        await driver.wait(until.elementLocated(By.css(`[aria-label="Tap to shelve book as want to read"]`)), 5000);
        const bookDetails  = await driver.findElement(By.css(`[aria-label="Tap to shelve book as want to read"]`)); 
        bookDetails.click();

        //closing toast after adding book to shelf
        await driver.wait(until.elementLocated(By.css('.Toastify__close-button')), 10000);
        const toast  = await driver.findElement(By.css('.Toastify__close-button'));   
        toast.click();

//STEP: 8 - opening MY BOOKS
        await driver.wait(until.elementLocated(By.linkText('My Books')), 5000);
        const mybooks  = await driver.findElement(By.linkText('My Books'));   
        mybooks.click();

//STEP: 9 - removing the book from shelf
        await driver.wait(until.elementLocated(By.css('[data-confirm="Are you sure you want to remove The Alchemist from your books? This will permanently remove this book from your shelves, including any review, rating, tags, or notes you have added. To change the shelf this book appears on please edit the shelves."]')), 5000);
        const remove  = await driver.findElement(By.css('[data-confirm="Are you sure you want to remove The Alchemist from your books? This will permanently remove this book from your shelves, including any review, rating, tags, or notes you have added. To change the shelf this book appears on please edit the shelves."]'));   //class target
        remove.click();
        
        await driver.sleep(1200); // give sleep timer to get the alert properly
        await driver.switchTo().alert().accept(); // Accept the alert, so that book will remove from shelf successfully

//STEP: 10 - opening profile dropdown to LOGOUT from the site
        const myprofile  = await driver.findElement(By.css('.dropdown__trigger--profileMenu'));
        myprofile.click();

        //clicking on Sign out button
        const signOutButton = await driver.wait(until.elementLocated(By.linkText('Sign out')),10000);
        await signOutButton.click();

      await driver.quit(); //closing the driver

    });
});
